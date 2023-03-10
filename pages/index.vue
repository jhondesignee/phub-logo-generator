<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>PHub logo generator</v-app-bar-title>
      <v-menu right>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in menu" :key="index" @click="openMenuUrl(item.url)">
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-card variant="tonal">
          <v-card-title>Clique para editar</v-card-title>
          <v-card-text>
            <div ref="canva" id="canva">
              <p class="text-h3 font-weight-bold" contenteditable="true">Git</p>
              <p class="text-h3 font-weight-bold" contenteditable="true">hub</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-container class="ma-0 pa-2 pt-0">
              <v-btn color="primary" variant="flat" :loading="loading" @click="generateLogo" block>Download</v-btn>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar">
      Não foi possível fazer o download da imagem
      <template #actions>
        <v-btn color="error" @click="snackbar = false" icon>
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<style lang="scss" scoped>
  #canva {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: black;
    & p {
      padding: 10px;
      border-radius: 10px;
      &:last-child {
        background-color: orange;
        color: black;
      }
    }
  }
</style>
<script lang="ts" setup>
  import { ref } from "vue"
  import * as htmlToImage from "html-to-image"
  
  const loading = ref(false)
  const snackbar = ref(false)
  const canva = ref<unknown>()
  const menu = ref([
    {
      title: "Github",
      icon: "mdi-github",
      url: "https://github.com/jhondesignee"
    },
    {
      title: "WhatsApp",
      icon: "mdi-whatsapp",
      url: "https://wa.me/message/O2NSJ44ZIVUEF1"
    },
    {
      title: "Instagram",
      icon: "mdi-instagram",
      url: "https://instagram.com/guy.named.princess"
    },
    {
      title: "LinkedIn",
      icon: "mdi-linkedin",
      url: "https://linkedin.com/in/jhondesignee"
    },
    {
      title: "Twitter",
      icon: "mdi-twitter",
      url: "https://twitter.com/jhondesignee"
    },
    {
      title: "Facebook",
      icon: "mdi-facebook",
      url: "https://www.facebook.com/profile.php?id=100088240418980"
    }
  ])
  
  useHead({
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/eruda",
        onload: "if (process.client && process.env.NODE_ENV === \"development\") eruda.init()"
      }
    ]
  })
  
  function downloadImage(dataUrl: string, filename: string): void {
    if (process.client) {
      const anchor = document.createElement("a")
      anchor.download = filename
      anchor.href = dataUrl
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    }
  }
  
  async function generateLogo(): Promise<void> {
    if (process.client) {
      loading.value = true
      try {
        if (canva.value instanceof HTMLElement) {
          const canvaContent: HTMLElement = canva.value
          const leftContent: string = canvaContent.querySelector("p:first-child")?.textContent ?? "Git"
          const rightContent: string = canvaContent.querySelector("p:last-child")?.textContent ?? "hub"
          const filename = `${leftContent}_${rightContent}.png`
          const data = await htmlToImage.toPng(canvaContent)
          downloadImage(data, filename)
        } else {
          snackbar.value = true
        }
      } catch(error) {
        snackbar.value = true
        if (error instanceof Error) {
          console.log(error.message)
        }
      }
      loading.value = false
    }
  }
  
  function openMenuUrl(url: string): void {
    if (process.client) {
      window.open(url, "_blank")
    }
  }
</script>