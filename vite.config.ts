/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:22:33
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import { viteMockServe } from 'vite-plugin-mock';
import Banner from 'vite-plugin-banner'
import svgr from 'vite-plugin-svgr'
import { getAliases } from "vite-aliases";
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

const aliases = getAliases();
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Banner(` ===== = = = = = = = == = == ===`),
    reactRefresh(),
    tsconfigPaths(),
    svgr(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => {
            return `antd/lib/${name}/style/index.css`;
          },
        }
      ],
    }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
      logger: true,
    }),
  ],
  css: {
    modules: {
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式 打开后ant报错
        // modifyVars: themeVariables
      }
    }
  },
  server: {
    port: 6060,
    proxy: {
      '/apiss': {
        target: 'http://127.0.0.1:6060/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    // alias: aliases,
    alias: [
      {
        // /@/xxxx  =>  src/xxx
        find: /^~/,
        replacement: path.resolve('node_modules') + '/',
      },
      {
        // /@/xxxx  =>  src/xxx
        find: /@\//,
        replacement: path.resolve('src') + '/',
      },
    ]
  },
  optimizeDeps: {
    include: [
      '@ant-design/colors',
      '@ant-design/icons',
      "@ant-design/pro-table"
    ],
  },
})
