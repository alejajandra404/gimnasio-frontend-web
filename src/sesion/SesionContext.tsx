import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Sesion, Usuario } from '../clase';
import * as servicio from '../servicios/sesion';

// lo que va a poder usar cualquier componente que lea la sesion
interface ValorSesion {
  usuario: Usuario | null;
  entrar: (correo: string, password: string) => Promise<void>;
  registrar: (nombre: string, correo: string, password: string) => Promise<void>;
  salir: () => void;
}

const SesionContext = createContext<ValorSesion | null>(null);

// al abrir la pagina buscamos si ya habia un usuario guardado, asi la sesion no se pierde al recargar
function leerUsuario(): Usuario | null {
  const usuarioGuardado = localStorage.getItem('usuario');

  return usuarioGuardado ? (JSON.parse(usuarioGuardado) as Usuario) : null;
}

export function ProveedorSesion({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(leerUsuario);

  // guarda el token y el usuario en el navegador y avisa a toda la app quien entro
  function guardar(sesion: Sesion) {
    localStorage.setItem('token', sesion.token);
    localStorage.setItem('usuario', JSON.stringify(sesion.usuario));

    setUsuario(sesion.usuario);
  }

  async function entrar(correo: string, password: string) {
    guardar(await servicio.entrar(correo, password));
  }

  async function registrar(nombre: string, correo: string, password: string) {
    guardar(await servicio.registrar(nombre, correo, password));
  }

  function salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  return (
    <SesionContext value={{ usuario, entrar, registrar, salir }}>
      {children}
    </SesionContext>
  );
}

// el hook para leer la sesion. si se usa fuera del proveedor, avisa con un error
export function useSesion() {
  const valor = useContext(SesionContext);

  if (!valor) throw new Error('useSesion() tiene que usarse dentro del componente <ProveedorSesion>');

  return valor;
}
