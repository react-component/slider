// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';

const name = 'rc-slider';

export default defineConfig({
  title: name,
  favicon:
    'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  logo:
    'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  outputPath: '.doc',
  exportStatic: {},
  styles: [
    `
      .markdown table {
        width: auto !important;
      }
    `,
  ]
});
