webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectWithoutProperties2 = __webpack_require__(2);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable react/prop-types */
	
	__webpack_require__(3);
	__webpack_require__(4);
	
	var React = __webpack_require__(5);
	var ReactDOM = __webpack_require__(36);
	var Tooltip = __webpack_require__(182);
	var Slider = __webpack_require__(256);
	var createSliderWithTooltip = Slider.createSliderWithTooltip;
	var Range = createSliderWithTooltip(Slider.Range);
	var Handle = Slider.Handle;
	
	var handle = function handle(props) {
	  var value = props.value,
	      dragging = props.dragging,
	      index = props.index,
	      restProps = (0, _objectWithoutProperties3.default)(props, ['value', 'dragging', 'index']);
	
	  return React.createElement(
	    Tooltip,
	    {
	      prefixCls: 'rc-slider-tooltip',
	      overlay: value,
	      visible: dragging,
	      placement: 'top',
	      key: index
	    },
	    React.createElement(Handle, restProps)
	  );
	};
	
	var wrapperStyle = { width: 400, margin: 50 };
	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'div',
	    { style: wrapperStyle },
	    React.createElement(
	      'p',
	      null,
	      'Slider with custom handle'
	    ),
	    React.createElement(Slider, { min: 0, max: 20, defaultValue: 3, handle: handle })
	  ),
	  React.createElement(
	    'div',
	    { style: wrapperStyle },
	    React.createElement(
	      'p',
	      null,
	      'Range with custom handle'
	    ),
	    React.createElement(Range, { min: 0, max: 20, defaultValue: [3, 10], tipFormatter: function tipFormatter(value) {
	        return value + '%';
	      } })
	  )
	), document.getElementById('__react-content'));

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
3
]);
//# sourceMappingURL=handle.js.map