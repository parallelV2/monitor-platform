import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import configArcoStyleImportPlugin from './plugin/arcoStyleImport';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      vueJsx(),
      svgLoader({ svgoConfig: {} }),
      configArcoStyleImportPlugin(),
    ],
    server: {
      proxy: {
        '/api': `${env.VITE_API_PROXY}`,
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, '../src'),
        },
        {
          find: 'assets',
          replacement: resolve(__dirname, '../src/assets'),
        },
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
        },
        {
          find: 'vue',
          replacement: 'vue/dist/vue.esm-bundler.js', // compile template
        },
      ],
      extensions: ['.ts', '.js'],
    },
    define: {
      'process.env': {},
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve(
              'src/assets/style/breakpoint.less'
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  };
});
