import { getRequestURL, setHeader } from 'h3';

export default defineEventHandler(event => {
  setHeader(event, 'Content-Type', 'text/plain');
  const url = getRequestURL(event);
  return `User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml`;
});

