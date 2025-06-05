import { supabase } from './supabaseClient';

export async function testSupabaseConnection() {
  try {
    // Intentar una consulta simple
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);

    if (error) {
      // Si el error es porque la tabla no existe, lo consideramos un éxito
      if (error.code === '42P01') {
        return {
          status: 'success',
          message: 'Conexión exitosa, pero la tabla contact_submissions no existe',
          details: {
            tableExists: false
          }
        };
      }
      
      throw error;
    }

    return {
      status: 'success',
      message: 'Conexión exitosa',
      details: {
        tableExists: true,
        data
      }
    };
  } catch (error) {
    console.error('Error en testSupabaseConnection:', error);
    throw new Error(`Error de conexión: ${error.message}`);
  }
} 