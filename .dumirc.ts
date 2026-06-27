import { defineConfig } from 'dumi';
import path from 'path';

const basePath = process.env.GH_PAGES ? '/slider/' : '/';
const publicPath = basePath;

export default defineConfig({
  alias: {
    '@rc-component/slider$': path.resolve('src'),
    '@rc-component/slider/es': path.resolve('src'),
    '@rc-component/slider/assets': path.resolve('assets'),
  },
  mfsu: false,
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'Slider',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
  outputPath: 'docs-dist',
  base: basePath,
  publicPath,
  styles: [``],
});
