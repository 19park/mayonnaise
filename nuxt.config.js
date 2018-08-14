const { resolve } = require("path");
const iweee = require("./iweee.config.json");

module.exports = {
  mode: "spa",
  head: {
    titleTemplate: `mayonnaise ${iweee.year}`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "pragma", content: "no-cache" },
      { "http-equiv": "cache-control", content: "no-cache" },
      { "http-equiv": "expires", content: "0" },
      {
        hid: "description",
        name: "description",
        content: "Mayonnaise Official WebSite"
      },
      { hid: "og:type", name: "og:type", content: "website" },
      { hid: "og:title", name: "og:title", content: "mayonnaise" },
      {
        hid: "og:description",
        name: "og:description",
        content: "Mayonnaise Official WebSite"
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://mayonnaise.ml/meta-image.png"
      },
      { hid: "og:url", name: "og:url", content: "https://mayonnaise.ml" },
      { name: "theme-color", content: "#888" }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "favicon-16x16.png"
      },
      { rel: "manifest", href: "manifest.json" },
      {
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        rel: "stylesheet"
      },
      {
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400",
        rel: "stylesheet"
      }
    ]
  },
  css: [
    { src: "material-design-lite/src/material-design-lite.scss", lang: "scss" },
    { src: "typicons.font/src/font/typicons.css" }
  ],
  plugins: ["~/plugins/global-mixins.js", "~/plugins/global-components.js"],
  loading: { color: "#3B8070" },
  build: {
    extend(config, ctx) {
      const proxy = {
        proxy: { "/api": "http://sempre9mai.cafe24.com/2018/api/mayonnaise" }
      };
      config.devServer = Object.create({}, config.devServer, proxy);
      /*
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      */
    },
    vendor: [
      "material-design-lite/material.min.js",
      "vue-loading-overlay",
      "vue-images-loaded",
      "vue-stack-grid"
    ]
  },
  generate: {
    dir: resolve(__dirname, "./dist" + iweee.serverPath)
  },
  router: {
    base: process.env.NODE_ENV === "dev" ? "/" : iweee.serverPath
  }
};
