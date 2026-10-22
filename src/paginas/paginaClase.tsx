import { useParams, Link, useNavigate } from 'react-router';
import { useClase } from '../hooks/useClase';
import { urlImagen } from '../servicios/api';
import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';

export default function PaginaClase() {
    // el id que viene de la url (/clases/3) llega como texto, por eso se convierte a numero
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { clase, cargando, error, reintentar } = useClase(Number(id));

    if (cargando) return <Cargando />;

    if (error || !clase) {
        return (
            <MensajeError
                mensaje={error || 'Ocurrió un error al cargar la clase'}
                onReintentar={reintentar}
            />
        );
    }

    return (
        <>
            <Link to="/clases" className="detalle__volver">← Todas las clases</Link>

            <article className="detalle">
                <img className="detalle__imagen" src={urlImagen(clase.imagen)} alt={clase.nombre} />
                <div className="detalle__datos">
                    <span className={`etiqueta etiqueta--${clase.categoria}`}>{clase.categoria}</span>
                    <h1>{clase.nombre}</h1>
                    <p className="pagina__bajada">{clase.descripcion} · {clase.duracionMin} min</p>

                    <h2>Horarios</h2>
                    <ul className="horarios">
                        {/* un solo horario que se repite por cada uno que trae la clase */}
                        {clase.horarios.map((h) => (
                            <li key={h.id} className="horario">
                                <div>
                                    <div className="horario__dia">{h.dia} · {h.horaInicio}</div>
                                    <div className="horario__meta">
                                        {h.entrenador} · {h.disponibles} de {h.cupoMaximo} lugares
                                    </div>
                                </div>
                                {/* si ya no quedan lugares sale "lleno", si no, el boton para inscribirse */}
                                {h.disponibles === 0 ? (
                                    <span className="horario__lleno">Lleno</span>
                                ) : (
                                    <button className="boton boton--chico" onClick={() => navigate('/entrar')}>
                                        Inscribirme
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </>
    );
}
