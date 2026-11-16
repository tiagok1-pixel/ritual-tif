# Ritual — sitio mockup (TIF, UADE 2026)

Sitio demostrativo del e-commerce de **Ritual**: kits temáticos de experiencias para hacer en casa.
Es solo front-end: no hay tienda real, ni base de datos, ni pagos. Está hecho con HTML, CSS y JavaScript simples, sin instalar nada.

## Qué hay en cada carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página completa (textos fijos, preguntas frecuentes, footer). |
| `css/styles.css` | Colores, tipografía y diseño. |
| `js/main.js` | **Precios, kits y suscripciones**, más el carrito y los modales. |
| `assets/` | Imágenes (hoy son ilustraciones provisorias) e isotipo/favicon. |

## (a) Cómo publicarlo gratis en Vercel

1. Subí esta carpeta a un repositorio de GitHub (ver más abajo si todavía no lo hiciste).
2. Entrá a [vercel.com](https://vercel.com) y creá una cuenta con **Continue with GitHub**.
3. Tocá **Add New → Project**.
4. Buscá el repositorio de Ritual y tocá **Import**.
5. No cambies ninguna configuración (Vercel detecta solo que es un sitio estático) y tocá **Deploy**.
6. En menos de un minuto te da un link tipo `ritual-xxxx.vercel.app`. Ese es el que mostrás en la defensa.

Cada vez que cambies algo en GitHub, Vercel republica solo.

### Cómo subirlo a GitHub sin saber programar

1. Entrá a [github.com/new](https://github.com/new), poné de nombre `ritual-tif` y creá el repositorio (vacío).
2. En la página del repositorio tocá **uploading an existing file**, arrastrá **todo el contenido** de esta carpeta (`index.html`, `css`, `js`, `assets`, `README.md`) y tocá **Commit changes**.

## (b) Cómo cambiar un precio o un texto

**Todo lo que son precios, kits y suscripciones está al principio de `js/main.js`:**

- **Precios**: líneas 10 y 11 (`PRICE_PP` = compra puntual por persona, `SUB_PP` = suscripción por persona). Los totales de 2 y 3 personas se calculan solos.
- **Nombre, frase, descripción, qué trae y "te quedás con" de cada kit**: bloque `KITS`, desde la línea 25.
- **Nombres y bajadas de los ejes**: bloque `EJES`, línea 16.
- **Suscripciones**: bloque `SUBS`, línea 77.

El resto de los textos (hero, "Cómo funciona", preguntas frecuentes, footer) están en `index.html`: buscá el texto con Ctrl+F (o Cmd+F) y cambialo ahí mismo.

Los colores están en las primeras líneas de `css/styles.css`.

## (c) Cómo reemplazar una imagen

Hoy las cajas son ilustraciones provisorias (`assets/kit-*.svg`) y el fondo del hero es una escena abstracta (`assets/hero.svg`).

1. Guardá tu foto en `assets/` (cuadrada, **800 × 800 px**, formato `.jpg` y de menos de 200 KB, por ejemplo `kit-noche-italiana.jpg`).
2. En `js/main.js` buscá el kit y cambiá la línea `img: 'assets/kit-noche-italiana.svg'` por `img: 'assets/kit-noche-italiana.jpg'`.

**Fotos que faltan:**

| Imagen | Tamaño recomendado | Dónde se cambia |
|---|---|---|
| Foto de cada uno de los 6 kits | 800 × 800 px | `img` de cada kit en `js/main.js` |
| Foto de fondo del hero | 1600 × 900 px | En `index.html`, `src="assets/hero.svg"` dentro de `<img class="hero__bg">` |
| Estante de cafeterías (opcional, hoy es una ilustración) | 1120 × 680 px | Bloque `<svg>` de la sección `#cafeterias` en `index.html` |
| Fotos de "Compartí" (opcional, hoy son 6 recuadros) | 600 × 600 px | Sección `#comparti` en `index.html` |

El favicon es el isotipo: `assets/isotipo.svg`. Es un dibujo simple hecho para el mockup; si tenés el archivo original del isotipo, pisalo con el mismo nombre.

## (d) Pendientes marcados como [CONFIRMAR]

- **Usuario de Instagram**: el texto dice `@ritual.kits [CONFIRMAR usuario]` (sección "Compartí" en `index.html`). Los íconos de Instagram y TikTok del footer no tienen link; cuando existan las cuentas, hay que agregar las URLs en el footer.
- **Fotos reales** de los 6 kits y del hero (ver tabla de arriba).
- **10% off en tu primera compra**: figura en la barra superior pero el carrito del mockup no lo aplica ni muestra cómo se canjea. Definir si se agrega un código o se aplica automático.
- **Costo de envío**: el sitio solo dice que "se calcula aparte en el checkout"; no hay tarifa inventada.

## Qué hace la demo

- Carrito lateral con sumar, quitar y cambiar cantidades (se guarda en el navegador).
- Checkout de un paso con resumen y botón "Pagar con Mercado Pago (demo)", que muestra el aviso de mockup.
- Ningún formulario pide datos personales, de tarjeta ni direcciones.
