global.requestAnimationFrame = global.requestAnimationFrame || function _raf(cb) {
  return setTimeout(cb, 0);
};
require('regenerator-runtime');

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
