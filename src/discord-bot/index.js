import { Client, GatewayIntentBits, Events, EmbedBuilder } from 'discord.js';
import { OpenAI } from 'openai';
import config from './config.js';
import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as trello from './trelloService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Almacén en memoria para historiales de conversación
const conversationHistories = new Map();
// Almacén para acciones que requieren confirmación del usuario
const pendingActions = new Map();

// --- CONFIGURACIÓN DE TICKETS ---
const TICKET_CHANNEL_ID = '1382378711499931678'; // Canal de consultas de tickets
const TICKET_COUNTER_PATH = path.join(__dirname, 'ticket_counter.json');
// ---------------------------------

const ADMIN_ROLES = ['Admin', 'Soporte']; // Roles que pueden gestionar tickets

// Función para generar un ID de ticket único y diario (YYYYMMDD-XXX)
async function generateTicketId() {
  const today = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
  let counterData;

  try {
    const data = await fs.readFile(TICKET_COUNTER_PATH, 'utf8');
    counterData = JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, lo creamos
    counterData = { date: '1970-01-01', count: 0 };
  }

  if (counterData.date === today) {
    counterData.count++;
  } else {
    counterData.date = today;
    counterData.count = 1;
  }

  await fs.writeFile(TICKET_COUNTER_PATH, JSON.stringify(counterData, null, 2));
  
  const ticketNumber = String(counterData.count).padStart(3, '0');
  return `${today.replace(/-/g, '')}-${ticketNumber}`;
}

const systemPromptSencrom = `Eres Crom-Bot, un asistente de SENCROM experto en mantener conversaciones naturales para agendar citas, crear tickets de soporte y responder preguntas.

**Tus Tareas:**
1.  **Analiza la conversación COMPLETA** que te proporcionaré.
2.  **Determina la intención principal:** "agendar", "crear_ticket", "responder_pregunta", o "conversacion_general".
3.  **Gestiona el Flujo de Agendamiento:**
    - Si la intención es "agendar", tu objetivo es llenar estos 5 datos: \`email_empleado\`, \`email_invitado_externo\`, \`fecha\`, \`hora\`, y \`descripcion\`.
    - **Reglas para obtener el \`email_empleado\`:**
        - Revisa si el usuario menciona a una persona o cargo del equipo de SENCROM (ver Base de Conocimientos). Si es así, usa su correo.
        - Si el usuario **NO especifica** con quién agendar, usa el correo por defecto: \`eurys.cc.03@gmail.com\`.
    - **Reglas para obtener el \`email_invitado_externo\`:**
        - Busca en el mensaje un correo electrónico que NO pertenezca al equipo de SENCROM. Ese es el correo del invitado.
    - **Si TIENES todos los datos:** Tu acción es "agendar". Formula una respuesta de confirmación.
    - **Si FALTAN datos:** Tu acción es "pedir_info". Formula una pregunta clara para obtener el primer dato que falte. **Prioridad: Pide primero el \`email_invitado_externo\` si no lo tienes.**
4.  **Gestiona la Recomendación de Tickets:**
    - **Tu acción DEBE SER \`recomendar_ticket\` si el usuario menciona un problema o interés comercial.**
    - **NUNCA** crees un ticket directamente. Tu **ÚNICO** trabajo es **PREGUNTAR** si el usuario quiere uno.
    - **Clasifica el tipo de ticket:**
        - \`soporte\`: Para problemas, errores, fallos o dificultades con un producto/servicio existente.
        - \`venta\`: Para interés en comprar, cotizar o saber más sobre un producto/servicio.
    - Extrae una descripción inicial del problema o interés en \`descripcion_problema\`.
    - **La \`respuesta_al_usuario\` DEBE SER SIEMPRE UNA PREGUNTA de confirmación.**
    - **Formato OBLIGATORIO para la pregunta:** "Veo que [mencionas un problema/tienes interés en X]. ¿Deseas que cree un ticket de [soporte/venta] para que el equipo se encargue?"
    - **NO PUEDES responder:** "He creado tu ticket." o "He registrado tu problema."
5.  **Gestiona Preguntas Generales:**
    - Si la intención es "responder_pregunta", tu acción es "responder". Usa la Base de Conocimientos para formular tu respuesta.
6.  **Formato de Salida OBLIGATORIO (JSON VÁLIDO):**
    \`\`\`json
    {
      "accion": "agendar" | "pedir_info" | "responder" | "recomendar_ticket",
      "respuesta_al_usuario": "El texto que debo enviar al usuario.",
      "datos_cita": {
        "email_empleado": "correo.sencrom@ejemplo.com" | null,
        "email_invitado_externo": "correo.cliente@ejemplo.com" | null,
        "fecha": "YYYY-MM-DD" | null,
        "hora": "HH:mm" | null,
        "descripcion": "Motivo de la reunión" | null
      },
      "datos_ticket": {
        "tipo_ticket": "soporte" | "venta" | null,
        "descripcion_problema": "Descripción del problema o interés del usuario." | null
      }
    }
    \`\`\`

**Reglas Cruciales:**
- **Claridad:** Sé explícito. Pregunta por "el correo electrónico del invitado a la reunión".
- **Contexto:** No vuelvas a pedir información que el usuario ya te dio. Revisa siempre el historial.
- **Fecha de Hoy:** Para cálculos como "mañana", la fecha de hoy es ${new Date().toISOString().split('T')[0]}.

---
**Base de Conocimientos de SENCROM:**
SENCROM es una empresa dedicada a la transformación digital y la automatización inteligente de procesos empresariales. Su misión es potenciar la eficiencia y el crecimiento de los negocios a través de soluciones de IA, chatbots y automatización a medida.

Productos Destacados:
- Asistente Virtual Inteligente: Automatiza tareas y mejora la interacción con clientes. Capaz de mantener conversaciones naturales en varios idiomas. Procesa mensajes de voz y genera respuestas en audio. Agenda y organiza citas automáticamente. Centraliza y responde correos electrónicos y notificaciones. Automatiza tareas repetitivas y sincroniza información entre plataformas. Proporciona soporte 24/7 y escala casos complejos a humanos.

Servicios Principales:
1. Automatización de Procesos (RPA): Optimización de flujos de trabajo mediante robots de software. Reducción de errores manuales y liberación de tiempo para tareas estratégicas. Ejemplos: Automatización de facturación, gestión de inventario.
2. Implementación de Chatbots: Chatbots inteligentes y personalizados para atención al cliente, ventas y soporte técnico. Integración con WhatsApp, Messenger y web. Ejemplos: Asistente virtual de ventas, soporte técnico automatizado.
3. Integración con CRM y Sistemas: Conexión de herramientas y plataformas (CRM, ERP, etc.) para un flujo de datos cohesivo. Sincronización de datos en tiempo real y automatización de flujos entre sistemas. Ejemplos: Integración Salesforce-SAP, automatización de marketing.
4. Soporte y Mantenimiento Técnico: Soporte técnico multicanal y mantenimiento proactivo. Actualizaciones y mejoras de software, capacitación para equipos. Ejemplos: Soporte proactivo, plan de mantenimiento.

¿Por qué elegir SENCROM?:
- Innovación constante: Siempre a la vanguardia de la IA y la automatización.
- Resultados medibles: Implementaciones diseñadas para generar impacto real y cuantificable.
- Soporte dedicado: Acompañamiento desde la consultoría inicial hasta el soporte post-implementación.

Sobre Nosotros:
- Misión: Empoderar a las empresas con soluciones de automatización innovadoras y accesibles que impulsen la eficiencia, mejoren la experiencia del cliente y fomenten el crecimiento sostenible.
- Visión: Ser el socio tecnológico líder global en automatización inteligente, reconocido por la excelencia, innovación y el impacto transformador en los negocios de los clientes.
Valores Fundamentales: Innovación, Centrados en el cliente, Excelencia, Integridad.
Historia y Trayectoria: 2020: Nacimiento de SENCROM. 2021: Primeros clientes y éxito en la implementación de chatbots para pymes. 2022: Expansión de servicios a RPA e integración avanzada con CRMs. 2023-2024: Nuevas automatizaciones para sectores como salud, educación, gastronomía, logística y atención al cliente. Hoy: Líderes en automatización, ayudando a empresas a alcanzar su máximo potencial.
Equipo Directivo: Alexander Ant. Perez (Co-Fundador y Director Administrativo), Eurys E. Cruz (Co-Fundador y Director de Publicidad), Darwin Yakir Diaz (Co-Fundador y Director de Proyectos).
Contacto y más información en https://sencrom-web.vercel.app

**Equipo SENCROM (para agendamiento):**
- **Eurys Cruz** (Director de Marketing y Publicidad): \`eurys.cc.03@gmail.com\` (Correo por defecto para citas sin especificar)
- **Darwin Yakil Diaz** (Director de Proyectos): \`darwindiaz0405@gmail.com\`
- **Alexander Perez** (Director Administrativo y Ventas): \`lexton2833@gmail.com\`
`;

// Configuración del cliente de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Evento cuando el bot está listo
client.once(Events.ClientReady, async () => {
  console.log('=== BOT INICIADO ===');
  console.log(`Bot está listo como ${client.user.tag}`);
  console.log(`Canal configurado: ${config.CHANNEL_ID}`);
  console.log('===================');

  const channel = client.channels.cache.get(config.CHANNEL_ID);
  if (channel) {
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#2ECC71')
      .setDescription(
        "¡Hola! Soy **Crom-Bot**, el asistente virtual de SENCROM. Estoy aquí para ayudarte con información sobre la empresa y sus servicios. ¿En qué puedo asistirte hoy?\n\n" +
        "Puedes contar conmigo para:\n\n" +
        "• Responder a tus preguntas\n" +
        "• Agendar una cita\n" +
        "• Crear Tickets\n" +
        "• Crear una cotización\n" +
        "• Dar Soporte\n" +
        "• Informar sobre productos o servicios"
      )
      .setFooter({ text: "Estoy aquí para asistirte, solo déjame saber cómo." })
      .setTimestamp();

    await channel.send({ embeds: [welcomeEmbed] });
  }
});

// Palabras clave para confirmación y negación
const confirmationWords = ['si', 'sí', 'dale', 'ok', 'claro', 'procede', 'confirmo', 'acepto', 'correcto'];
const rejectionWords = ['no', 'cancela', 'nada', 'no gracias', 'incorrecto'];

// Evento para manejar mensajes
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  // Si el mensaje NO es un comando y NO está en el canal principal del bot, lo ignoramos.
  if (!message.content.startsWith('!') && message.channel.id !== config.CHANNEL_ID) return;

  // --- GESTIÓN DE COMANDOS DE TICKETS ---
  if (message.content.startsWith('!')) {
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const ticketId = args[0];

    const hasAdminRole = message.member.roles.cache.some(role => ADMIN_ROLES.includes(role.name));

    // Comando !tomar <ticket_id>
    if (command === 'tomar' && ticketId) {
      if (!hasAdminRole) return message.reply('No tienes permiso para usar este comando.');
      
      await message.channel.sendTyping();
      const card = await trello.findCardByTicketId(ticketId);
      if (!card) return message.reply(`No se encontró ningún ticket con el ID \`${ticketId}\`.`);

      const success = await trello.moveCard(card.id, config.TRELLO_CONFIG.LIST_IDS.EN_PROCESO);
      if (success) {
        await message.reply(`✅ El ticket **${ticketId}** ha sido asignado a ${message.author} y movido a "En Proceso".`);
        const ticketChannel = client.channels.cache.get(TICKET_CHANNEL_ID);
        if (ticketChannel) {
          await ticketChannel.send(`El ticket **${ticketId}** ha sido tomado por ${message.author} y su estado ahora es: **En Proceso**.`);
        }
      } else {
        await message.reply('Hubo un error al mover la tarjeta en Trello. Revisa la consola.');
      }
      return;
    }

    // Comando !cerrar <ticket_id> <...motivo>
    if (command === 'cerrar' && ticketId) {
      if (!hasAdminRole) return message.reply('No tienes permiso para usar este comando.');
      
      const motivo = args.slice(1).join(' ');
      if (!motivo) return message.reply('Debes proporcionar un motivo para el cierre. Uso: `!cerrar <ticket_id> <motivo>`');

      await message.channel.sendTyping();
      const card = await trello.findCardByTicketId(ticketId);
      if (!card) return message.reply(`No se encontró ningún ticket con el ID \`${ticketId}\`.`);

      const moveSuccess = await trello.moveCard(card.id, config.TRELLO_CONFIG.LIST_IDS.CERRADOS);
      const commentSuccess = await trello.addComment(card.id, `Ticket cerrado por ${message.author.username}. Motivo: ${motivo}`);

      if (moveSuccess && commentSuccess) {
        await message.reply(`✅ El ticket **${ticketId}** ha sido cerrado y movido a "Cerrados".`);
        const ticketChannel = client.channels.cache.get(TICKET_CHANNEL_ID);
        if (ticketChannel) {
          await ticketChannel.send(`El ticket **${ticketId}** ha sido **Cerrado** por ${message.author}. Motivo: *${motivo}*`);
        }
      } else {
        await message.reply('Hubo un error al actualizar la tarjeta en Trello. Revisa la consola.');
      }
      return;
    }

    // Comando !estado <ticket_id>
    if (command === 'estado' && ticketId) {
      await message.channel.sendTyping();
      const card = await trello.findCardByTicketId(ticketId);
      if (!card) return message.reply(`No se encontró ningún ticket con el ID \`${ticketId}\`.`);

      let status = 'Estado Desconocido';
      if (card.idList === config.TRELLO_CONFIG.LIST_IDS.NUEVOS) status = 'Nuevo (Pendiente de asignar)';
      if (card.idList === config.TRELLO_CONFIG.LIST_IDS.EN_PROCESO) status = 'En Proceso';
      if (card.idList === config.TRELLO_CONFIG.LIST_IDS.CERRADOS) status = 'Cerrado';

      await message.reply(`El estado del ticket **${ticketId}** es: **${status}**.`);
      return;
    }
  }
  // ------------------------------------

  // 1. Revisar si hay una acción pendiente para este usuario
  if (pendingActions.has(message.author.id)) {
    const pendingAction = pendingActions.get(message.author.id);
    const userResponse = message.content.trim();
    const userResponseLower = userResponse.toLowerCase();

    switch (pendingAction.action) {
      case 'confirm_ticket_creation':
        if (confirmationWords.some(word => userResponseLower.startsWith(word))) {
          // El usuario confirmó, ahora empezamos a recopilar datos
          const newPendingAction = {
            action: 'collecting_ticket_info',
            data: {
              ...pendingAction.data,
              nombre_usuario: message.author.username
              // Ya no necesitamos pasar el problema resumido aquí, está en la data principal.
            },
            missing_info: ['numero_contacto', 'correo_contacto', 'detalle_problema'],
            collected_info: {},
          };
          pendingActions.set(message.author.id, newPendingAction);
          await message.reply("Excelente. Para crear el ticket, necesito unos datos más. Por favor, indícame tu **número de contacto**.");
        } else if (rejectionWords.some(word => userResponseLower.startsWith(word))) {
          pendingActions.delete(message.author.id);
          await message.reply('Entendido, no crearé el ticket. ¿Hay algo más en lo que pueda ayudarte?');
        } else {
          // El usuario dijo otra cosa, cancelamos la acción pendiente y procesamos el nuevo mensaje
          pendingActions.delete(message.author.id);
          // (el código continuará y procesará este mensaje como uno nuevo)
        }
        if (pendingActions.has(message.author.id)) return; // Si seguimos en un flujo pendiente, detenemos aquí.
        break;

      case 'collecting_ticket_info':
        const currentQuestion = pendingAction.missing_info[0];
        pendingAction.collected_info[currentQuestion] = userResponse;
        pendingAction.missing_info.shift();

        if (pendingAction.missing_info.length > 0) {
          const nextQuestion = pendingAction.missing_info[0];
          let questionText = '';
          if (nextQuestion === 'correo_contacto') {
            questionText = "Gracias. Ahora, por favor, dime tu **correo electrónico**.";
          } else if (nextQuestion === 'detalle_problema') {
            const ticketType = pendingAction.data.tipo_ticket === 'venta' ? 'tu solicitud' : 'tu problema';
            questionText = `Perfecto. Por último, por favor, **describe detalladamente ${ticketType}**.`
          }
          await message.reply(questionText);
          pendingActions.set(message.author.id, pendingAction);
        } else {
          // Toda la información ha sido recopilada
          await message.channel.sendTyping();
          const finalData = { ...pendingAction.data, ...pendingAction.collected_info };
          const ticketId = await generateTicketId(); // Generamos el ID del ticket

          // Decidir qué ID de etiqueta usar
          const labelId = finalData.tipo_ticket === 'venta' 
            ? config.TRELLO_CONFIG.LABEL_IDS.VENTA 
            : config.TRELLO_CONFIG.LABEL_IDS.SOPORTE;

          const ticketPayload = {
            ticket_id: ticketId,
            card_name: `${ticketId} - ${finalData.descripcion_problema}`, // Usamos la descripción original
            label_id: labelId,
            reportado_por: finalData.nombre_usuario,
            numero_contacto: finalData.numero_contacto,
            correo_contacto: finalData.correo_contacto,
            tipo: finalData.tipo_ticket,
            problema_detallado: finalData.detalle_problema,
            channel_id: message.channel.id,
            ticket_channel_id: TICKET_CHANNEL_ID
          };

          const success = await sendTicketToMake(ticketPayload);

          if (success) {
            // Respuesta LIGERA en el canal actual
            const replyMessage = 
`✅ **¡Ticket Creado!**
**Número de Ticket:** \`${ticketId}\`
**Tipo:** ${finalData.tipo_ticket}
**Resumen:** ${finalData.descripcion_problema}

Gracias por proporcionarnos tus datos. El equipo correspondiente ya ha sido notificado.
Puedes consultar el estado de tu ticket en el canal <#${TICKET_CHANNEL_ID}> o usando el comando \`!estado ${ticketId}\`.`;
            
            await message.reply(replyMessage);
          } else {
            await message.reply('❌ Lo siento, hubo un problema al comunicarnos con nuestro sistema de tickets. Por favor, intenta de nuevo más tarde.');
          }
          pendingActions.delete(message.author.id);
        }
        return; // Detenemos el procesamiento aquí
    }
  }

  // 2. Si no hay acción pendiente, procesar el mensaje normalmente con OpenAI
  let typingInterval = null;
  try {
    // Iniciar y mantener el indicador de "escribiendo..."
    message.channel.sendTyping();
    typingInterval = setInterval(() => message.channel.sendTyping(), 8000);

    const userHistory = conversationHistories.get(message.author.id) || [{ role: 'system', content: systemPromptSencrom }];
    userHistory.push({ role: 'user', content: message.content });

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: userHistory,
      response_format: { type: 'json_object' },
    });

    clearInterval(typingInterval); // Detener el indicador

    const analysis = JSON.parse(response.choices[0].message.content);
    const botReply = analysis.respuesta_al_usuario;

    if (botReply) {
      await message.reply(botReply);
      userHistory.push({ role: 'assistant', content: botReply });
    }

    // 3. Actuar según la acción determinada por la IA
    switch (analysis.accion) {
      case 'agendar':
        const { email_empleado, email_invitado_externo, fecha, hora, descripcion } = analysis.datos_cita;
        const startTime = new Date(`${fecha}T${hora}:00`);
        const endTime = new Date(startTime.getTime() + 30 * 60000);

        const payload = {
          usuario: message.author.username,
          email_destinatario: email_empleado,
          email_invitado_externo: email_invitado_externo,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          descripcion: descripcion,
          channel_id: message.channel.id
        };
        await sendAppointmentToMake(payload);
        conversationHistories.delete(message.author.id);
        break;

      case 'recomendar_ticket':
        // Guardar la acción propuesta para que el usuario la confirme
        pendingActions.set(message.author.id, {
          action: 'confirm_ticket_creation',
          data: analysis.datos_ticket,
        });
        // Guardar el historial para que la próxima interacción tenga contexto
        conversationHistories.set(message.author.id, userHistory);
        break;

      case 'pedir_info':
        conversationHistories.set(message.author.id, userHistory);
        break;

      case 'responder':
        conversationHistories.set(message.author.id, userHistory);
        break;
    }

    console.log('Respuesta enviada al frontend:', analysis);
  } catch (error) {
    if (typingInterval) clearInterval(typingInterval); // Detener el indicador también en caso de error
    console.error('Error completo:', error);
    conversationHistories.delete(message.author.id);
    pendingActions.delete(message.author.id); // Limpiar también acciones pendientes en caso de error
    await message.reply(config.MESSAGES.ERROR);
  }
});

// Iniciar sesión del bot
console.log('Iniciando sesión del bot...');
client.login(config.DISCORD_TOKEN);

export async function sendAppointmentToMake(payload) {
  try {
    const response = await axios.post(
      'https://hook.us2.make.com/yvl3dtvwu2fn0h02o829vxmix12yrtsc',
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Error enviando datos de cita a Make:', error);
    return null;
  }
}

export async function sendTicketToMake(payload) {
  try {
    // !! IMPORTANTE: Asegúrate de que esta URL esté actualizada !!
    const webhookUrl = 'https://hook.us2.make.com/lsmsrjyui8q8ucoy9c4tyf1hdon76dsh';
    const response = await axios.post(webhookUrl, payload);
    console.log('Ticket enviado a Make con éxito.');
    return response.data;
  } catch (error) {
    console.error('Error enviando ticket a Make:', error);
    return null;
  }
} 