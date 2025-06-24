import { procesarMensajeBot } from './botLogic.js';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Variables de entorno de Supabase no configuradas');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Configurada' : 'FALTA');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Configurada' : 'FALTA');
  throw new Error('Variables de entorno de Supabase no configuradas. Verifica VITE_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en Vercel.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Envía una acción y su payload al webhook unificado de Make.
 * Espera una respuesta de confirmación para mostrar en el chat.
 * @param {object} payload - El objeto de datos para enviar a Make.
 * @returns {Promise<object|null>} - La respuesta de Make o null si hay un error.
 */
async function sendActionToMake(payload) {
  try {
    // URL del nuevo webhook unificado para el bot web
    const makeWebhookUrl = 'https://hook.us2.make.com/l7cc8fpylym4s4tdpkkyvedhqufkiu12';
    
    const response = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error de Make - Status: ${response.status}, Body: ${errorBody}`);
      throw new Error(`Error en la llamada al webhook de Make. Status: ${response.status}`);
    }

    // Devolvemos la respuesta JSON de Make (que contendrá el mensaje para el chat)
    return await response.json();
  } catch (error) {
    console.error('Error enviando la acción a Make:', error);
    // En caso de fallo, no interrumpimos el flujo, solo lo logueamos.
    return null;
  }
}

async function guardarSolicitudDemo(datosDemo) {
  try {
    const { data, error } = await supabase
      .from('solicitudes_demo')
      .insert([
        {
          producto_servicio: datosDemo.producto_servicio,
          nombre_cliente: datosDemo.nombre_cliente,
          telefono: datosDemo.telefono,
          email: datosDemo.email,
          nombre_negocio: datosDemo.nombre_negocio,
          sector_negocio: datosDemo.sector_negocio,
          tamano_empresa: datosDemo.tamano_empresa,
          desafios: datosDemo.desafios,
          estado: 'pendiente',
          fecha_solicitud: new Date().toISOString(),
          canal: 'web'
        }
      ])
      .select();

    if (error) {
      console.error('Error guardando solicitud de demo:', error);
      throw error;
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error en guardarSolicitudDemo:', error);
    return { success: false, error: error.message };
  }
}

export default async function handler(req, res) {
  // Permitir CORS para desarrollo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { mensaje, historial, usuario_web } = req.body;
  if (!mensaje) {
    return res.status(400).json({ error: 'Falta el mensaje.' });
  }
  try {
    const respuesta = await procesarMensajeBot(mensaje, historial);

    // Automatización: si la acción es 'agendar' o 'recomendar_ticket', enviamos el webhook a Make
    if (respuesta.accion === 'agendar' && respuesta.datos_cita) {
      const { email_empleado, email_invitado_externo, fecha, hora, descripcion, nombre_cliente, telefono, nombre_negocio, sector_negocio } = respuesta.datos_cita;
      // Tomar el nombre del usuario de la IA si está disponible
      let nombreUsuario = (nombre_cliente || respuesta.datos_cita.nombre || (usuario_web && usuario_web.name) || usuario_web || 'Usuario Web');
      // Validar que TODOS los datos requeridos estén presentes
      if (email_empleado && email_invitado_externo && fecha && hora && descripcion && nombreUsuario && telefono && nombre_negocio && sector_negocio) {
        // Siempre usar zona horaria UTC-4
        const TIMEZONE_OFFSET = '-04:00';
        const startTime = `${fecha}T${hora}:00${TIMEZONE_OFFSET}`;
        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + 30 * 60000); // suma 30 minutos
        // endTime en formato ISO con zona horaria UTC-4
        const endTime = endDate.toISOString().replace('Z', TIMEZONE_OFFSET);

        const payload = {
          tipo: 'cita',
          nombre: nombreUsuario,
          email: email_invitado_externo,
          fecha: fecha,
          hora: hora,
          descripcion: descripcion,
          telefono: telefono,
          nombre_negocio: nombre_negocio,
          sector_negocio: sector_negocio,
          email_empleado: email_empleado,
          start_time: startTime,
          end_time: endTime,
        };
        const makeResponse = await sendActionToMake(payload);
        if (makeResponse && makeResponse.message) {
          respuesta.respuesta_al_usuario += `\n\n${makeResponse.message}`;
        }
      }
    }
    
    if (respuesta.accion === 'recomendar_ticket' && respuesta.datos_ticket) {
      const { tipo_ticket, descripcion_problema } = respuesta.datos_ticket;
      const emailUsuario = respuesta.datos_ticket.email || (usuario_web && usuario_web.email) || 'no-proporcionado';
      const nombreUsuario = respuesta.datos_ticket.nombre || (usuario_web && usuario_web.name) || 'Usuario Web';

      if (descripcion_problema) {
        const asuntoTicket = tipo_ticket
          ? `Nuevo Ticket: ${tipo_ticket}`
          : 'Nuevo Ticket de Soporte';

        // IDs de Trello (copiados de config.js del bot de Discord)
        const TRELLO_BOARD_ID = 'TU_ID_DEL_BOARD'; // Reemplaza por el valor real de tu board
        // Puedes poner aquí el valor real, por ejemplo: '65a1b2c3d4e5f6g7h8i9j0k1'

        const payload = {
          tipo: 'ticket',
          asunto: asuntoTicket,
          descripcion: descripcion_problema,
          email: emailUsuario,
          nombre: nombreUsuario,
          reportado_por: nombreUsuario,
          board_id: TRELLO_BOARD_ID,
          tipo_ticket: tipo_ticket || 'soporte', // por defecto 'soporte' si no viene
        };
        const makeResponse = await sendActionToMake(payload);
        if (makeResponse && makeResponse.message) {
          respuesta.respuesta_al_usuario += `\n\n${makeResponse.message}`;
        }
      }
    }

    // Manejo de solicitudes de demo / cotizaciones
    if (respuesta.accion === 'solicitar_demo' && respuesta.datos_demo) {
      const datosDemo = respuesta.datos_demo;
      
      if (datosDemo.producto_servicio && datosDemo.nombre_cliente && datosDemo.email) {
        
        // Guardamos en Supabase primero (opcional, pero buena práctica)
        await guardarSolicitudDemo(datosDemo);

        const payload = {
          tipo: 'cotizacion', // Unificamos demo y cotización por ahora
          email: datosDemo.email,
          nombre: datosDemo.nombre_cliente,
          detalles: `Quiere una cotización/demo para: ${datosDemo.producto_servicio}. Desafíos: ${datosDemo.desafios || 'N/A'}`,
          // Añadimos el resto de datos por si son útiles para el equipo de ventas
          telefono: datosDemo.telefono,
          nombre_negocio: datosDemo.nombre_negocio,
          sector_negocio: datosDemo.sector_negocio,
          tamano_empresa: datosDemo.tamano_empresa
        };
            
        // Para cotizaciones, no esperamos respuesta para el chat, solo enviamos.
        await sendActionToMake(payload);
        
        // La respuesta al usuario ya la da el bot (ej: "Gracias, hemos recibido...").
        // No necesitamos añadir nada más de Make aquí.
      }
    }

    console.log('Respuesta final enviada al frontend:', respuesta);
    res.status(200).json({ respuesta });
  } catch (error) {
    console.error('Error en /api/chat:', error, error?.message, error?.stack);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
} 