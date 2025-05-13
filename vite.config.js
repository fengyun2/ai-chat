import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/lib.jsx', // 我们将创建这个入口文件
      name: 'AiChat', // 全局变量名称
      fileName: (format) => `ai-chat.${format}.js`
    },
    rollupOptions: {
      // 不外部化任何依赖，全部打包进来
      external: [],
      output: {
        // 在UMD构建模式下为这些外部化的依赖提供一个全局变量
        globals: {}
      }
    }
  },
  define: {
    'process.env': JSON.stringify({}),
    'process.env.NODE_ENV': JSON.stringify('production'),
    // 添加这一行，确保 process 被定义为一个对象
    'process': JSON.stringify({
      env: {
        NODE_ENV: 'production'
      }
    })
  }
})
