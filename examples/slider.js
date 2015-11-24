webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(214);


/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(160);
	var Slider = __webpack_require__(161);
	
	var style = { width: 400, margin: 50 };
	var log = function log(value) {
	  console.log(value);
	};
	
	function percentFormatter(v) {
	  return v + ' %';
	}
	
	var CustomizedSlider = React.createClass({
	  displayName: 'CustomizedSlider',
	
	  getInitialState: function getInitialState() {
	    return {
	      value: 50
	    };
	  },
	  onChange: function onChange(value) {
	    log(value);
	    this.setState({
	      value: value
	    });
	  },
	  render: function render() {
	    return React.createElement(Slider, { value: this.state.value, onChange: this.onChange });
	  }
	});
	
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
	      'Basic Slider，`step=20`'
	    ),
	    React.createElement(Slider, { step: 20, defaultValue: 50, onBeforeChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Slider，`step=20, dots`'
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
	    React.createElement(Slider, { tipFormatter: percentFormatter, tipTransitionName: 'rc-slider-tooltip-zoom-down', onChange: log })
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
	  )
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=slider.js.map