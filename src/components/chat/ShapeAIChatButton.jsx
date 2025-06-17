import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShapeAIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (window.shapeai) {
      if (!isOpen) {
        window.shapeai('open');
      } else {
        window.shapeai('close');
      }
    }
  };

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