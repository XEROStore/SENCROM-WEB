import { supabase } from './supabaseClient';

export async function submitContactForm(formData) {
  try {
    // Crear el submission directamente
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          service: formData.service
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al enviar el formulario:', error.message);
    throw error;
  }
}

export async function getContactSubmissions() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al obtener los submissions:', error.message);
    throw error;
  }
} 