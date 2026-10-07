// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

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
  // O pacote `sharp` não é dependência direta (o pnpm não o expõe ao Astro),
  // então as imagens são publicadas como estão, sem otimização no build.
  image: { service: passthroughImageService() },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
