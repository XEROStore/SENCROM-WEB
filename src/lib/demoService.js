import { supabase } from './supabaseClient.js';

/**
 * Guarda los datos de una solicitud de demo en Supabase
 * @param {Object} datosDemo - Datos de la solicitud de demo
 * @returns {Promise<Object>} - Resultado de la operación
 */
export async function guardarSolicitudDemo(datosDemo) {
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

/**
 * Obtiene todas las solicitudes de demo
 * @returns {Promise<Object>} - Lista de solicitudes
 */
export async function obtenerSolicitudesDemo() {
  try {
    const { data, error } = await supabase
      .from('solicitudes_demo')
      .select('*')
      .order('fecha_solicitud', { ascending: false });

    if (error) {
      console.error('Error obteniendo solicitudes de demo:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error en obtenerSolicitudesDemo:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Actualiza el estado de una solicitud de demo
 * @param {number} id - ID de la solicitud
 * @param {string} estado - Nuevo estado
 * @returns {Promise<Object>} - Resultado de la operación
 */
export async function actualizarEstadoDemo(id, estado) {
  try {
    const { data, error } = await supabase
      .from('solicitudes_demo')
      .update({ estado, fecha_actualizacion: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error actualizando estado de demo:', error);
      throw error;
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error en actualizarEstadoDemo:', error);
    return { success: false, error: error.message };
  }
} 