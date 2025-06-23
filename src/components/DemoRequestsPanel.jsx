import React, { useState, useEffect } from 'react';
import { obtenerSolicitudesDemo, actualizarEstadoDemo } from '../lib/demoService.js';

const DemoRequestsPanel = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('todos');

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      const resultado = await obtenerSolicitudesDemo();
      if (resultado.success) {
        setSolicitudes(resultado.data);
      } else {
        setError(resultado.error);
      }
    } catch (err) {
      setError('Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const resultado = await actualizarEstadoDemo(id, nuevoEstado);
      if (resultado.success) {
        // Actualizar la lista local
        setSolicitudes(prev => 
          prev.map(sol => 
            sol.id === id ? { ...sol, estado: nuevoEstado } : sol
          )
        );
      } else {
        alert('Error al actualizar el estado');
      }
    } catch (err) {
      alert('Error al actualizar el estado');
    }
  };

  const solicitudesFiltradas = solicitudes.filter(sol => 
    filtroEstado === 'todos' || sol.estado === filtroEstado
  );

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-500';
      case 'en_proceso': return 'bg-blue-500';
      case 'agendada': return 'bg-green-500';
      case 'completada': return 'bg-gray-500';
      case 'cancelada': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Solicitudes de Demo</h2>
        <div className="flex gap-2">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En proceso</option>
            <option value="agendada">Agendada</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
          <button
            onClick={cargarSolicitudes}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Actualizar
          </button>
        </div>
      </div>

      {solicitudesFiltradas.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No hay solicitudes de demo {filtroEstado !== 'todos' && `con estado "${filtroEstado}"`}
        </div>
      ) : (
        <div className="space-y-4">
          {solicitudesFiltradas.map((solicitud) => (
            <div key={solicitud.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {solicitud.nombre_cliente} - {solicitud.nombre_negocio}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {solicitud.producto_servicio}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getEstadoColor(solicitud.estado)}`}>
                    {solicitud.estado}
                  </span>
                  <select
                    value={solicitud.estado}
                    onChange={(e) => cambiarEstado(solicitud.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="agendada">Agendada</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Email:</strong> {solicitud.email}</p>
                  <p><strong>Teléfono:</strong> {solicitud.telefono}</p>
                  <p><strong>Sector:</strong> {solicitud.sector_negocio || 'No especificado'}</p>
                </div>
                <div>
                  <p><strong>Tamaño empresa:</strong> {solicitud.tamano_empresa || 'No especificado'}</p>
                  <p><strong>Canal:</strong> {solicitud.canal}</p>
                  <p><strong>Fecha:</strong> {formatearFecha(solicitud.fecha_solicitud)}</p>
                </div>
              </div>

              {solicitud.desafios && (
                <div className="mt-3">
                  <p className="text-sm"><strong>Desafíos:</strong></p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {solicitud.desafios}
                  </p>
                </div>
              )}

              {solicitud.notas_internas && (
                <div className="mt-3">
                  <p className="text-sm"><strong>Notas internas:</strong></p>
                  <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    {solicitud.notas_internas}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoRequestsPanel; 