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
    `a img + svg {
      display: none;
    }`
  ],
  scripts: [{
    content: `
      (function () {
        var timer = setInterval(function() {
          try {
            var menuList = document.getElementsByClassName('__dumi-default-menu-list');
            menuList[0].childNodes[0].childNodes[0].innerText = '${name}';
            clearInterval(timer);
          } catch (e) {}
        }, 200)
      })();
    `
  }]
});
