# AVLA - Landing Page

Landing page para **AVLA** (Academia Virtual de Lenguas Aplicadas), una escuela de idiomas que ofrece clases de italiano, español y servicios de traducción.

## Estructura del Proyecto

```
avla-landing/
├── index.html              # Página principal
├── css/
│   ├── variables.css       # Variables CSS (colores, tipografías, espaciado)
│   ├── styles.css          # Estilos principales
│   └── animations.css      # Animaciones y efectos
├── js/
│   ├── main.js             # Lógica principal (navegación, slider)
│   ├── animations.js       # Animaciones de scroll (Intersection Observer)
│   └── form.js             # Validación de formulario
├── assets/
│   └── images/             # Imágenes del sitio
└── README.md
```

## Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas (Custom Properties)
- JavaScript vanilla (ES6+)
- Google Fonts (DM Serif Display, Poppins, Lato)
- Intersection Observer API para animaciones
- Integración con Calendly

## Características

- Diseño responsive (mobile-first)
- Animaciones de scroll reveal
- Navegación sticky con cambio de estado
- Carrusel de testimonios con swipe touch
- Formulario de contacto con validación
- Integración lista para Calendly
- SEO optimizado con meta tags
- Accesibilidad (ARIA, focus states, reduced motion)

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Isabelline | `#F0EEE9` | Fondo principal |
| Alice Blue | `#D3DDE7` | Fondo secundario |
| Pear | `#D5DB46` | Acento vibrante |
| Thistle | `#C9B3D8` | Acento suave |
| Marian Blue | `#273582` | Azul institucional |
| Space Cadet | `#222248` | Texto principal |

## Instalación Local

1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador

Para desarrollo con live reload:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000
```

## Configuración de Calendly

1. Crear cuenta en [Calendly](https://calendly.com)
2. Configurar un evento (ej: "Clase de prueba - 30 min")
3. Reemplazar la URL en el widget:

```html
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/TU_USUARIO/TU_EVENTO">
</div>
```

## Despliegue en Vercel

### Opción 1: Desde GitHub

1. Sube el proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu cuenta de GitHub
4. Importa el repositorio
5. Deploy automático

### Opción 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
cd avla-landing
vercel

# Seguir las instrucciones
```

## Formulario de Contacto

El formulario está preparado para integrarse con:

### Formspree

```html
<form action="https://formspree.io/f/TU_ID" method="POST">
```

### Netlify Forms

```html
<form data-netlify="true" name="contact">
```

## Personalización

### Cambiar colores

Edita `css/variables.css`:

```css
:root {
    --color-primary: #273582;
    --color-background: #F0EEE9;
    /* ... */
}
```

### Cambiar tipografías

1. Actualiza el link de Google Fonts en `index.html`
2. Modifica las variables en `css/variables.css`

### Agregar más testimonios

En `index.html`, duplica la estructura `.testimonio-card` y actualiza los controles del slider en `js/main.js`.

## Optimización de Imágenes

Para mejor rendimiento, convierte las imágenes a WebP:

```bash
# Con ImageMagick
convert imagen.png -quality 85 imagen.webp

# Con cwebp
cwebp -q 85 imagen.png -o imagen.webp
```

## Licencia

© 2026 AVLA - Academia Virtual de Lenguas Aplicadas. Todos los derechos reservados.

---

Desarrollado con el Manual de Identidad Visual de AVLA.
