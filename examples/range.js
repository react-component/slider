webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(202);


/***/ },

/***/ 202:
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
	
	var CustomizedRange = React.createClass({
	  displayName: 'CustomizedRange',
	
	  getInitialState: function getInitialState() {
	    return {
	      value: [20, 40]
	    };
	  },
	  onChange: function onChange(value) {
	    log(value);
	    this.setState({
	      value: value
	    });
	  },
	  render: function render() {
	    return React.createElement(Slider, { range: true, value: this.state.value, onChange: this.onChange });
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
	      'Basic Range'
	    ),
	    React.createElement(Slider, { range: true, defaultValue: [0, 20], onChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Range，`step=20` '
	    ),
	    React.createElement(Slider, { range: true, step: 20, defaultValue: [20, 40], onBeforeChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Range，`step=20, dots` '
	    ),
	    React.createElement(Slider, { range: true, dots: true, step: 20, defaultValue: [20, 40], onAfterChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Controlled Range'
	    ),
	    React.createElement(Slider, { range: true, value: [20, 40] })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Customized Range'
	    ),
	    React.createElement(CustomizedRange, null)
	  )
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=range.js.map