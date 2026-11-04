import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { ProveedorSesion } from './sesion/SesionContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* el proveedor envuelve la app para que todos los componentes puedan leer la sesion */}
      <ProveedorSesion>
        <App />
      </ProveedorSesion>
    </BrowserRouter>
  </React.StrictMode>
);