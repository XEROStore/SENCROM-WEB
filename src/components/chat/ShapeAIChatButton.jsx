import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShapeAIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-sencrom-blue hover:bg-sencrom-blue/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              className="fixed bottom-24 left-6 w-96 h-[600px] bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <iframe
                src="https://shapes.inc/crombot"
                className="w-full h-full border-0"
                title="Shape AI Chat"
              />
            </motion.div>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="bg-sencrom-red hover:bg-sencrom-red/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShapeAIChatButton; 