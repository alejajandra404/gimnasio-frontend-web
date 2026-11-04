import { Navigate, Outlet, useLocation } from 'react-router';
import { useSesion } from '../sesion/SesionContext';

// esta ruta no tiene pagina propia: deja pasar a las rutas de adentro solo si hay sesion
export function RutaProtegida() {
  const { usuario } = useSesion();
  const ubicacion = useLocation();

  // sin sesion, manda a /entrar y guarda a donde queria ir para regresar despues
  if (!usuario) {
    return <Navigate to="/entrar" replace state={{ desde: ubicacion.pathname }} />;
  }

  // con sesion, el outlet es el hueco donde se pinta la ruta de adentro
  return <Outlet />;
}
