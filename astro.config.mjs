import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import netlify from "@astrojs/netlify/functions";
import solidJs from "@astrojs/solid-js";
const prettyCodeOptions = {
  theme: "solarized-dark",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {},
};

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), solidJs()],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
  output: "server",
  adapter: netlify(),
});
