// server/routes/sitemap.xml.ts

export default defineEventHandler(event => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  const { origin } = getRequestURL(event);
  const routes = ['/', '/categories', '/favorites'];
  const body = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  for (const r of routes) body.push(`  <url><loc>${origin}${r}</loc></url>`);
  body.push('</urlset>');
  return body.join('\n');
});
