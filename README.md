# rc-slider
---

Slider UI component for React

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-slider)](https://saucelabs.com/u/rc-slider)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-slider.svg)](https://saucelabs.com/u/rc-slider)

[npm-image]: http://img.shields.io/npm/v/rc-slider.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-slider
[travis-image]: https://img.shields.io/travis/react-component/slider.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/slider
[coveralls-image]: https://img.shields.io/coveralls/react-component/slider.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/slider?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/slider.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/slider
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-slider.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-slider

## Screenshots

<img src="https://t.alipayobjects.com/images/T1ki8fXeprXXXXXXXX.png" width="550"/>

<img src="https://t.alipayobjects.com/images/T1pPhfXhBqXXXXXXXX.png" width="550"/>

<img src="https://t.alipayobjects.com/images/T1wO8fXd4rXXXXXXXX.png" width="550"/>

<img src="http://i.giphy.com/l46Cs36c9HrHMExoc.gif"/>


## Features

* Supports IE9, IE9+, Chrome, Firefox & Safari

### Keyboard

## Install

```bash
npm install --save rc-slider
```

[![rc-slider](https://nodei.co/npm/rc-slider.png)](https://npmjs.org/package/rc-slider)

## Usage

```js
require('rc-slider/assets/index.css');

var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('rc-slider');
ReactDOM.render(<Slider />, container);
```

## API

### props


| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| className | String | `rc-slider` | Additional CSS class for the root DOM node |
| min | Number | `0` | The minimum value of the slider |
| max | Number | `100` | The maximum value of the slider |
| marks | `{ number: string }` or`{ number: { style, label }}` | `{}` | Mark on the slider. The key determines the position, and the value determines what will show. If you want to set the style of a specific mark point, the value should be an object which contains `style` and `label` properties. |
| step | Number or `null` | `1` | Value to be added or subtracted on each step the slider makes. Must be greater than zero. `max` - `min` should be evenly divisible by the step value. When `marks` is not an empty object, `step` can be set to `null`, to make `marks` as steps. | 
| range | Boolean or Number | `false` | Determines the type of slider. If range is `true`, two handles will be rendered in order to select a range. If range is a number, multiple handles will be rendered (number + 1). Using `range={true}` is equivalent to `range={1}`. |
| allowCross | Boolean | `true` | When `range` is `true`, `allowCross` could be set as `true` to allow those handles to cross. |
| pushable | Boolean or Number | `true` | When `range` is `true`, `pushable` could be set as `true` to allow pushing of surrounding handles when moving an handle. When set to a number, the number will be the minimum ensured distance between handles. Example: ![](http://i.giphy.com/l46Cs36c9HrHMExoc.gif) |
| vertical | Boolean | `false` | If vertical is `true`, the slider will be vertical. |
| defaultValue | Number or `[Number, Number, ...]` | `0` or `[0, 0]` | Set initial positions of handles. If range is `false`, the type of `defaultValue` should be `number`. Otherwise, `[number, number, ...]` |
| value | Number or `[Number, Number, ...]` | | Set current positions of handles. If range is `false`, the type of `defaultValue` should be `number`. Otherwise, `[number, number, ...]` |
| handle | Component | | Provide a custom Handle to use in the slider by passing a component. This component will have a `value` and `offset` props used to define custom styling/content. |
| included | Boolean | `true` | If the value is `true`, it means a continuous value interval, otherwise, it is a independent value. |
| disabled | Boolean | `false` | If `true`, handles can't be moved. |
| tipTransitionName | String | `''` | Set the animation for tooltip if it shows. |
| tipFormatter | Function or `null` | | Format the value of the tooltip if it shows. If `null` the tooltip will always be hidden. When given a function, the first argument will be the value and the second will be the index of the slider handle. |
| dots | Boolean | `false` | When the `step` value is greater than 1, you can set the `dots` to  `true` if you want to render the slider with dots. |
| onChange | Function | NOOP | `onChange` will be triggered while the value of Slider changing. |
| onAfterChange | Function | NOOP | `onAfterChange` will be triggered when `ontouchend` or `onmouseup` is triggered. |

## Development

```
npm install
npm start
```

## Example

`npm start` and then go to `http://localhost:8005/examples/`

Online examples: [http://react-component.github.io/slider/](http://react-component.github.io/slider/)

## Test Case

`http://localhost:8005/tests/runner.html?coverage`

## Coverage

`http://localhost:8005/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8088/tests/runner.html?coverage`

## License

`rc-slider` is released under the MIT license.
