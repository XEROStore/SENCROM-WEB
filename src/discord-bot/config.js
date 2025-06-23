import 'dotenv/config';

export default {
  // Token de Discord
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  
  // Configuración de Shapes
  SHAPES_API_KEY: process.env.SHAPES_API_KEY,
  SHAPES_API_URL: process.env.SHAPES_API_URL || 'https://api.shapes.inc/shapes/public/Crom-Bot',
  
  // Configuración del bot
  PREFIX: '!',
  CHANNEL_NAME: 'CROM-BOT',
  CHANNEL_ID: process.env.DISCORD_CHANNEL_ID || '1382378898662097059',
  
  // Mensajes del bot
  MESSAGES: {
    ERROR: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
    HELP: 'Comandos disponibles:\n!chat - Iniciar una conversación\n!help - Mostrar esta ayuda'
  },

  // Configuración de Trello para la gestión de tickets
  TRELLO_CONFIG: {
    API_KEY: process.env.TRELLO_API_KEY,
    TOKEN: process.env.TRELLO_TOKEN,
    BOARD_ID: process.env.TRELLO_BOARD_ID,
    LIST_IDS: {
      NUEVOS: process.env.TRELLO_LIST_NUEVOS || '6856a3dd91cc8686821df5bf',
      EN_PROCESO: process.env.TRELLO_LIST_EN_PROCESO || '6856a3ed14c0d95fafba333b',
      CERRADOS: process.env.TRELLO_LIST_CERRADOS || '6856a3f3347a7e838a45a14c'
    },
    LABEL_IDS: {
      SOPORTE: process.env.TRELLO_LABEL_SOPORTE || '681bfb37dac4881cfe85ae0e',
      VENTA: process.env.TRELLO_LABEL_VENTA || '6856fbda551513ced751bdbf'
    }
  }
}; 