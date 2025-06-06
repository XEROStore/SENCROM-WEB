import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Botón Flotante */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={toggleChat}
          size="icon"
          className="w-16 h-16 rounded-full bg-electric-green text-sencrom-gray-dark shadow-lg hover:bg-electric-green/90 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-90 flex items-center justify-center"
          aria-label="Abrir asistente virtual"
        >
          {isChatOpen ? <X size={32} /> : <img src="https://zvkpayuqrgunnoqavjqo.supabase.co/storage/v1/object/public/images//bot%202.png" alt="Asistente Virtual Icon" className="h-10 w-10" />}
        </Button>
      </motion.div>

      {/* Interfaz del Chat (Modal/Ventana) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-sencrom-gray border border-electric-green/30 rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 bg-sencrom-gray-dark border-b border-electric-green/30">
              <h3 className="text-lg font-semibold text-electric-green">Asistente Virtual</h3>
              <Button onClick={toggleChat} variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <X size={20} />
              </Button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto text-gray-300">
              {/* Aquí irá la conversación del chat */}
              <p>Hola, ¿en qué podemos ayudarte hoy?</p>
              {/* Mensajes de ejemplo */}
              {/* <p>...</p> */}
            </div>
            <div className="p-4 border-t border-electric-green/30 bg-sencrom-gray-dark">
              {/* Área de input para el mensaje */}
              <input 
                type="text" 
                placeholder="Escribe tu mensaje..." 
                className="w-full p-2 rounded-md bg-sencrom-gray-light border border-lime-green/30 text-foreground focus:outline-none focus:ring-1 focus:ring-electric-green focus:border-electric-green"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatButton; 