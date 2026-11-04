import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useClase } from '../hooks/useClase';
import { useSesion } from '../sesion/SesionContext';
import { useInscripciones } from '../estado/inscripciones';
import { inscribirse } from '../servicios/clasesServicio';
import { urlImagen, estadoDeError, mensajeDeError } from '../servicios/api';
import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';

// el aviso que sale arriba de los horarios: verde si salio bien, rojo si algo fallo
interface Aviso {
    tipo: 'exito' | 'error';
    texto: string;
}

export default function PaginaClase() {
    // el id que viene de la url (/clases/3) llega como texto, por eso se convierte a numero
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { clase, cargando, error, reintentar } = useClase(Number(id));
    const { usuario } = useSesion();
    const [aviso, setAviso] = useState<Aviso | null>(null);

    // las inscripciones de la persona vienen del store, y cargarInscripciones sirve para ponerlas al dia
    const misInscripciones = useInscripciones((estado) => estado.lista);
    const cargarInscripciones = useInscripciones((estado) => estado.cargar);

    if (cargando) return <Cargando />;

    if (error || !clase) {
        return (
            <MensajeError
                mensaje={error || 'Ocurrió un error al cargar la clase'}
                onReintentar={reintentar}
            />
        );
    }

    async function inscribir(horarioId: number) {
        // sin sesion no se puede inscribir: manda a entrar
        if (!usuario) {
            navigate('/entrar');
            return;
        }

        try {
            await inscribirse(horarioId);
            setAviso({ tipo: 'exito', texto: 'Te inscribiste correctamente.' });
            // pedir la clase para que los lugares disponibles esten al dia
            reintentar();
            // pedir las inscripciones otra vez para que el store y el contador del encabezado se actualicen
            cargarInscripciones();
        } catch (e) {
            const estado = estadoDeError(e);
            if (estado === 409 || estado === 403) {
                // 409: ya esta inscrito o esta lleno. 403: la cuenta no es de un miembro
                setAviso({ tipo: 'error', texto: mensajeDeError(e, 'No se pudo completar la inscripción.') });
            } else {
                setAviso({ tipo: 'error', texto: 'No se pudo completar la inscripción.' });
            }
        }
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
                    {aviso && <p className={`aviso aviso--${aviso.tipo}`}>{aviso.texto}</p>}
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
                                {/* si el horario ya esta en el store sale "ya estas inscrito"; si no quedan lugares, "lleno"; si no, el boton */}
                                {misInscripciones.some((i) => i.horario.id === h.id) ? (
                                    <span className="horario__inscrito">Ya estás inscrito</span>
                                ) : h.disponibles === 0 ? (
                                    <span className="horario__lleno">Lleno</span>
                                ) : (
                                    <button className="boton boton--chico" onClick={() => inscribir(h.id)}>
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