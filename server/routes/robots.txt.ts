// server/routes/robots.txt.ts
import { getRequestURL, setHeader } from 'h3';

export default defineEventHandler(event => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  const { origin } = getRequestURL(event);
  return `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;
});
