import { useState, useEffect } from 'react';
import { traerClases } from '../servicios/clasesServicio';
import type { Clase } from '../clase';

export function useClases() {
  const [clases, setClases] = useState<Clase[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState<number>(0);

  useEffect(() => {
    setCargando(true);
    setError(null);

    traerClases()
      .then((datos) => {
        setClases(datos);
        setCargando(false);
      })
      .catch(() => {
        setError('No se pudo conectar con el gimnasio');
        setCargando(false);
      });
  }, [intento]);

  const reintentar = () => {
    setCargando(true);
    setError(null);
    setIntento((prev) => prev + 1);
  };

  return { clases, cargando, error, reintentar };
}