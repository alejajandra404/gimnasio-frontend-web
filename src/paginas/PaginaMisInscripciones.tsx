import { Link } from 'react-router';
import { useMisInscripciones } from '../hooks/useMisInscripciones';
import { urlImagen } from '../servicios/api';
import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';

export default function PaginaMisInscripciones() {
    const { inscripciones, cargando, error, reintentar } = useMisInscripciones();

    if (cargando) return <Cargando />;
    if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />;

    return (
        <>
            <section className="pagina__encabezado">
                <h1>Mis inscripciones</h1>
                {/* el texto cambia si todavia no hay ninguna inscripcion */}
                <p className="pagina__bajada">
                    {inscripciones.length === 0
                        ? 'Todavía no estás inscrito en ninguna clase.'
                        : `${inscripciones.length} clase(s) esta semana.`}
                </p>
            </section>

            <ul className="inscripciones">
                {/* una sola inscripcion que se repite por cada una que trae la api */}
                {inscripciones.map((i) => (
                    <li key={i.id} className="inscripcion">
                        <img className="inscripcion__imagen" src={urlImagen(i.clase.imagen)} alt="" />
                        <div>
                            {/* el nombre de la clase lleva al detalle de esa clase */}
                            <Link to={`/clases/${i.clase.id}`} className="inscripcion__clase">{i.clase.nombre}</Link>
                            <div className="inscripcion__meta">{i.horario.dia} · {i.horario.horaInicio} · {i.horario.entrenador}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
