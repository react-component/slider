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


## Feature

* support ie8,ie8+,chrome,firefox,safari

### Keyboard



## install

[![rc-slider](https://nodei.co/npm/rc-slider.png)](https://npmjs.org/package/rc-slider)

## Usage

```js
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
          <td>step</td>
          <td>number</td>
          <td>1</td>
          <td>Value to be added or subtracted on each step the slider makes. Must be greater than zero. max - min should be evenly divisible by the step value.</td>
        </tr>
        <tr>
          <td>range</td>
          <td>boolean</td>
          <td>false</td>
          <td>Determines the type of slider. If range is `true`, two handles will be rendered in order to select a range.</td>
        </tr>
        <tr>
          <td>defaultValue</td>
          <td>number</td>
          <td>0</td>
          <td>If range is `false`, this prop will set the initial position of the handle.</td>
        </tr>
        <tr>
          <td>defaultValues</td>
          <td>[number, number]</td>
          <td>[0, 0]</td>
          <td>If range is `true`, this prop will set initial positions of handles respectively.</td>
        </tr>
        <tr>
          <td>value</td>
          <td>number</td>
          <td></td>
          <td>If range is `false`, this prop will set the current position of the handle.</td>
        </tr>
        <tr>
          <td>values</td>
          <td>[number, number]</td>
          <td></td>
          <td>If range is `true`, this prop will set current positions of handles respectively.</td>
        </tr>
        <tr>
          <td>marks</td>
          <td>array</td>
          <td>[]</td>
          <td>Mark every step for the slider, it will ignore the `step` parameter if it has been defined. Does not work with `range`</td>
        </tr>
        <tr>
          <td>included</td>
          <td>boolean</td>
          <td>true</td>
          <td>If the value is `true`, it means a continuous value interval, otherwise, it is a independent value.</td>
        </tr>
        <tr>
          <td>defaultIndex</td>
          <td>number</td>
          <td>0</td>
          <td>For step or marks slider, determines the initial position of the handle. Does not work with `range`</td>
        </tr>
        <tr>
          <td>index</td>
          <td>number</td>
          <td></td>
          <td>For step or marks slider, determines current position of the handle. Does not work with `range`</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>boolean</td>
          <td>false</td>
          <td>If true the handles can't be moved.</td>
        </tr>
        <tr>
          <td>tipTransitionName</td>
          <td>string</td>
          <td>''</td>
          <td>Set the animation for tooltip if it shows.</td>
        </tr>
        <tr>
          <td>dots</td>
          <td>bool</td>
          <td>false</td>
          <td>For linear slider, when the `step` value is greater than 1, you can set the `dots` to  `true` if you want to render the slider bar with dots.</td>
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
