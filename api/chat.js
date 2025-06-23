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

async function sendAppointmentToMake(payload) {
  try {
    const response = await fetch('https://hook.us2.make.com/yvl3dtvwu2fn0h02o829vxmix12yrtsc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error('Error enviando datos de cita a Make:', error);
    return null;
  }
}

async function sendTicketToMake(payload) {
  try {
    const response = await fetch('https://hook.us2.make.com/lsmsrjyui8q8ucoy9c4tyf1hdon76dsh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error('Error enviando ticket a Make:', error);
    return null;
  }
}

async function sendDemoRequestToMake(payload) {
  try {
    // URL específica para solicitudes de demo desde la web
    const response = await fetch('https://hook.us2.make.com/yvl3dtvwu2fn0h02o829vxmix12yrtsc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        origen: 'web_bot',
        timestamp: new Date().toISOString()
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error enviando solicitud de demo a Make:', error);
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
      const { email_empleado, email_invitado_externo, fecha, hora, descripcion } = respuesta.datos_cita;
      if (email_empleado && email_invitado_externo && fecha && hora && descripcion) {
        const startTime = `${fecha}T${hora}:00`;
        // Calcula endTime sumando 30 minutos
        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + 30 * 60000);
        const endTime = endDate.toISOString();

        const payload = {
          usuario: usuario_web || 'web-user',
          email_destinatario: email_empleado,
          email_invitado_externo: email_invitado_externo,
          start_time: startTime,
          end_time: endTime,
          descripcion: descripcion,
          channel_id: 'web',
        };
        await sendAppointmentToMake(payload);
      }
    }
    
    if (respuesta.accion === 'recomendar_ticket' && respuesta.datos_ticket) {
      const { tipo_ticket, descripcion_problema } = respuesta.datos_ticket;
      if (tipo_ticket && descripcion_problema) {
        const payload = {
          tipo: tipo_ticket,
          descripcion_problema,
          reportado_por: usuario_web || 'web-user',
          channel_id: 'web',
        };
        await sendTicketToMake(payload);
      }
    }

    // Manejo de solicitudes de demo
    if (respuesta.accion === 'solicitar_demo' && respuesta.datos_demo) {
      const datosDemo = respuesta.datos_demo;
      
      // Verificar si tenemos todos los datos necesarios para guardar
      if (datosDemo.producto_servicio && datosDemo.nombre_cliente && 
          datosDemo.telefono && datosDemo.email && datosDemo.nombre_negocio) {
        
        try {
          // Guardar en Supabase
          const resultado = await guardarSolicitudDemo(datosDemo);
          
          if (resultado.success) {
            // Enviar notificación por email a través de Make
            const payload = {
              tipo: 'solicitud_demo',
              datos_cliente: {
                nombre: datosDemo.nombre_cliente,
                telefono: datosDemo.telefono,
                email: datosDemo.email,
                negocio: datosDemo.nombre_negocio,
                sector: datosDemo.sector_negocio || 'No especificado',
                tamano: datosDemo.tamano_empresa || 'No especificado',
                desafios: datosDemo.desafios || 'No especificado'
              },
              producto_servicio: datosDemo.producto_servicio,
              fecha_solicitud: new Date().toISOString(),
              canal: 'web',
              id_solicitud: resultado.data.id,
              prioridad: 'alta'
            };
            
            const makeResult = await sendDemoRequestToMake(payload);
            
            if (makeResult) {
              console.log('Solicitud de demo enviada exitosamente a Make');
            } else {
              console.warn('No se pudo enviar la solicitud de demo a Make, pero se guardó en Supabase');
            }
          } else {
            console.error('Error guardando solicitud de demo en Supabase:', resultado.error);
          }
        } catch (error) {
          console.error('Error procesando solicitud de demo:', error);
        }
      } else {
        console.log('Datos de demo incompletos, continuando con el flujo normal');
      }
    }

    console.log('Respuesta enviada al frontend:', respuesta);
    res.status(200).json({ respuesta });
  } catch (error) {
    console.error('Error en /api/chat:', error, error?.message, error?.stack);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
} 