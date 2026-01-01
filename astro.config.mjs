// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import vercel from "@astrojs/vercel";
import decapCmsOauth from "astro-decap-cms-oauth";

// https://astro.build/config
export default defineConfig({
   output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), decapCmsOauth()],
  decapCmsOauth(),

  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      fallbacks: ["Inter", "sans-serif"],
    }]
  },

  adapter: vercel()
});
