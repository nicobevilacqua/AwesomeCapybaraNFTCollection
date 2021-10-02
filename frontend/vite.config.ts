import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const isProd = process.env.NODE_ENV === 'production';

let contractConfigPath = path.resolve(__dirname, 'configs', 'localhost.json');
if (isProd) {
  contractConfigPath = path.resolve(__dirname, 'configs', 'rinkeby.json');
}

let base = '/';
if (isProd) {
  base = '/AwesomeCapybaraNFTCollection/';
}

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@types': path.resolve(__dirname, './src/types'),
      '@contract': contractConfigPath,
    },
  },
});
