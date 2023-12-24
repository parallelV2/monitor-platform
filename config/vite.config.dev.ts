import {
  mergeConfig,
  defineConfig,
  type ConfigEnv,
  type UserConfigExport,
} from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default defineConfig((configEnv) =>
  mergeConfig((baseConfig as (o: ConfigEnv) => UserConfigExport)(configEnv), {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  })
);
