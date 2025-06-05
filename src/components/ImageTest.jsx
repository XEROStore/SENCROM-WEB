import React, { useEffect, useState } from 'react';
import { listImages } from '../lib/imageService';
import { Loader2 } from 'lucide-react';

export default function ImageTest() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadImages() {
      try {
        const imageList = await listImages();
        setImages(imageList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Cargando imágenes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
        <h3 className="text-red-500 font-semibold mb-2">Error al cargar imágenes</h3>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Imágenes disponibles</h2>
      {images.length === 0 ? (
        <p className="text-gray-400">No hay imágenes disponibles</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.name} className="border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src={image.url} 
                alt={image.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <p className="text-sm text-gray-600 truncate">{image.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 