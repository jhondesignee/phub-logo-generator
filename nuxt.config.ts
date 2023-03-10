export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.css",
    "@mdi/font/css/materialdesignicons.min.css"
  ],
  build: {
    transpile: ["vuetify"]
  },
  app: {
    head: {
      title: "PHub logo Generator ¦ Jhon Designee"
    }
  },
  ignore: [
    ".git"
  ],
  typescript: {
    typeCheck: true
  }
})
