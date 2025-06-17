import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShapeAIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Verificar si Shapes API está disponible
    const checkShapesAPI = () => {
      if (window.ShapesAPI) {
        setIsLoaded(true);
      } else {
        setTimeout(checkShapesAPI, 1000); // Reintentar cada segundo
      }
    };
    checkShapesAPI();
  }, []);

  const toggleChat = () => {
    if (!isLoaded) {
      console.warn('Shapes API no está cargada aún');
      return;
    }

    setIsOpen(!isOpen);
    try {
      if (!isOpen) {
        window.ShapesAPI.open();
      } else {
        window.ShapesAPI.close();
      }
    } catch (error) {
      console.error('Error al interactuar con Shapes API:', error);
    }
  };

  if (!isLoaded) {
    return null; // No mostrar el botón hasta que Shapes API esté cargada
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleChat}
            className="bg-sencrom-blue hover:bg-sencrom-blue/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleChat}
            className="bg-sencrom-red hover:bg-sencrom-red/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <X className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShapeAIChatButton; 