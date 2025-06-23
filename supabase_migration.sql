-- Crear tabla para solicitudes de demo
CREATE TABLE IF NOT EXISTS solicitudes_demo (
    id BIGSERIAL PRIMARY KEY,
    producto_servicio VARCHAR(255) NOT NULL,
    nombre_cliente VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    nombre_negocio VARCHAR(255) NOT NULL,
    sector_negocio VARCHAR(255),
    tamano_empresa VARCHAR(100),
    desafios TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha_solicitud TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_actualizacion TIMESTAMP WITH TIME ZONE,
    canal VARCHAR(50) DEFAULT 'web',
    notas_internas TEXT,
    asignado_a VARCHAR(255),
    fecha_agendada TIMESTAMP WITH TIME ZONE,
    hora_agendada TIME
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_solicitudes_demo_estado ON solicitudes_demo(estado);
CREATE INDEX IF NOT EXISTS idx_solicitudes_demo_fecha ON solicitudes_demo(fecha_solicitud);
CREATE INDEX IF NOT EXISTS idx_solicitudes_demo_email ON solicitudes_demo(email);
CREATE INDEX IF NOT EXISTS idx_solicitudes_demo_canal ON solicitudes_demo(canal);

-- Crear política RLS (Row Level Security) si es necesario
ALTER TABLE solicitudes_demo ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción desde la aplicación
CREATE POLICY "Permitir inserción de solicitudes de demo" ON solicitudes_demo
    FOR INSERT WITH CHECK (true);

-- Política para permitir lectura de solicitudes de demo
CREATE POLICY "Permitir lectura de solicitudes de demo" ON solicitudes_demo
    FOR SELECT USING (true);

-- Política para permitir actualización de solicitudes de demo
CREATE POLICY "Permitir actualización de solicitudes de demo" ON solicitudes_demo
    FOR UPDATE USING (true);

-- Comentarios para documentar la tabla
COMMENT ON TABLE solicitudes_demo IS 'Tabla para almacenar solicitudes de demo de clientes';
COMMENT ON COLUMN solicitudes_demo.producto_servicio IS 'Producto o servicio de interés para la demo';
COMMENT ON COLUMN solicitudes_demo.nombre_cliente IS 'Nombre completo del cliente';
COMMENT ON COLUMN solicitudes_demo.telefono IS 'Número de teléfono del cliente';
COMMENT ON COLUMN solicitudes_demo.email IS 'Correo electrónico del cliente';
COMMENT ON COLUMN solicitudes_demo.nombre_negocio IS 'Nombre del negocio o empresa del cliente';
COMMENT ON COLUMN solicitudes_demo.sector_negocio IS 'Sector en el que trabaja el cliente';
COMMENT ON COLUMN solicitudes_demo.tamano_empresa IS 'Tamaño de la empresa (número de empleados)';
COMMENT ON COLUMN solicitudes_demo.desafios IS 'Desafíos específicos que enfrenta el cliente';
COMMENT ON COLUMN solicitudes_demo.estado IS 'Estado de la solicitud: pendiente, en_proceso, agendada, completada, cancelada';
COMMENT ON COLUMN solicitudes_demo.fecha_solicitud IS 'Fecha y hora de la solicitud';
COMMENT ON COLUMN solicitudes_demo.fecha_actualizacion IS 'Fecha y hora de la última actualización';
COMMENT ON COLUMN solicitudes_demo.canal IS 'Canal por el que se recibió la solicitud: web, whatsapp, etc.';
COMMENT ON COLUMN solicitudes_demo.notas_internas IS 'Notas internas del equipo de ventas';
COMMENT ON COLUMN solicitudes_demo.asignado_a IS 'Persona asignada para manejar la solicitud';
COMMENT ON COLUMN solicitudes_demo.fecha_agendada IS 'Fecha agendada para la demo';
COMMENT ON COLUMN solicitudes_demo.hora_agendada IS 'Hora agendada para la demo'; 