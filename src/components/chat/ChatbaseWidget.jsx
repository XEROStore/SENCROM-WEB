import React, { useEffect } from 'react';

const ChatbaseWidget = () => {
  useEffect(() => {
    // Inicializar el widget de Chatbase
    if (window.chatbase) {
      window.chatbase('config', {
        chatbotId: 'C1ePfuE0OBNfyBlL3p8zC',
        domain: 'www.chatbase.co'
      });
    }
  }, []);

  return null; // Este componente no renderiza nada visualmente
};

export default ChatbaseWidget; 