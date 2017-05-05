webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(338);


/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(226);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(227);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(263);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint react/no-multi-comp: 0 */
	__webpack_require__(3);
	
	var React = __webpack_require__(5);
	var ReactDOM = __webpack_require__(40);
	var Slider = __webpack_require__(309);
	
	var style = { width: 400, margin: 50 };
	
	function log(value) {
	  console.log(value); //eslint-disable-line
	}
	
	function percentFormatter(v) {
	  return v + ' %';
	}
	
	var CustomizedSlider = function (_React$Component) {
	  (0, _inherits3.default)(CustomizedSlider, _React$Component);
	
	  function CustomizedSlider(props) {
	    (0, _classCallCheck3.default)(this, CustomizedSlider);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
	
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
	
	  CustomizedSlider.prototype.render = function render() {
	    return React.createElement(Slider, { value: this.state.value,
	      onChange: this.onSliderChange, onAfterChange: this.onAfterChange
	    });
	  };
	
	  return CustomizedSlider;
	}(React.Component);
	
	var DynamicBounds = function (_React$Component2) {
	  (0, _inherits3.default)(DynamicBounds, _React$Component2);
	
	  function DynamicBounds(props) {
	    (0, _classCallCheck3.default)(this, DynamicBounds);
	
	    var _this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call(this, props));
	
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
	
	  DynamicBounds.prototype.render = function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        null,
	        'Min: '
	      ),
	      React.createElement('input', { type: 'number', value: this.state.min, onChange: this.onMinChange }),
	      React.createElement('br', null),
	      React.createElement(
	        'label',
	        null,
	        'Max: '
	      ),
	      React.createElement('input', { type: 'number', value: this.state.max, onChange: this.onMaxChange }),
	      React.createElement('br', null),
	      React.createElement('br', null),
	      React.createElement(Slider, { defaultValue: 50, min: this.state.min, max: this.state.max,
	        onChange: this.onSliderChange
	      })
	    );
	  };
	
	  return DynamicBounds;
	}(React.Component);
	
	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Slider'
	    ),
	    React.createElement(Slider, { tipTransitionName: 'rc-slider-tooltip-zoom-down', onChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Slider\uFF0C`step=20`'
	    ),
	    React.createElement(Slider, { step: 20, defaultValue: 50, onBeforeChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Slider\uFF0C`step=20, dots`'
	    ),
	    React.createElement(Slider, { dots: true, step: 20, defaultValue: 100, onAfterChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Slider with `tipFormatter`'
	    ),
	    React.createElement(Slider, { tipFormatter: percentFormatter,
	      tipTransitionName: 'rc-slider-tooltip-zoom-down', onChange: log
	    })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Slider without tooltip'
	    ),
	    React.createElement(Slider, { tipFormatter: null, onChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with custom handle and track style'
	    ),
	    React.createElement(Slider, {
	      defaultValue: 30,
	      maximumTrackStyle: { backgroundColor: 'red', height: 10 },
	      minimumTrackStyle: { backgroundColor: 'blue', height: 10 },
	      handleStyle: {
	        borderColor: 'blue',
	        height: 28,
	        width: 28,
	        marginLeft: -14,
	        marginTop: -9,
	        backgroundColor: 'blue'
	      }
	    })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Slider, disabled'
	    ),
	    React.createElement(Slider, { tipTransitionName: 'rc-slider-tooltip-zoom-down', onChange: log, disabled: true })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Controlled Slider'
	    ),
	    React.createElement(Slider, { value: 50 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Customized Slider'
	    ),
	    React.createElement(CustomizedSlider, null)
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with dynamic `min` `max`'
	    ),
	    React.createElement(DynamicBounds, null)
	  )
	), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=slider.js.map