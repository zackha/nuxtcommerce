import { getRequestURL, setHeader } from 'h3';

export default cachedEventHandler(
  event => {
    setHeader(event, 'Content-Type', 'text/plain');
    const url = getRequestURL(event);
    return `User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml`;
  },
  {
    name: 'robots-txt',
    maxAge: 60 * 60,
    getKey: event => event.path,
  },
);

