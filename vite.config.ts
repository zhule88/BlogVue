import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
/* import { oml2d } from 'vite-plugin-oh-my-live2d'; */
import path from 'path'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(),
      ],
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: 'src/types/lib/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/types/lib/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',

      /**
       * custom insert position
       * @default: body-last
       */
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  /*   oml2d({
      dockedPosition: "right",
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
    }) */
  ],
  /* 屏蔽没用的sass警告 */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/common.scss" as *;',
        silenceDeprecations: ['legacy-js-api'],
        javascriptEnabled: true
      }
    }
  },
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
      {
      find: '@a',
      replacement: resolve(__dirname,'./src/assets')
      }
  ]
  }
})
