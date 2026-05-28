# SBI — English Learning Platform

Proyecto web de apoyo para un trabajo de inglés de bachillerato. Lo desarrollé antes de empezar la carrera para ayudar a unas compañeras del instituto que necesitaban una plataforma donde alojar sus ejercicios de inglés de forma ordenada y accesible.

La idea era sencilla: que cualquier alumno pudiera entrar, practicar gramática, vocabulario, comprensión lectora, escritura y listening, y ver las correcciones con explicaciones claras. Sin aplicaciones externas, sin registro, sin complicaciones — solo HTML, CSS y un poco de JavaScript.

---

## Contexto

Las compañeras tenían el contenido (ejercicios, textos, audios, correcciones) pero no una forma de presentarlo de manera atractiva y navegable. Yo me encargué de la parte técnica: diseñar y montar la web, estructurar las páginas, maquetar los ejercicios y subir todo a GitHub para que fuera accesible desde cualquier dispositivo.

---

## Páginas

| Archivo | Qué contiene |
|---|---|
| `index.html` | Página principal — presentación, estadísticas, resumen de secciones, equipo |
| `Information.html` | Explicación detallada de cómo funciona cada tipo de ejercicio |
| `exercises.html` | Hub de navegación hacia todas las categorías |
| `grammar.html` / `grammar1.html` / `grammar2.html` | Ejercicios de gramática (tiempos verbales, preposiciones, estructura) |
| `vocabulary.html` / `vocab1.html` / `vocab2.html` | Actividades de vocabulario (sinónimos, antónimos, uso en contexto) |
| `reading.html` / `reading1.html` / `reading2.html` | Textos con preguntas de comprensión |
| `writing.html` / `writing1.html` / `writing2.html` | Ejercicios de escritura guiada |
| `listening.html` / `listening1.html` / `listening2.html` | Audio con preguntas de comprensión |
| `spreadsheets.html` | Hojas de seguimiento del progreso |
| `contact.html` | Datos de contacto del equipo |

---

## Estructura del proyecto

```
proyecto-personal/
├── index.html
├── Information.html
├── exercises.html
├── grammar.html / grammar1.html / grammar2.html
├── vocabulary.html / vocab1.html / vocab2.html
├── reading.html / reading1.html / reading2.html
├── writing.html / writing1.html / writing2.html
├── listening.html / listening1.html / listening2.html
├── spreadsheets.html
├── contact.html
│
├── style.css            ← toda la maquetación y estilos
├── interactions.js      ← efectos visuales e interacciones
│
├── images/
│   ├── bg.jpg           ← fondo del header principal
│   ├── bg2.jpg / bg2.png← fondo sección servicios (parallax)
│   ├── coffe-1.jpg      ← foto sección "about"
│   ├── coffee-2.jpg     ← foto sección testimonios
│   ├── c1.png / c2.png / c3.png  ← iconos de las tarjetas de ejercicios
│   ├── i1.svg / i2.svg / i3.svg  ← iconos de la sección servicios
│   ├── blog1.jpg / blog2.jpg / blog3.jpg ← fotos del equipo
│   ├── menu.png         ← icono hamburguesa (menú móvil)
│   └── *.png            ← imágenes de apoyo para ejercicios
│
└── audio/
    ├── A1.mp3           ← audio ejercicio listening 1
    ├── A2.mp3           ← audio ejercicio listening 2
    └── A3.mp3           ← audio ejercicio listening 3
```

---

## Cómo está hecho

### HTML

Cada página es un archivo `.html` independiente. Todas comparten la misma cabecera de navegación y el mismo footer, escritos a mano en cada archivo (sin sistema de plantillas ni framework).

La estructura de cada página sigue el mismo patrón:

```html
<div id="progress-bar"></div>
<button id="back-to-top">↑</button>

<header class="header">          <!-- hero con imagen de fondo -->
    <nav class="menu">...</nav>
    <div class="header-content">...</div>
</header>

<section class="coffee reveal">  <!-- tarjetas de contenido -->
<main class="Servicios reveal">  <!-- sección oscura con parallax -->
<section class="general reveal"> <!-- layout mitad texto / mitad foto -->
<section class="blog reveal">    <!-- equipo o entradas -->
<footer class="footer">...</footer>

<script src="interactions.js"></script>
```

La clase `reveal` en cada sección activa las animaciones de scroll cuando JavaScript está disponible (progressive enhancement — sin JS la página es completamente legible).

### CSS (`style.css`)

Archivo único que cubre todo: reset, tipografía, layout, componentes y responsive design.

**Tipografía:** [Poppins](https://fonts.google.com/specimen/Poppins) de Google Fonts, cargada con `display=swap` para evitar texto invisible durante la carga.

**Paleta de color:**

| Uso | Color |
|---|---|
| Acento principal | `rgb(201, 97, 5)` — naranja tostado |
| Acento dorado (logo, títulos hero) | `rgb(184, 166, 110)` |
| Fondo secciones claras | `blanchedalmond` / `azure` / `#fff8f0` |
| Fondo secciones oscuras | overlay negro sobre imagen |
| Texto general | `#323232` |

**Secciones clave del CSS:**

- `.header` — imagen de fondo `bg.jpg` con overlay oscuro semi-transparente
- `.coffee` — fondo claro con tarjetas en flex row
- `.Servicios` — imagen `bg2.jpg` con `background-attachment: fixed` (efecto parallax en escritorio)
- `.general` — layout 50/50 flex entre texto y foto
- `.blog` — tarjetas de equipo en flex row
- `.footer` — fondo `#323232` con columnas de enlaces

**Responsive:** media query a `991px` que colapsa el menú a hamburguesa (checkbox hack puro CSS, sin JS), convierte todos los layouts flex a columna y oculta las fotos decorativas en las secciones `.general`.

### JavaScript (`interactions.js`)

Todas las interacciones están en un único archivo, organizadas en bloques numerados dentro de `DOMContentLoaded`:

| Bloque | Efecto |
|---|---|
| 1 | **Cursor glow** — círculo de luz naranja que sigue el cursor con interpolación suave (lerp) |
| 2 | **Parallax del hero** — el fondo de `.header` se desplaza levemente según la posición del ratón |
| 3 | **Tilt 3D en tarjetas** — `perspective(600px) rotateX rotateY` al mover el ratón sobre `.coffee-1` y `.blog-1` |
| 4 | **Barra de progreso de scroll** — línea de 3px fija en el top, anchura proporcional al scroll actual |
| 5 | **Botón back-to-top** — aparece al bajar 400px, hace scroll suave al inicio |
| 6 | **Scroll reveal** — `IntersectionObserver` añade `.visible` a cada `.reveal` al entrar en el viewport, con stagger para las tarjetas internas |
| 7 | **Ripple en botones** — al clicar `.btn-1` se crea un `<span class="ripple">` en la posición del click y se elimina al terminar la animación |
| 8 | **Contadores animados** — los `.stat-number` cuentan desde 0 hasta su `data-target` con una curva suave cuando entran en pantalla |
| 9 | **Nav activo** — compara la URL actual con el `href` de cada enlace y añade `.nav-active` al que coincide |

### Imágenes

Las imágenes se obtuvieron de fuentes de uso libre y se optimizaron manualmente antes de subirlas. Los formatos usados son `.jpg` para fotos (menor peso), `.png` para elementos con transparencia y `.svg` para iconos (escalables sin pérdida de calidad).

Se referencian directamente desde HTML y CSS con rutas relativas (`images/nombre.jpg`) para que funcionen tanto en local como desplegadas en GitHub Pages sin ningún cambio.

### Audio

Los tres archivos `.mp3` de la carpeta `audio/` se enlazan desde las páginas de listening con el elemento nativo `<audio controls>`. No se usa ninguna librería externa — el navegador gestiona la reproducción directamente.

### Subida a GitHub

El proyecto se aloja en este repositorio de GitHub y se puede servir como web estática desde **GitHub Pages**:

1. Ir a **Settings → Pages** en este repositorio
2. Seleccionar *Source: Deploy from a branch* → `main` / `(root)`
3. Guardar — en 1-2 minutos estará en `https://danix29.github.io/proyecto-personal/`

Para actualizarlo basta con hacer push a `main`:

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

---

## Equipo del proyecto

| Nombre | Rol |
|---|---|
| **Blanca** | Ejercicios de reading — selección de textos y preguntas de comprensión |
| **Sofía** | Sección de gramática — reglas, niveles y correcciones |
| **Inés** | Vocabulario y writing — actividades y guías de escritura |

Contacto: [sofia.melero@humanitastorrejon.onmicrosoft.com](mailto:sofia.melero@humanitastorrejon.onmicrosoft.com)
