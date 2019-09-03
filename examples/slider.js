webpackJsonp([3],{

/***/ 11:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(193);


/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_slider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_slider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rc_slider__);




/* eslint react/no-multi-comp: 0, max-len: 0 */






var style = { width: 600, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

function percentFormatter(v) {
  return v + ' %';
}

var SliderWithTooltip = Object(__WEBPACK_IMPORTED_MODULE_7_rc_slider__["createSliderWithTooltip"])(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a);

var NullableSlider = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(NullableSlider, _React$Component);

  function NullableSlider(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, NullableSlider);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (NullableSlider.__proto__ || Object.getPrototypeOf(NullableSlider)).call(this, props));

    _this.onSliderChange = function (value) {
      log(value);
      _this.setState({
        value: value
      });
    };

    _this.onAfterChange = function (value) {
      console.log(value); //eslint-disable-line
    };

    _this.reset = function () {
      console.log('reset value'); // eslint-disable-line
      _this.setState({ value: null });
    };

    _this.state = {
      value: null
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(NullableSlider, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, {
          value: this.state.value,
          onChange: this.onSliderChange,
          onAfterChange: this.onAfterChange
        }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'button',
          { onClick: this.reset },
          'Reset'
        )
      );
    }
  }]);

  return NullableSlider;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

var CustomizedSlider = function (_React$Component2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(CustomizedSlider, _React$Component2);

  function CustomizedSlider(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CustomizedSlider);

    var _this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CustomizedSlider.__proto__ || Object.getPrototypeOf(CustomizedSlider)).call(this, props));

    _this2.onSliderChange = function (value) {
      log(value);
      _this2.setState({
        value: value
      });
    };

    _this2.onAfterChange = function (value) {
      console.log(value); //eslint-disable-line
    };

    _this2.state = {
      value: 50
    };
    return _this2;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(CustomizedSlider, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { value: this.state.value,
        onChange: this.onSliderChange, onAfterChange: this.onAfterChange
      });
    }
  }]);

  return CustomizedSlider;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

var DynamicBounds = function (_React$Component3) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(DynamicBounds, _React$Component3);

  function DynamicBounds(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DynamicBounds);

    var _this3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (DynamicBounds.__proto__ || Object.getPrototypeOf(DynamicBounds)).call(this, props));

    _this3.onSliderChange = function (value) {
      log(value);
      _this3.setState({ value: value });
    };

    _this3.onMinChange = function (e) {
      _this3.setState({
        min: +e.target.value || 0
      });
    };

    _this3.onMaxChange = function (e) {
      _this3.setState({
        max: +e.target.value || 100
      });
    };

    _this3.onStepChange = function (e) {
      _this3.setState({
        step: +e.target.value || 1
      });
    };

    _this3.state = {
      min: 1,
      max: 100,
      step: 10,
      value: 1
    };
    return _this3;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(DynamicBounds, [{
    key: 'render',
    value: function render() {
      var labelStyle = { minWidth: '60px', display: 'inline-block' };
      var inputStyle = { marginBottom: '10px' };
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'label',
          { style: labelStyle },
          'Min: '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { type: 'number', value: this.state.min, onChange: this.onMinChange, style: inputStyle }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'label',
          { style: labelStyle },
          'Max: '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { type: 'number', value: this.state.max, onChange: this.onMaxChange, style: inputStyle }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'label',
          { style: labelStyle },
          'Step: '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { type: 'number', value: this.state.step, onChange: this.onStepChange, style: inputStyle }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'label',
          { style: labelStyle },
          'Value: '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'span',
          null,
          this.state.value
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { value: this.state.value, min: this.state.min, max: this.state.max, step: this.state.step,
          onChange: this.onSliderChange
        })
      );
    }
  }]);

  return DynamicBounds;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
  'div',
  null,
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Slider'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { onChange: log })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Slider reverse'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { onChange: log, reverse: true, min: 20, max: 60 })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Slider\uFF0C`step=20`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { step: 20, defaultValue: 50, onBeforeChange: log })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Slider\uFF0C`step=20, dots`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { dots: true, step: 20, defaultValue: 100, onAfterChange: log })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Slider\uFF0C`step=20, dots, dotStyle=',
      "{borderColor: 'orange'}",
      ', activeDotStyle=',
      "{borderColor: 'yellow'}",
      '`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { dots: true, step: 20, defaultValue: 100, onAfterChange: log, dotStyle: { borderColor: 'orange' }, activeDotStyle: { borderColor: 'yellow' } })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Slider with tooltip, with custom `tipFormatter`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(SliderWithTooltip, {
      tipFormatter: percentFormatter,
      tipProps: { overlayClassName: 'foo' },
      onChange: log
    })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Slider with custom handle and track style.',
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'strong',
        null,
        '(old api, will be deprecated)'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, {
      defaultValue: 30,
      railStyle: { backgroundColor: 'red', height: 10 },
      trackStyle: { backgroundColor: 'blue', height: 10 },
      handleStyle: {
        borderColor: 'blue',
        height: 28,
        width: 28,
        marginLeft: -14,
        marginTop: -9,
        backgroundColor: 'black'
      }
    })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Slider with custom handle and track style.',
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'strong',
        null,
        '(The recommended new api)'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, {
      defaultValue: 30,
      trackStyle: { backgroundColor: 'blue', height: 10 },
      handleStyle: {
        borderColor: 'blue',
        height: 28,
        width: 28,
        marginLeft: -14,
        marginTop: -9,
        backgroundColor: 'black'
      },
      railStyle: { backgroundColor: 'red', height: 10 }
    })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Reversed Slider with custom handle and track style.',
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'strong',
        null,
        '(The recommended new api)'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, {
      defaultValue: 30,
      trackStyle: { backgroundColor: 'blue', height: 10 },
      reverse: true,
      handleStyle: {
        borderColor: 'blue',
        height: 28,
        width: 28,
        marginLeft: -14,
        marginTop: -9,
        backgroundColor: 'black'
      },
      railStyle: { backgroundColor: 'red', height: 10 }
    })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Slider, disabled'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { onChange: log, disabled: true })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Controlled Slider'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { value: 50 })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Customized Slider'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(CustomizedSlider, null)
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Slider with null value and reset button'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(NullableSlider, null)
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Slider with dynamic `min` `max` `step`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(DynamicBounds, null)
  )
), document.getElementById('__react-content'));

/***/ })

},[192]);
//# sourceMappingURL=slider.js.map