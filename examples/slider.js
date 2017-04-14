webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(271);


/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	/* eslint react/no-multi-comp: 0 */
	__webpack_require__(2);
	
	var React = __webpack_require__(4);
	var ReactDOM = __webpack_require__(35);
	var Slider = __webpack_require__(256);
	
	var style = { width: 400, margin: 50 };
	
	function log(value) {
	  console.log(value); //eslint-disable-line
	}
	
	function percentFormatter(v) {
	  return v + ' %';
	}
	
	var CustomizedSlider = function (_React$Component) {
	  _inherits(CustomizedSlider, _React$Component);
	
	  function CustomizedSlider(props) {
	    _classCallCheck(this, CustomizedSlider);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
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
	  _inherits(DynamicBounds, _React$Component2);
	
	  function DynamicBounds(props) {
	    _classCallCheck(this, DynamicBounds);
	
	    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));
	
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

/***/ }

});
//# sourceMappingURL=slider.js.map