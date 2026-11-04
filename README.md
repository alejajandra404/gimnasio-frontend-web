# Práctica 15 – El gimnasio: rutas y layout

## Ejercicio 1: el router y el catálogo

### ¿Por qué el 404 sí tiene encabezado y pie?

Porque la ruta del 404 está metida dentro de la ruta del layout, igual que las demás páginas. El layout es el que tiene el encabezado, el pie y el hueco donde se pinta cada página, así que cualquier página que esté dentro de él los trae, también el 404. Lo comprobé entrando a una dirección inventada (`/no-existe`) y salen el encabezado arriba y el pie abajo.

![404](evidencias/practica-15/03-404.png)

### ¿Qué cambia en la pestaña Red si usas `<a href>` en lugar de `Link`?

Con `Link`, al hacer clic en una tarjeta solo aparecieron 2 filas en la pestaña Red, y ninguna era de tipo `document`. Eso quiere decir que la página no se recargó: solo cambió la dirección y pidió los datos de la clase.

Con `<a href>` salieron 32 filas, y la primera sí era de tipo `document`. Eso quiere decir que el navegador volvió a pedir la página completa y todos sus archivos, o sea que se recargó todo.

Con `Link`:

![Red con Link](evidencias/practica-15/04-red-link.png)

Con `<a href>`:

![Red con a href](evidencias/practica-15/05-red-a-href.png)

## Ejercicio 2: el detalle de una clase

### ¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?

Llega como texto (`string`), y hasta puede ser `undefined` si no viene en la dirección. El hook `useClase` pide un número, así que si no lo convierto con `Number(id)` el editor marca un error rojo diciendo que un `string | undefined` no se puede usar donde va un `number`. Lo probé quitando el `Number` y el error salió. En el navegador `/clases/1` sí cargó igual, pero aun así el error de TypeScript se queda.

### ¿Qué pasa al ir de `/clases/1` a `/clases/2` si el id no está en las dependencias del efecto?

Esto no lo pude probar en el navegador, pero supongo que cuando el `id` no está en las dependencias, solo corre la primera vez que se muestra la página. Si cambio de `/clases/1` a `/clases/2` sin salir de esa página, React reutiliza la misma página y el efecto no vuelve a correr, así que la URL diría `/clases/2` pero seguiría mostrando la clase 1. Por eso el `id` va en las dependencias.

---

# Práctica 16 – El gimnasio: sesión con contexto y JWT

## Ejercicio 1: el contexto de sesión

### ¿Por qué se usa un contexto y no props para la sesión?

Porque la sesión la necesitan varios componentes, por ejemplo el encabezado (para el nombre y el botón Salir) y las páginas de entrar y de registro. Con props tendría que pasar el usuario de componente en componente, aunque los del medio no lo usen. Con el contexto se guarda en un solo lugar y cada componente que lo necesite lo lee directo con `useSesion()`. 

### ¿Qué pasa si un componente usa la sesión fuera del proveedor?

Lo probé quitando temporalmente el `ProveedorSesion` de `main.tsx`. La página se quedó en blanco, solo con el fondo, y en la consola salió un error en rojo: «Uncaught Error: useSesion() tiene que usarse dentro del componente <ProveedorSesion>», diciendo que venía del `Encabezado`. O sea que el hook avisa con un error cuando no hay proveedor, y como nadie lo atrapa, se cae toda la página.

![Error fuera del proveedor](evidencias/practica-16/11-fuera-del-proveedor.png)

Capturas de este ejercicio: el encabezado con la sesión iniciada (con el nombre y el botón Salir):

![Encabezado con sesión](evidencias/practica-16/07-encabezado-sesion.png)

## Ejercicio 2: entrar y mandar el token

### ¿Dónde se guarda el token y qué riesgo tiene ese lugar?

Se guarda en el `localStorage` del navegador, junto con los datos del usuario. Lo comprobé en modo dveloper, en la pestaña application, y ahí aparecen las llaves `token` y `usuario`. El riesgo es que cualquier código de JavaScript que corra en la página puede leerlo, así que si alguien logra meter un script malicioso, podría robar el token y usarlo. 

### Comprobar en la pestaña Red que las peticiones llevan el encabezado Authorization y leer el token en jwt.io

Después de entrar con `karla@itson.mx`, la petición `GET http://localhost:3000/clases` sale con el encabezado `Authorization: Bearer ...` seguido del token.

![Authorization en Red](evidencias/practica-16/08-red-authorization.png)

Copié ese token en jwt.io. El encabezado dice que usa el algoritmo HS256 y que es de tipo JWT. El payload trae `sub` (1), `correo` (karla@itson.mx), `rol` (miembro), `miembroId` (1), `iat` y `exp`. La diferencia entre `exp` e `iat` es de 3600 segundos, o sea que el token dura una hora.

![Token en jwt.io](evidencias/practica-16/09-jwt-io.png)

Otras capturas de este ejercicio: el error cuando las credenciales son incorrectas y la cuenta nueva creada con el registro.

![Error de credenciales](evidencias/practica-16/06-error-credenciales.png)

![Cuenta nueva con el registro](evidencias/practica-16/10-registro-cuenta-nueva.png)
