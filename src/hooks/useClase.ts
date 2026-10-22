import { useState, useEffect } from 'react';
import { traerClase } from '../servicios/clasesServicio';
import type { ClaseConHorarios } from '../clase';

export function useClase(id: number) {
  const [clase, setClase] = useState<ClaseConHorarios | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState<number>(0);

  useEffect(() => {
    if (!id) return;

    setCargando(true);
    setError(null);

    traerClase(id)
      .then((datos) => {
        setClase(datos);
        setCargando(false);
      })
      .catch(() => {
        setError('No se pudo obtener los detalles de la clase');
        setCargando(false);
      });
  }, [id, intento]);

  const reintentar = () => {
    setCargando(true);
    setError(null);
    setIntento((prev) => prev + 1);
  };

  return { clase, cargando, error, reintentar };
}