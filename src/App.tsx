import { Routes, Route, Navigate } from 'react-router';
import { Layout } from './componentes/Layout';
import PaginaClases from './paginas/PaginaClases';
import PaginaClase from './paginas/PaginaClase';
import { NoEncontrado } from './componentes/NoEncontrado';
import PaginaEntrar from './paginas/PaginaEntrar';
import PaginaRegistro from './paginas/PaginaRegistro';
import PaginaMisInscripciones from './paginas/PaginaMisInscripciones';
import { RutaProtegida } from './componentes/RutaProtegida';

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