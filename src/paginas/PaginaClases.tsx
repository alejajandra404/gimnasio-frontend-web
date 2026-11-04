import { Link } from 'react-router';
import { useClases } from '../hooks/useClases';
import { urlImagen } from '../servicios/api';
import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';

export default function PaginaClases() {
    const { clases, cargando, error, reintentar } = useClases();

    // mientras carga o si falla, mostramos eso en lugar del catalogo
    if (cargando) return <Cargando />;
    if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />;

    return (
        <>
            <section className="pagina__encabezado">
                <h1>Clases</h1>
                <p className="pagina__bajada">Elige una clase para ver sus horarios e inscribirte.</p>
            </section>

            <div className="rejilla">
                {/* una tarjeta por cada clase. es un link de react router y no un <a> para que no recargue la pagina */}
                {clases.map((c) => (
                    <Link key={c.id} to={`/clases/${c.id}`} className="tarjeta-clase">
                        {/* la imagen la sirve el backend, por eso se arma la direccion con urlImagen */}
                        <img className="tarjeta-clase__imagen" src={urlImagen(c.imagen)} alt={c.nombre} loading="lazy" />
                        <div className="tarjeta-clase__cuerpo">
                            {/* la clase de css cambia de color segun la categoria */}
                            <span className={`etiqueta etiqueta--${c.categoria}`}>{c.categoria}</span>
                            <span className="tarjeta-clase__titulo">{c.nombre}</span>
                            <span className="tarjeta-clase__meta">{c.duracionMin} min</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
