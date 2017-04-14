webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(269);


/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var React = __webpack_require__(4);
	var ReactDOM = __webpack_require__(35);
	var Slider = __webpack_require__(256);
	
	var style = { width: 400, margin: 50 };
	var marks = {
	  '-10': '-10°C',
	  0: React.createElement(
	    'strong',
	    null,
	    '0\xB0C'
	  ),
	  26: '26°C',
	  37: '37°C',
	  50: '50°C',
	  100: {
	    style: {
	      color: 'red'
	    },
	    label: React.createElement(
	      'strong',
	      null,
	      '100\xB0C'
	    )
	  }
	};
	
	function log(value) {
	  console.log(value); //eslint-disable-line
	}
	
	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with marks, `step=null`'
	    ),
	    React.createElement(Slider, { min: -10, marks: marks, step: null, onChange: log, defaultValue: 20 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with marks and steps'
	    ),
	    React.createElement(Slider, { dots: true, min: -10, marks: marks, step: 10, onChange: log, defaultValue: 20 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with marks, `included=false`'
	    ),
	    React.createElement(Slider, { min: -10, marks: marks, included: false, defaultValue: 20 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with marks and steps, `included=false`'
	    ),
	    React.createElement(Slider, { min: -10, marks: marks, step: 10, included: false, defaultValue: 20 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Range with marks'
	    ),
	    React.createElement(Slider.Range, { min: -10, marks: marks, onChange: log, defaultValue: [20, 40] })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Range with marks and steps'
	    ),
	    React.createElement(Slider.Range, { min: -10, marks: marks, step: 10, onChange: log, defaultValue: [20, 40] })
	  )
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=marks.js.map