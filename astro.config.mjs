import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // middleware: true,
  output:'hybrid',
  experimental:{
    redirects:true
  },
  redirects: {
    '/': '/landing'
  }
});