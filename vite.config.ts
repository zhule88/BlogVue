import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { oml2d } from 'vite-plugin-oh-my-live2d';
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    oml2d({
      models: [
        {
          path: 'https://registry.npmmirror.com/oml2d-models/latest/files/models/Senko_Normals/senko.model3.json',
          position: [-10, 20]
        },
        {
          path: 'https://registry.npmmirror.com/oml2d-models/latest/files/models/Pio/model.json',
          scale: 0.4,
          position: [0, 50],
          stageStyle: {
            height: 300
          }
        }
      ],

      tips: {
        idleTips: {
          wordTheDay: (wordTheDayData) => {
            return wordTheDayData.hitokoto;
          }
        }
      }
    })
  ],
  resolve: {
    alias: [
      {
      find: '@',
      replacement: resolve(__dirname,'./src')
      },
      {
        find: '@v',
        replacement: resolve(__dirname,'./src/views')
        },
  ]
  }
})
