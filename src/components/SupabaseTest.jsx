import React, { useEffect, useState } from 'react';
import { testSupabaseConnection } from '../lib/supabaseTest';
import { Loader2 } from 'lucide-react';

export default function SupabaseTest() {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        console.log('Iniciando prueba de conexión...');
        console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
        console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Presente' : 'No presente');
        
        const result = await testSupabaseConnection();
        console.log('Resultado de la prueba:', result);
        
        setData(result);
        setStatus('success');
      } catch (err) {
        console.error('Error detallado:', err);
        setError(err.message);
        setStatus('error');
      }
    }

    checkConnection();
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Verificando conexión con Supabase...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
        <h3 className="text-red-500 font-semibold mb-2">Error de conexión</h3>
        <p className="text-red-400 text-sm">{error}</p>
        <div className="mt-2 text-xs text-red-300">
          <p>URL: {import.meta.env.VITE_SUPABASE_URL ? 'Configurada' : 'No configurada'}</p>
          <p>Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configurada' : 'No configurada'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
      <h3 className="text-green-500 font-semibold mb-2">Conexión exitosa</h3>
      <pre className="text-xs text-green-400 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
} 