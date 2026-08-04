# 🍹 Agítalo Suave

> Blog y web de coctelería y mixología. Sitio estático (Astro) que se sirve 100% del CMS **Strapi** (`agitalo-suave-cms`): no hay contenido local, todo el blog y las páginas legales vienen de la API.

## ✨ Características

- **Contenido desde el CMS** — los loaders de `astro:content` (`src/lib/cms/`) traen blog y legales desde Strapi en cada build.
- **Categorías de contenido** — recetas, bitácora, técnicas y tips, con su propio listado paginado (`/blog/recetas`, `/bitacora`, `/tecnica`, `/tips`).
- **Imágenes en la nube** — la media la sirve Cloudinary en formato **AVIF**, vía la Media Library del CMS.
- **SEO completo** — canonical URLs, OpenGraph, JSON-LD (recetas con `Recipe` schema), sitemap y feed **RSS** (`/rss.xml`).
- **Alto rendimiento** — estático, optimización de imágenes y 100/100 Lighthouse.
- **Diseño con Tailwind CSS 4** y set de iconos (`astro-icon`).

## 🧱 Stack

| Capa | Tecnología |
| --- | --- |
| Framework | [Astro](https://astro.build) 7 (content layer) |
| Estilos | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Contenido | Strapi 5 vía loaders + schemas (`zod`) |
| Imágenes | Cloudinary (AVIF) |
| Deploy | Netlify (adapter `@astrojs/netlify`) |

## 📁 Estructura

```text
src/
├── components/      # Componentes Astro (cards, layouts parciales, íconos)
├── content.config.ts# Definición de colecciones + schemas de blog/legal
├── icons/           # Iconos SVG
├── layouts/         # Layouts de página (base, blog, legal…)
├── lib/cms/         # Loaders de Strapi
│   ├── constants.ts # URLs, tamaños de página, categorías
│   ├── types.ts     # Tipos de la API y del loader
│   ├── client.ts    # Cliente HTTP (fetch paginado, media)
│   ├── mappers.ts   # Strapi → entrada del content layer
│   ├── loader.ts    # Factory del loader + loaders públicos
│   └── index.ts     # Punto de entrada público
├── pages/           # Rutas (index, blog, categorías, legal, rss…)
├── schemas/         # Schemas zod (blog, legal)
├── utils/           # SEO, fechas, reading time (+ tests)
└── assets/          # Recursos estáticos
```

## ⚙️ Configuración

1. Instalar dependencias:

   ```sh
   pnpm install
   ```

2. Copiar `.env.example` a `.env`:

   ```sh
   cp .env.example .env
   ```

   | Variable | Descripción |
   | --- | --- |
   | `CMS_URL` | URL base de la API del CMS. Local: `http://localhost:1337` · Producción: `https://cms.agitalosuave.com` |

3. El CMS debe estar corriendo (o ser accesible) para `astro dev` y `astro build`, ya que el contenido se consume de la API.

## 🚀 Comandos

| Comando | Acción |
| --- | --- |
| `pnpm install` | Instala dependencias |
| `pnpm dev` | Dev server en `http://localhost:4321` |
| `pnpm build` | Build de producción a `dist/` |
| `pnpm preview` | Previsualiza el build localmente |
| `pnpm test` | Ejecuta los tests (Vitest) |

## 📝 Contenido

El contenido se gestiona desde el **admin del CMS** (`agitalo-suave-cms`). Las colecciones se definen en `src/content.config.ts` y se mapean 1:1 con los tipos de Strapi:

- **`blog`** — `title`, `slug`, `type` (`receta` · `bitacora` · `tecnica` · `tip`), `date`, `updated`, `excerpt`, `tags`, `image`/`headerImage`, `ingredients`, `steps`, `draft`, `featured` y `content` (markdown).
- **`legal`** — `title`, `slug`, `description`, `date`, `draft` y `content` (markdown).

> El markdown de `content` lo compila el núcleo de Astro (`renderMarkdown`) dentro del loader; por eso no se necesita ningún archivo local ni la integración MDX.

### Publicar contenido → nuevo build

El CMS dispara un webhook hacia el **build hook de Netlify** al crear/editar/borrar una entrada, así el sitio se regenera automáticamente con los cambios.

## 🌐 Deploy

- **Front** — Netlify (ramas de `main`, `netlify.toml` define `npm run build` y `dist/`).
- **Env de producción** — `CMS_URL=https://cms.agitalosuave.com` en las variables de entorno del build.
- **CMS** — desplegado en Render (`cms.agitalosuave.com`), con datos en Supabase (PostgreSQL) e imágenes en Cloudinary. Ver `agitalo-suave-cms`.

## 🧪 Tests

Suite con [Vitest](https://vitest.dev) en `src/**/__tests__`: SEO, formateo de fechas, reading time y schema de blog.

```sh
pnpm test
```

## 🔗 Repos relacionados

- **`agitalo-suave-cms`** — CMS Strapi que alimenta este sitio (config, Supabase, Cloudinary, deploy en Render).

---

Hecho con 🧉 y coctelera por **Agítalo Suave** — [agitalosuave.com](https://agitalosuave.com)
