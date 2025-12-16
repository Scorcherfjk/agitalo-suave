// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://agitalosuave.com",
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["res.cloudinary.com"],
  },
  integrations: [mdx(), sitemap(), icon()],
  adapter: netlify(),
});
