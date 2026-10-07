// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Em CI (GitHub Pages) o workflow injeta SITE_URL e BASE_PATH a partir da
// própria configuração do Pages. Localmente e na Hostinger valem os padrões.
const site = process.env.SITE_URL || 'https://devzicaro.github.io';
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
