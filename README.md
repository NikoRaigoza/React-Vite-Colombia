# Explora Colombia

Aplicación web de una sola vista que permite seleccionar un departamento de Colombia y consultar su información detallada (datos clave, ciudades e imagen representativa) a partir de la API pública [API Colombia](https://api-colombia.com).

## Instalación y ejecución local

Requisitos: Node.js 18 o superior y npm.

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd <nombre-del-proyecto>

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Decisiones técnicas

### Vista única con modal en lugar de navegación

Toda la interacción ocurre en una sola página. Al elegir un departamento se muestra una tarjeta resumen y el detalle completo se abre en un **modal**, de modo que el usuario no pierde el contexto del selector ni necesita un sistema de rutas.

### Separación en dos componentes

- `DepartmentSelector` se encarga de cargar la lista, manejar la selección y mostrar el resumen.
- `DepartmentModal` recibe el `departmentId` por props y es responsable de cargar y presentar el detalle.

Así cada componente tiene una sola responsabilidad y el modal solo consulta la API cuando realmente se abre.

### Carga de datos con `useEffect` y `fetch`

Se usa la API nativa `fetch` sin librerías adicionales. La lista de departamentos se pide una sola vez al montar el selector (`useEffect` con dependencias vacías) y el detalle se vuelve a pedir cada vez que cambia el `departmentId`.

### Peticiones en paralelo con `Promise.all`

El modal necesita el detalle, las ciudades y las atracciones. En lugar de encadenar las peticiones, se lanzan en paralelo con `Promise.all`, lo que reduce el tiempo de carga.

### Modal renderizado con `createPortal`

La tarjeta usa efectos visuales que crean un nuevo contexto de posicionamiento, lo que impediría que un elemento `position: fixed` cubra toda la pantalla. Por eso el modal se renderiza directamente en `document.body` mediante `createPortal`.

### Cierre del modal

El modal se cierra con el botón ✕ o haciendo clic en el fondo oscuro. Se usa `stopPropagation` en el contenido para que los clics dentro de la tarjeta no lo cierren.

### Estilos con Tailwind CSS

Se eligió Tailwind para mantener los estilos junto al marcado sin archivos CSS por componente. La paleta usa los colores de la bandera (amarillo para acciones y foco, azul para títulos) y el diseño es responsive mediante clases como `sm:grid-cols-3`.

## Capturas de funcionamiento

> Guardar las imágenes en la carpeta `docs/screenshots/` con los nombres indicados.

### 1. Vista inicial

![Vista inicial](./Parcial%202%20Frontend/public/docs/Screenshot%202026-11-05%20at%202.12.07 PM.png)

### 2. Departamento seleccionado

![Departamento seleccionado](./Parcial%202%20Frontend/public/docs/Screenshot%202026-11-05%20at%202.12.37 PM.png)

### 3. Modal con el detalle completo

![Detalle del departamento](./Parcial%202%20Frontend/public/docs/Screenshot%202026-11-05%20at%202.12.56 PM.png)

### 4. Lista de ciudades

![Lista de ciudades](./Parcial%202%20Frontend/public/docs/Screenshot%202026-11-05%20at%202.13.18 PM.png)

## Créditos

Datos proporcionados por [API Colombia](https://github.com/Mteheran/api-colombia), proyecto open source.
