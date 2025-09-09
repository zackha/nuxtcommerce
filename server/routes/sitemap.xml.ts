import { getRequestURL, setHeader } from 'h3';

export default defineCachedEventHandler(event => {
  setHeader(event, 'Content-Type', 'application/xml');
  const url = getRequestURL(event);
  const base = url.origin;
  const routes = ['/', '/categories', '/favorites'];

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map(route => `  <url><loc>${base}${route}</loc></url>`).join('\n') +
    `\n</urlset>`
  );
}, {
  maxAge: 60 * 60,
  name: 'sitemap',
  getKey: () => 'sitemap',
});

