import { supabase } from './supabaseClient';

export async function uploadImage(file, name, category = 'general') {
  try {
    // 1. Subir el archivo al bucket de Supabase
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${category}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Obtener la URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    // 3. Guardar la referencia en la base de datos
    const { data, error } = await supabase
      .from('images')
      .insert([
        {
          name,
          url: publicUrl,
          alt_text: name,
          category
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al subir la imagen:', error.message);
    throw error;
  }
}

export async function getImages(category = null) {
  try {
    let query = supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al obtener las imágenes:', error.message);
    throw error;
  }
}

export async function deleteImage(id) {
  try {
    // 1. Obtener la información de la imagen
    const { data: image, error: fetchError } = await supabase
      .from('images')
      .select('url')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // 2. Extraer el path del archivo de la URL
    const url = new URL(image.url);
    const filePath = url.pathname.split('/').slice(-2).join('/');

    // 3. Eliminar el archivo del storage
    const { error: deleteError } = await supabase.storage
      .from('images')
      .remove([filePath]);

    if (deleteError) throw deleteError;

    // 4. Eliminar el registro de la base de datos
    const { error: dbError } = await supabase
      .from('images')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;

    return true;
  } catch (error) {
    console.error('Error al eliminar la imagen:', error.message);
    throw error;
  }
}

export async function getImageUrl(path) {
  try {
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(path);

    return data.publicUrl;
  } catch (error) {
    console.error('Error al obtener la URL de la imagen:', error.message);
    throw error;
  }
}

export async function listImages(folder = '') {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .list(folder);

    if (error) throw error;

    // Obtener las URLs públicas para cada imagen
    const imagesWithUrls = await Promise.all(
      data.map(async (file) => {
        const url = await getImageUrl(`${folder}/${file.name}`);
        return {
          name: file.name,
          url,
          created_at: file.created_at,
          last_accessed_at: file.last_accessed_at,
          metadata: file.metadata
        };
      })
    );

    return imagesWithUrls;
  } catch (error) {
    console.error('Error al listar las imágenes:', error.message);
    throw error;
  }
} 