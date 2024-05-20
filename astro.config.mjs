import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import playformInline from '@playform/inline';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://morrone.dev',
  integrations: [
    icon(),
    tailwind(),
    mdx(),
    sitemap(),
    playformInline(),
    playformCompress(),
  ],
});
