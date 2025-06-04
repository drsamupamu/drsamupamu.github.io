Hecho en Código
===============

Este repositorio contiene el código fuente del sitio web de "Hecho en Código". Es un portafolio y página de servicios para mostrar proyectos de desarrollo de software.

El diseño parte de la plantilla "Shape" de FreeHTML5.co e incluye librerías de código abierto como Bootstrap y jQuery.

Estructura de carpetas
----------------------
- `index.html`, `about.html`, `contact.html`, etc.: páginas principales del sitio.
- `css/`: estilos compilados desde Sass.
- `sass/`: archivos `.scss` para personalizar el diseño.
- `js/`: scripts de interfaz y componentes.
- `images/` y `fonts/`: recursos estáticos utilizados en las páginas.

Construcción y modificación
---------------------------
1. Instale [Sass](https://sass-lang.com/install) para compilar los archivos `.scss`.
2. Edite los archivos dentro de `sass/` y ejecute:

   ```bash
   sass sass/style.scss css/style.css
   ```

   También puede usar `sass --watch sass:css` para recompilar automáticamente al modificar los archivos.

Servidor local
--------------
Para probar el sitio localmente ejecute en la raíz del proyecto:

```bash
python -m http.server
```

Luego abra `http://localhost:8000/index.html` en su navegador.

Licencia
--------
El contenido propio de este repositorio se publica bajo la licencia MIT. Los recursos de terceros incluidos en las carpetas `css/` y `js/` conservan sus licencias originales (MIT, BSD u otras según corresponda). Consulte los encabezados de cada archivo para más detalles.
