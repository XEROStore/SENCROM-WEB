import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WebBotChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); // {from: 'user'|'bot', text: string}
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: input,
          historial: messages.map(m => ({
            role: m.from === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        }),
      });
      const data = await res.json();
      if (data.respuesta && data.respuesta.respuesta_al_usuario) {
        setMessages((msgs) => [...msgs, { from: 'bot', text: data.respuesta.respuesta_al_usuario }]);
      } else {
        setMessages((msgs) => [...msgs, { from: 'bot', text: 'Lo siento, hubo un error al procesar tu mensaje.' }]);
      }
    } catch (e) {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Error de conexión con el bot.' }]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleChat}
            className="bg-[hsl(224,71%,4%)] shadow-xl rounded-full flex items-center justify-center w-14 h-14 p-0"
            aria-label="Abrir chat Crom-Bot"
          >
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-transparent">
              <img src="/logo-sencrom.png" alt="CROM-Bot" className="w-full h-full object-contain" style={{backgroundColor: 'transparent'}} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-[420px] max-w-[98vw] h-[600px] bg-[hsl(224,71%,4%)] shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#5ab507] to-[#009F5F]">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
                <img src="/logo-sencrom.png" alt="CROM-Bot" className="w-full h-full object-cover" style={{backgroundColor: 'transparent'}} />
              </div>
              <span className="text-white font-semibold text-lg tracking-wide">CROM-Bot</span>
              <button onClick={toggleChat} className="ml-auto text-white hover:text-[hsl(150,100%,54%)] text-2xl font-bold">×</button>
            </div>
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[hsl(224,71%,4%)] scrollbar-thin scrollbar-thumb-[hsl(215,28%,17%)] scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={
                    msg.from === 'user'
                      ? 'rounded-xl px-4 py-2 max-w-[80%] text-base bg-[#5ab507] text-white font-medium shadow-md'
                      : 'rounded-xl px-4 py-2 max-w-[80%] text-base bg-[hsl(215,28%,17%)] text-white font-medium shadow-md'
                  }>{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {/* Input */}
            <div className="p-3 bg-[hsl(224,71%,4%)] flex gap-2 items-center">
              <textarea
                className="flex-1 resize-none rounded-lg border border-[hsl(150,100%,54%)] px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[hsl(150,100%,54%)] bg-[hsl(215,28%,17%)] text-white placeholder:text-gray-400"
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-[hsl(150,100%,54%)] hover:bg-[hsl(150,100%,40%)] text-white rounded-lg px-4 py-2 text-base font-semibold shadow-md disabled:opacity-50"
              >Enviar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebBotChat; 