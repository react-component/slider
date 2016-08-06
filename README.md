# rc-slider
---

slider ui component for react

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


## Feature

* support ie8,ie8+,chrome,firefox,safari

### Keyboard



## install

[![rc-slider](https://nodei.co/npm/rc-slider.png)](https://npmjs.org/package/rc-slider)

## Usage

```js
require('rc-slider/assets/index.css');

var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
ReactDOM.render(<Rcslider />, container);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>className</td>
          <td>String</td>
          <td>rc-slider</td>
          <td>Additional css class for the root dom node</td>
        </tr>
        <tr>
          <td>min</td>
          <td>number</td>
          <td>0</td>
          <td>The minimum value of the slider</td>
        </tr>
        <tr>
          <td>max</td>
          <td>number</td>
          <td>100</td>
          <td>The maximum value of the slider</td>
        </tr>
        <tr>
          <td>marks</td>
          <td>object{number: string} or object{number: object{ style, label }}</td>
          <td>{}</td>
          <td>Mark on the slider. The key determines the position, and the value determines what will show. If you want to set the style of a specific mark point, the value should be an object which contains `style` and `label` properties.</td>
        </tr>
        <tr>
          <td>step</td>
          <td>number or `null`</td>
          <td>1</td>
          <td>Value to be added or subtracted on each step the slider makes. Must be greater than zero. max - min should be evenly divisible by the step value. When `marks` is not an empty object, `step` can be set to `null`, to make marks as steps.</td>
        </tr>
        <tr>
          <td>range</td>
          <td>boolean or number</td>
          <td>false</td>
          <td>Determines the type of slider. If range is `true`, two handles will be rendered in order to select a range. If range is a number, multiple handles will be rendered (number + 1). Using `range={true}` is equivalent to `range={1}`.</td>
        </tr>
        <tr>
          <td>allowCross</td>
          <td>boolean</td>
          <td>true</td>
          <td>When `range` is `true`, `allowCross` could be set as `true` to allow those handles to cross.</td>
        </tr>
        <tr>
          <td>pushable</td>
          <td>boolean or number</td>
          <td>true</td>
          <td>When `range` is `true`, `pushable` could be set as `true` to allow pushing of surrounding handles when moving an handle. When set to a number, the number will be the minimum ensured distance between handles. Example: <img src="http://i.giphy.com/l46Cs36c9HrHMExoc.gif"/></td>
        </tr>
        <tr>
          <td>vertical</td>
          <td>boolean</td>
          <td>false</td>
          <td>If vertical is `true`, the slider will be vertical.</td>
        </tr>
        <tr>
          <td>defaultValue</td>
          <td>number or [number, number, ...]</td>
          <td>0 or [0, 0]</td>
          <td>Set initial positions of handles. If range is `false`, the type of `defaultValue` should be `number`. Otherwise, `[number, number, ...]`</td>
        </tr>
        <tr>
          <td>value</td>
          <td>number or [number, number, ...]</td>
          <td></td>
          <td>Set current positions of handles. If range is `false`, the type of `defaultValue` should be `number`. Otherwise, `[number, number, ...]`</td>
        </tr>
        <tr>
          <td>handle</td>
          <td>Component</td>
          <td></td>
          <td>Provide a custom Handle to use in the slider by passing a component. This component will have a `value` and `offset` props used to define custom styling/content.</td>
        </tr>
        <tr>
          <td>included</td>
          <td>boolean</td>
          <td>true</td>
          <td>If the value is `true`, it means a continuous value interval, otherwise, it is a independent value.</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>boolean</td>
          <td>false</td>
          <td>If `true`, handles can't be moved.</td>
        </tr>
        <tr>
          <td>tipTransitionName</td>
          <td>string</td>
          <td>''</td>
          <td>Set the animation for tooltip if it shows.</td>
        </tr>
        <tr>
          <td>tipFormatter</td>
          <td>function or `null`</td>
          <td></td>
          <td>Format the value of the tooltip if it shows. If `null` the tooltip will always be hidden.</td>
        </tr>
        <tr>
          <td>dots</td>
          <td>bool</td>
          <td>false</td>
          <td>When the `step` value is greater than 1, you can set the `dots` to  `true` if you want to render the slider with dots.</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>function</td>
          <td>NOOP</td>
          <td>`onChange` will be triggered while the value of Slider changing.</td>
        </tr>
        <tr>
          <td>onAfterChange</td>
          <td>function</td>
          <td>NOOP</td>
          <td>`onAfterChange` will be triggered when `ontouchend` or `onmouseup` is triggered.</td>
        </tr>
    </tbody>
</table>

## Development

```
npm install
npm start
```

## Example

http://localhost:8005/examples/

online example: http://react-component.github.io/slider/

## Test Case

http://localhost:8005/tests/runner.html?coverage

## Coverage

http://localhost:8005/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8088/tests/runner.html?coverage

## License

rc-slider is released under the MIT license.
