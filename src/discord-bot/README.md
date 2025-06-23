# Bot de Discord para SENCROM

Este bot de Discord integra la API de Shapes para proporcionar asistencia a los usuarios del servidor de SENCROM.

## Requisitos

1. Node.js (versión 16 o superior)
2. Token de Discord (crear un bot en [Discord Developer Portal](https://discord.com/developers/applications))
3. API Key de Shapes

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Configura el bot:
   - Abre `src/discord-bot/config.js`
   - Reemplaza `TU_TOKEN_DE_DISCORD` con tu token de Discord
   - Verifica que la API Key de Shapes sea correcta

3. Inicia el bot:
```bash
npm run start:bot
```

## Uso

1. Crea un canal llamado `chat-bot` en tu servidor de Discord
2. Invita al bot a tu servidor usando el enlace de OAuth2 generado en el Discord Developer Portal
3. Comandos disponibles:
   - `!chat` - Inicia una conversación con el bot
   - `!help` - Muestra la ayuda

## Configuración

Puedes modificar la configuración del bot en `src/discord-bot/config.js`:
- `PREFIX` - Prefijo para los comandos (por defecto: `!`)
- `CHANNEL_NAME` - Nombre del canal donde el bot responderá
- `MESSAGES` - Mensajes personalizados del bot

## Solución de problemas

Si el bot no responde:
1. Verifica que el token de Discord sea correcto
2. Asegúrate de que el bot tenga los permisos necesarios
3. Verifica que el canal `chat-bot` exista
4. Revisa los logs del bot para ver errores específicos 