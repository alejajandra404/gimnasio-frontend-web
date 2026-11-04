import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { Layout } from './componentes/Layout';
import { NoEncontrado } from './componentes/NoEncontrado';
import { RutaProtegida } from './componentes/RutaProtegida';

// cada pagina se descarga solo cuando alguien la visita. lazy solo funciona con paginas que usan export default
const PaginaClases = lazy(() => import('./paginas/PaginaClases'));
const PaginaClase = lazy(() => import('./paginas/PaginaClase'));
const PaginaEntrar = lazy(() => import('./paginas/PaginaEntrar'));
const PaginaRegistro = lazy(() => import('./paginas/PaginaRegistro'));
const PaginaMisInscripciones = lazy(() => import('./paginas/PaginaMisInscripciones'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clases" replace />} />
        <Route path="/clases" element={<PaginaClases />} />
        <Route path="/clases/:id" element={<PaginaClase />} />
        <Route path="/entrar" element={<PaginaEntrar />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        {/* las rutas que van adentro de RutaProtegida solo se ven con sesion */}
        <Route element={<RutaProtegida />}>
          <Route path="/mis-inscripciones" element={<PaginaMisInscripciones />} />
        </Route>
        <Route path="*"element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
