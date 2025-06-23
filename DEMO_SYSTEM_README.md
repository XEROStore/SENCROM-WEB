# Sistema de Solicitudes de Demo - SENCROM

## Descripción
Este sistema permite manejar solicitudes de demo de manera estructurada, recolectando información del cliente y automatizando el proceso de seguimiento.

## Características Implementadas

### 1. Bot Inteligente Mejorado
- ✅ Corregido el problema del doble saludo de bienvenida
- ✅ Flujo estructurado para solicitudes de demo
- ✅ Recolección de datos del cliente de manera natural
- ✅ Validación de información del negocio

### 2. Base de Datos en Supabase
- ✅ Tabla `solicitudes_demo` para almacenar datos
- ✅ Índices optimizados para rendimiento
- ✅ Políticas de seguridad (RLS)
- ✅ Servicios para operaciones CRUD

### 3. Automatización con Make.com
- ✅ Webhook para enviar solicitudes de demo
- ✅ Integración con Gmail para notificaciones
- ✅ Flujo automatizado de seguimiento

### 4. Panel de Administración
- ✅ Componente para gestionar solicitudes
- ✅ Filtros por estado
- ✅ Actualización de estados en tiempo real
- ✅ Vista detallada de cada solicitud

## Configuración Requerida

### 1. Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto con:

```env
# OpenAI API Key
OPENAI_API_KEY=tu_openai_api_key_aqui

# Supabase Configuration
VITE_SUPABASE_URL=tu_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key_aqui

# Make.com Webhooks (opcional, para automatización)
MAKE_DEMO_WEBHOOK=https://hook.us2.make.com/tu_webhook_aqui
```

### 2. Configuración de Supabase

#### Crear la tabla en Supabase:
1. Ve al panel de administración de Supabase
2. Navega a SQL Editor
3. Ejecuta el script `supabase_migration.sql`

#### Configurar políticas RLS:
Las políticas ya están incluidas en el script SQL, pero puedes verificarlas en:
- Authentication > Policies > solicitudes_demo

### 3. Configuración de Make.com (Opcional)

#### Crear el escenario en Make:
1. **Trigger**: Webhook
   - URL: `https://hook.us2.make.com/demo-request-webhook`
   - Método: POST

2. **Parser**: JSON
   - Parsear el payload recibido

3. **Filtro**: Verificar tipo de solicitud
   - Condición: `tipo = "solicitud_demo"`

4. **Gmail**: Enviar email
   - Destinatario: equipo de ventas
   - Asunto: "Nueva solicitud de demo - {nombre_cliente}"
   - Contenido: Datos del cliente y solicitud

5. **Trello**: Crear tarjeta (opcional)
   - Lista: "Solicitudes de Demo"
   - Título: "{nombre_cliente} - {producto_servicio}"
   - Descripción: Datos completos del cliente

## Flujo de Trabajo

### 1. Cliente solicita demo
- El bot identifica la solicitud
- Pregunta por el producto/servicio específico
- Recolecta información del negocio
- Solicita datos de contacto

### 2. Almacenamiento automático
- Los datos se guardan en Supabase
- Se envía notificación por email (si está configurado Make)
- Se crea registro con estado "pendiente"

### 3. Seguimiento del equipo
- El equipo recibe la notificación
- Puede ver los detalles en el panel de administración
- Actualiza el estado según el progreso
- Agenda la demo cuando corresponda

## Estructura de Datos

### Tabla `solicitudes_demo`
```sql
- id: Identificador único
- producto_servicio: Producto de interés
- nombre_cliente: Nombre completo
- telefono: Número de contacto
- email: Correo electrónico
- nombre_negocio: Nombre de la empresa
- sector_negocio: Sector de trabajo
- tamano_empresa: Tamaño de la empresa
- desafios: Desafíos específicos
- estado: Estado de la solicitud
- fecha_solicitud: Fecha de solicitud
- canal: Canal de origen (web, whatsapp, etc.)
- notas_internas: Notas del equipo
- asignado_a: Persona asignada
- fecha_agendada: Fecha de la demo
- hora_agendada: Hora de la demo
```

## Estados de Solicitud
- **pendiente**: Solicitud nueva, sin revisar
- **en_proceso**: En revisión por el equipo
- **agendada**: Demo programada
- **completada**: Demo realizada
- **cancelada**: Solicitud cancelada

## Uso del Panel de Administración

### Integrar el componente:
```jsx
import DemoRequestsPanel from './components/DemoRequestsPanel';

// En tu página de administración
<DemoRequestsPanel />
```

### Funcionalidades disponibles:
- Ver todas las solicitudes
- Filtrar por estado
- Actualizar estado de solicitudes
- Ver detalles completos de cada solicitud
- Actualizar en tiempo real

## Mantenimiento

### Monitoreo:
- Revisar logs de la API para errores
- Verificar que las notificaciones se envíen correctamente
- Monitorear el rendimiento de la base de datos

### Backup:
- Supabase realiza backups automáticos
- Exportar datos periódicamente si es necesario

### Actualizaciones:
- Mantener actualizadas las dependencias
- Revisar y actualizar el prompt del bot según sea necesario
- Optimizar consultas de base de datos si el volumen aumenta

## Solución de Problemas

### Bot no responde:
1. Verificar que OpenAI API Key esté configurada
2. Revisar logs de la API
3. Verificar que el prompt esté correctamente formateado

### Datos no se guardan:
1. Verificar configuración de Supabase
2. Revisar políticas RLS
3. Verificar que la tabla exista

### Notificaciones no llegan:
1. Verificar configuración de Make.com
2. Revisar webhook URL
3. Verificar formato del payload

## Contacto
Para soporte técnico o preguntas sobre el sistema, contactar al equipo de desarrollo de SENCROM. 