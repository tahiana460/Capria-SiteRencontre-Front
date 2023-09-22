import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // middleware: false,
  experimental:{
    redirects:true
  },
  output:'server',
  experimental: {
    redirects: true
  },
  redirects: {
    '/': '/landing'
  }
});