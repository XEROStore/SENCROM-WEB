import React, { useEffect, useState } from 'react';
import { testSupabaseConnection } from '../lib/supabaseTest';
import { Loader2 } from 'lucide-react';

export default function TableStructureTest() {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkStructure() {
      try {
        const result = await testSupabaseConnection();
        setData(result);
        setStatus('success');
      } catch (err) {
        setError(err.message);
        setStatus('error');
      }
    }

    checkStructure();
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Verificando estructura de la tabla...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Estructura de la tabla contact_submissions</h2>
      {data?.contacts?.structure ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2">Columna</th>
                <th className="border border-gray-200 p-2">Tipo</th>
                <th className="border border-gray-200 p-2">Nullable</th>
                <th className="border border-gray-200 p-2">Valor por defecto</th>
              </tr>
            </thead>
            <tbody>
              {data.contacts.structure.map((column, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 p-2">{column.column_name}</td>
                  <td className="border border-gray-200 p-2">{column.data_type}</td>
                  <td className="border border-gray-200 p-2">{column.is_nullable}</td>
                  <td className="border border-gray-200 p-2">{column.column_default || 'Ninguno'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se pudo obtener la estructura de la tabla</p>
      )}
    </div>
  );
} 