import { create } from 'zustand';
import type { Inscripcion } from '../clase';
import { traerMisInscripciones } from '../servicios/clasesServicio';
import { mensajeDeError } from '../servicios/api';

// lo que guarda el store: la lista, si esta cargando, si hubo error, y las dos funciones para cambiarlo
interface EstadoInscripciones {
  lista: Inscripcion[];
  cargando: boolean;
  error: string | null;
  cargar: () => Promise<void>;
  vaciar: () => void;
}

// a diferencia del contexto, aqui no hace falta un proveedor: cualquier componente puede usar este hook directo
export const useInscripciones = create<EstadoInscripciones>()((set) => ({
  lista: [],
  cargando: true,
  error: null,

  // pide las inscripciones a la api y las guarda en el store
  cargar: async () => {
    set({ cargando: true, error: null });
    try {
      set({ lista: await traerMisInscripciones() });
    } catch (e) {
      set({ error: mensajeDeError(e, 'No se pudieron cargar tus inscripciones.') });
    } finally {
      set({ cargando: false });
    }
  },

  // deja el store como nuevo, por ejemplo al salir de la sesion
  vaciar: () => set({ lista: [], cargando: false, error: null }),
}));
