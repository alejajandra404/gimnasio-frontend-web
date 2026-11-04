// <Encabezado> — RECURSO: la marca, los enlaces y el botón de Entrar.
// NavLink es un <Link> que además sabe si su ruta es la actual: así se
// pinta el enlace activo sin una línea de JavaScript propio.
import { Link, NavLink } from 'react-router';
import { useSesion } from '../sesion/SesionContext';
import { useInscripciones } from '../estado/inscripciones';

// La clase del enlace según si está activo o no.
function claseEnlace({ isActive }: { isActive: boolean }) {
  return isActive ? 'barra__enlace barra__enlace--activo' : 'barra__enlace';
}

export function Encabezado() {
  // leemos la sesion para saber si hay alguien dentro o no
  const { usuario, salir } = useSesion();

  // del store solo sacamos cuantas inscripciones hay. asi el encabezado se actualiza solo cuando cambia ese numero
  const total = useInscripciones((estado) => estado.lista.length);

  return (
    <header className="barra">
      <div className="barra__interior">
        <Link to="/" className="barra__marca">
          <img src="/logo.svg" alt="" />
          Gimnasio Titanes
        </Link>

        <nav>
          <ul className="barra__enlaces">
            <li><NavLink to="/clases" className={claseEnlace}>Clases</NavLink></li>
            <li><NavLink to="/mis-inscripciones" className={claseEnlace}>
              Mis inscripciones
              {/* el contador solo sale si hay sesion */}
              {usuario && <span className="barra__contador">{total}</span>}
            </NavLink></li>
          </ul>
        </nav>

        {/* con sesion sale el nombre y Salir; sin sesion sale Entrar */}
        <div className="barra__sesion">
          {usuario ? (
            <>
              <span className="barra__usuario">Hola, {usuario.nombre}</span>
              <button className="boton boton--secundario boton--chico" onClick={salir}>Salir</button>
            </>
          ) : (
            <Link to="/entrar" className="boton boton--chico">Entrar</Link>
          )}
        </div>
      </div>
    </header>
  );
}
