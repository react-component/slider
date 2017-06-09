webpackJsonp([0],{

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_slider_assets_index_less__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_slider_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rc_slider_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_tooltip_assets_bootstrap_css__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_tooltip_assets_bootstrap_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rc_tooltip_assets_bootstrap_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_tooltip__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_slider__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_slider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rc_slider__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable react/prop-types */








var createSliderWithTooltip = __WEBPACK_IMPORTED_MODULE_5_rc_slider___default.a.createSliderWithTooltip;
var Range = createSliderWithTooltip(__WEBPACK_IMPORTED_MODULE_5_rc_slider___default.a.Range);
var Handle = __WEBPACK_IMPORTED_MODULE_5_rc_slider___default.a.Handle;

var handle = function handle(props) {
  var value = props.value,
      dragging = props.dragging,
      index = props.index,
      restProps = _objectWithoutProperties(props, ['value', 'dragging', 'index']);

  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_rc_tooltip__["a" /* default */],
    {
      prefixCls: 'rc-slider-tooltip',
      overlay: value,
      visible: dragging,
      placement: 'top',
      key: index
    },
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Handle, _extends({ value: value }, restProps))
  );
};

var wrapperStyle = { width: 400, margin: 50 };
__WEBPACK_IMPORTED_MODULE_3_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
  'div',
  null,
  __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
    'div',
    { style: wrapperStyle },
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      'p',
      null,
      'Slider with custom handle'
    ),
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_rc_slider___default.a, { min: 0, max: 20, defaultValue: 3, handle: handle })
  ),
  __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
    'div',
    { style: wrapperStyle },
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      'p',
      null,
      'Range with custom handle'
    ),
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Range, { min: 0, max: 20, defaultValue: [3, 10], tipFormatter: function tipFormatter(value) {
        return value + '%';
      } })
  )
), document.getElementById('__react-content'));

/***/ }),

/***/ 213:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(147);


/***/ })

},[328]);
//# sourceMappingURL=handle.js.map