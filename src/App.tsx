import { Routes, Route, Navigate } from 'react-router';
import { Layout } from './componentes/Layout';
import PaginaClases from './paginas/paginaClases';
import PaginaClase from './paginas/paginaClase';
import { NoEncontrado } from './componentes/NoEncontrado';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clases" replace />} />
        <Route path="/clases" element={<PaginaClases />} />
        <Route path="/clases/:id" element={<PaginaClase />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}