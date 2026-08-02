// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Agítalo Suave';
export const SITE_DESCRIPTION = 'Explorando el mundo de los cócteles, a mi ritmo';
export const PAGE_SIZE = 12;

export const SOCIAL_LINKS = [
  {
    url: 'https://www.facebook.com/agitalosuave',
    label: 'Facebook',
    icon: 'facebook',
  },
  {
    url: 'https://www.instagram.com/agitalosuave',
    label: 'Instagram',
    icon: 'instagram',
  },
  {
    url: 'https://www.tiktok.com/@agitalosuave',
    label: 'TikTok',
    icon: 'tiktok',
  },
] as const;

export const CATEGORY_LINKS = {
  recetas: { label: 'Recetas', url: '/recetas' },
  bitacora: { label: 'Bitácora', url: '/bitacora' },
  tecnicas: { label: 'Técnica', url: '/tecnica' },
  tips: { label: 'Tips', url: '/tips' },
} as const;

export const FOOTER_LINKS = [
  {
    title: 'Blog',
    children: Object.values(CATEGORY_LINKS),
  },
  {
    title: 'Acerca de',
    children: [
      { url: '/acerca', label: 'Agítalo Suave' },
      { url: '/legal/sobre-mi', label: 'Sobre mi' },
      { url: '/contacto', label: 'Contacto' },
    ],
  },
  {
    title: 'Legal',
    children: [
      {
        url: '/legal/politica-de-privacidad',
        label: 'Política de Privacidad',
      },
      {
        url: '/legal/terminos-y-condiciones',
        label: 'Términos y Condiciones',
      },
      {
        url: '/legal/exencion-de-responsabilidad',
        label: 'Exención de Responsabilidad',
      },
    ],
  },
] as const;
