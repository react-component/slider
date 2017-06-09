webpackJsonp([2],{

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_slider__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_slider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rc_slider__);




/* eslint react/no-multi-comp: 0, max-len: 0 */






var style = { width: 600, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

function percentFormatter(v) {
  return v + ' %';
}

var CustomizedSlider = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(CustomizedSlider, _React$Component);

  function CustomizedSlider(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CustomizedSlider);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CustomizedSlider.__proto__ || Object.getPrototypeOf(CustomizedSlider)).call(this, props));

    _this.onSliderChange = function (value) {
      log(value);
      _this.setState({
        value: value
      });
    };

    _this.onAfterChange = function (value) {
      console.log(value); //eslint-disable-line
    };

    _this.state = {
      value: 50
    };
    return _this;
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

var DynamicBounds = function (_React$Component2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(DynamicBounds, _React$Component2);

  function DynamicBounds(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DynamicBounds);

    var _this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (DynamicBounds.__proto__ || Object.getPrototypeOf(DynamicBounds)).call(this, props));

    _this2.onSliderChange = function (value) {
      log(value);
    };

    _this2.onMinChange = function (e) {
      _this2.setState({
        min: +e.target.value || 0
      });
    };

    _this2.onMaxChange = function (e) {
      _this2.setState({
        max: +e.target.value || 100
      });
    };

    _this2.state = {
      min: 0,
      max: 100
    };
    return _this2;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(DynamicBounds, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'label',
          null,
          'Min: '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { type: 'number', value: this.state.min, onChange: this.onMinChange }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'label',
          null,
          'Max: '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { type: 'number', value: this.state.max, onChange: this.onMaxChange }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { defaultValue: 50, min: this.state.min, max: this.state.max,
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
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { tipTransitionName: 'rc-slider-tooltip-zoom-down', onChange: log })
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
      'Basic Slider with `tipFormatter`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { tipFormatter: percentFormatter,
      tipTransitionName: 'rc-slider-tooltip-zoom-down', onChange: log
    })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Slider without tooltip'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { tipFormatter: null, onChange: log })
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
        '(old api, will be deperacete)'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, {
      defaultValue: 30,
      maximumTrackStyle: { backgroundColor: 'red', height: 10 },
      minimumTrackStyle: { backgroundColor: 'blue', height: 10 },
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
      'Basic Slider, disabled'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a, { tipTransitionName: 'rc-slider-tooltip-zoom-down', onChange: log, disabled: true })
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
      'Slider with dynamic `min` `max`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(DynamicBounds, null)
  )
), document.getElementById('__react-content'));

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(157);


/***/ })

},[350]);
//# sourceMappingURL=slider.js.map