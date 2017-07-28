webpackJsonp([3],{

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_slider__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_slider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rc_slider__);




/* eslint react/no-multi-comp: 0, no-console: 0 */





var Range = __WEBPACK_IMPORTED_MODULE_7_rc_slider___default.a.Range;

var style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

var CustomizedRange = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(CustomizedRange, _React$Component);

  function CustomizedRange(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CustomizedRange);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CustomizedRange.__proto__ || Object.getPrototypeOf(CustomizedRange)).call(this, props));

    _this.onLowerBoundChange = function (e) {
      _this.setState({ lowerBound: +e.target.value });
    };

    _this.onUpperBoundChange = function (e) {
      _this.setState({ upperBound: +e.target.value });
    };

    _this.onSliderChange = function (value) {
      log(value);
      _this.setState({
        value: value
      });
    };

    _this.handleApply = function () {
      var _this$state = _this.state,
          lowerBound = _this$state.lowerBound,
          upperBound = _this$state.upperBound;

      _this.setState({ value: [lowerBound, upperBound] });
    };

    _this.state = {
      lowerBound: 20,
      upperBound: 40,
      value: [20, 40]
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(CustomizedRange, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'label',
          null,
          'LowerBound: '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { type: 'number', value: this.state.lowerBound, onChange: this.onLowerBoundChange }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'label',
          null,
          'UpperBound: '
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { type: 'number', value: this.state.upperBound, onChange: this.onUpperBoundChange }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'button',
          { onClick: this.handleApply },
          'Apply'
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { allowCross: false, value: this.state.value, onChange: this.onSliderChange })
      );
    }
  }]);

  return CustomizedRange;
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
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { defaultValue: [20, 50], min: this.state.min, max: this.state.max,
          onChange: this.onSliderChange
        })
      );
    }
  }]);

  return DynamicBounds;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

var ControlledRange = function (_React$Component3) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ControlledRange, _React$Component3);

  function ControlledRange(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ControlledRange);

    var _this3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ControlledRange.__proto__ || Object.getPrototypeOf(ControlledRange)).call(this, props));

    _this3.handleChange = function (value) {
      _this3.setState({
        value: value
      });
    };

    _this3.state = {
      value: [20, 40, 60, 80]
    };
    return _this3;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ControlledRange, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { value: this.state.value, onChange: this.handleChange });
    }
  }]);

  return ControlledRange;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

// https://github.com/react-component/slider/issues/226


var PureRenderRange = function (_React$Component4) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(PureRenderRange, _React$Component4);

  function PureRenderRange(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PureRenderRange);

    var _this4 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PureRenderRange.__proto__ || Object.getPrototypeOf(PureRenderRange)).call(this, props));

    _this4.handleChange = function (value) {
      console.log(value);
      _this4.setState({
        foo: !_this4.state.foo
      });
    };

    _this4.state = {
      foo: false
    };
    return _this4;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PureRenderRange, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { defaultValue: [20, 40, 60, 80], onChange: this.handleChange, allowCross: false });
    }
  }]);

  return PureRenderRange;
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
      'Basic Range\uFF0C`allowCross=false`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { allowCross: false, defaultValue: [0, 20], onChange: log })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Range\uFF0C`step=20` '
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { step: 20, defaultValue: [20, 20], onBeforeChange: log })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Range\uFF0C`step=20, dots` '
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { dots: true, step: 20, defaultValue: [20, 40], onAfterChange: log })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Basic Range\uFF0Cdisabled'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { allowCross: false, defaultValue: [0, 20], onChange: log, disabled: true })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Controlled Range'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(ControlledRange, null)
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Multi Range'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { count: 3, defaultValue: [20, 40, 60, 80], pushable: true })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Multi Range with custom track and handle style'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Range, { count: 3, defaultValue: [20, 40, 60, 80], pushable: true,
      trackStyle: [{ backgroundColor: 'red' }, { backgroundColor: 'green' }],
      handleStyle: [{ backgroundColor: 'yellow' }, { backgroundColor: 'gray' }],
      railStyle: { backgroundColor: 'black' }
    })
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Customized Range'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(CustomizedRange, null)
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Range with dynamic `max` `min`'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(DynamicBounds, null)
  ),
  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'div',
    { style: style },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'p',
      null,
      'Range as child component'
    ),
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(PureRenderRange, null)
  )
), document.getElementById('__react-content'));

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(159);


/***/ })

},[351]);
//# sourceMappingURL=range.js.map