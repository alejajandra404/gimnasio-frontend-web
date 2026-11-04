import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useSesion } from '../sesion/SesionContext';
import { mensajeDeError } from '../servicios/api';

export default function PaginaEntrar() {
  const { entrar } = useSesion();
  const navegar = useNavigate();

  // si manda a entrar desde otra pagina, ahi se guarda a donde ir. si no, va a /clases
  const desde = (useLocation().state as { desde?: string } | null)?.desde ?? '/clases';

  // cada campo del formulario vive en un estado: asi el formulario es controlado
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault(); // para que el formulario no recargue la pagina
    setError(null);
    setEnviando(true);

    try {
      await entrar(correo, password);
      navegar(desde);
    } catch (e) {
      // aqui sale el mensaje que manda la api, por ejemplo "credenciales invalidas"
      setError(mensajeDeError(e, 'No se pudo iniciar sesion'));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h1>Entrar</h1>
      {error && <p className="aviso aviso--error">{error}</p>}

      <label className="campo">
        <span className="campo__etiqueta">Correo</span>
        <input className="campo__control" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </label>

      <label className="campo">
        <span className="campo__etiqueta">Contraseña</span>
        <input className="campo__control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <button className="boton boton--ancho" type="submit" disabled={enviando}>
        {enviando ? 'Entrando...' : 'Entrar'}
      </button>
      <p className="formulario__pie">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </form>
  );
}
