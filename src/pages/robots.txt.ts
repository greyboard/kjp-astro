import type { APIRoute } from 'astro';
import { isDemo, site } from '../data/site';

export const GET: APIRoute = () => {
  const body = isDemo
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
