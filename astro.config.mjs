// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.kinder-jugendpsychiater.org',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(impressum|datenschutzerklaerung|404)$/.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
