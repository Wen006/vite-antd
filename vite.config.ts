/*
 * @Author: Jackstraw
 * @Date: 2021-05-29 18:22:33
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import {ConfigEnv, defineConfig, UserConfigExport} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import { viteMockServe } from 'vite-plugin-mock';
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

 
// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    mode: 'development',
    plugins: [ 
      viteMockServe({
        localEnabled: command === 'serve',
        mockPath: 'mock',
        logger: true,
        supportTs: true,
        ignore: /.data./
        // ignore: (finame:string)=>{
        //   return finame.indexOf(".data") < 0;
        // }
      }),
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
    
    ],
    css: {
      modules:{
        scopeBehaviour: 'local',
        localsConvention: 'camelCaseOnly'
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
      host: '0.0.0.0',
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
  };
}; 