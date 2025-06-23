import express from 'express';
import cors from 'cors';
import { procesarMensajeBot } from '../discord-bot/botLogic.js';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para chat general
app.post('/api/chat', async (req, res) => {
  const { mensaje, historial } = req.body;
  if (!mensaje) {
    return res.status(400).json({ error: 'Falta el mensaje.' });
  }
  try {
    const respuesta = await procesarMensajeBot(mensaje, historial);
    res.json({ respuesta });
  } catch (error) {
    console.error('Error en /api/chat:', error);
    res.status(500).json({ error: 'Error interno del bot.' });
  }
});

// (Opcional) Endpoint para agendar citas
// app.post('/api/agendar', async (req, res) => {
//   // Aquí podrías recibir los datos y procesar el agendamiento
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API del bot escuchando en puerto ${PORT}`);
}); 