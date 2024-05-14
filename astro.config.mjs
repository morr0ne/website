import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import playformInline from '@playform/inline';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.morrone.dev',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    playformInline(),
    playformCompress(),
  ],
});
