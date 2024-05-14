import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import playformCompress from "@playform/compress";

import playformInline from "@playform/inline";

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.morrone.dev',
	integrations: [mdx(), sitemap(), playformInline(), playformCompress(),]
});