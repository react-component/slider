webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(280);


/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var React = __webpack_require__(4);
	var ReactDOM = __webpack_require__(35);
	var Slider = __webpack_require__(256);
	
	var style = { float: 'left', width: 160, height: 400, marginBottom: 160, marginLeft: 50 };
	var parentStyle = { overflow: 'hidden' };
	
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
	  { style: parentStyle },
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with marks, `step=null`'
	    ),
	    React.createElement(Slider, { vertical: true, min: -10, marks: marks, step: null, onChange: log, defaultValue: 20 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with marks and steps'
	    ),
	    React.createElement(Slider, { vertical: true, dots: true, min: -10, marks: marks, step: 10, onChange: log, defaultValue: 20 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with marks, `included=false`'
	    ),
	    React.createElement(Slider, { vertical: true, min: -10, marks: marks, included: false, defaultValue: 20 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Slider with marks and steps, `included=false`'
	    ),
	    React.createElement(Slider, { vertical: true, min: -10, marks: marks, step: 10, included: false, defaultValue: 20 })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Range with marks'
	    ),
	    React.createElement(Slider.Range, { vertical: true, min: -10, marks: marks, onChange: log, defaultValue: [20, 40] })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Range with marks and steps'
	    ),
	    React.createElement(Slider.Range, { vertical: true, min: -10, marks: marks, step: 10,
	      onChange: log, defaultValue: [20, 40]
	    })
	  )
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=vertical.js.map