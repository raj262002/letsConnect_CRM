import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // Add a resolver for Element Plus
        (name) => {
          if (name.startsWith('El')) {
            return { name, from: 'element-plus' }
          }
        }
      ],
    }),
    AutoImport({
      imports: ['vue', 'vue-router'], // Auto-import from vue, vue-router
      dts: './src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // This will create the '@' alias for the 'src' folder
    },
  },
})
