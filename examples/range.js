webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(318);


/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* eslint react/no-multi-comp: 0 */
	__webpack_require__(2);
	
	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(36);
	var Slider = __webpack_require__(174);
	
	var style = { width: 400, margin: 50 };
	
	function log(value) {
	  console.log(value);
	}
	
	var CustomizedRange = React.createClass({
	  displayName: 'CustomizedRange',
	  getInitialState: function getInitialState() {
	    return {
	      lowerBound: 20,
	      upperBound: 40,
	      value: [20, 40]
	    };
	  },
	  onLowerBoundChange: function onLowerBoundChange(e) {
	    this.setState({ lowerBound: +e.target.value });
	  },
	  onUpperBoundChange: function onUpperBoundChange(e) {
	    this.setState({ upperBound: +e.target.value });
	  },
	  onSliderChange: function onSliderChange(value) {
	    log(value);
	    this.setState({
	      value: value
	    });
	  },
	  handleApply: function handleApply() {
	    var _state = this.state;
	    var lowerBound = _state.lowerBound;
	    var upperBound = _state.upperBound;
	
	    this.setState({ value: [lowerBound, upperBound] });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        null,
	        'LowerBound: '
	      ),
	      React.createElement('input', { type: 'number', value: this.state.lowerBound, onChange: this.onLowerBoundChange }),
	      React.createElement('br', null),
	      React.createElement(
	        'label',
	        null,
	        'UpperBound: '
	      ),
	      React.createElement('input', { type: 'number', value: this.state.upperBound, onChange: this.onUpperBoundChange }),
	      React.createElement('br', null),
	      React.createElement(
	        'button',
	        { onClick: this.handleApply },
	        'Apply'
	      ),
	      React.createElement('br', null),
	      React.createElement('br', null),
	      React.createElement(Slider, { range: true, allowCross: false, value: this.state.value, onChange: this.onSliderChange })
	    );
	  }
	});
	
	var DynamicBounds = React.createClass({
	  displayName: 'DynamicBounds',
	  getInitialState: function getInitialState() {
	    return {
	      min: 0,
	      max: 100
	    };
	  },
	  onSliderChange: function onSliderChange(value) {
	    log(value);
	  },
	  onMinChange: function onMinChange(e) {
	    this.setState({
	      min: +e.target.value || 0
	    });
	  },
	  onMaxChange: function onMaxChange(e) {
	    this.setState({
	      max: +e.target.value || 100
	    });
	  },
	  render: function render() {
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
	      React.createElement(Slider, { range: true, defaultValue: [20, 50], min: this.state.min, max: this.state.max,
	        onChange: this.onSliderChange
	      })
	    );
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
	      'Basic Range\uFF0C`allowCross=false`'
	    ),
	    React.createElement(Slider, { range: true, allowCross: false, defaultValue: [0, 20], onChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Range\uFF0C`step=20` '
	    ),
	    React.createElement(Slider, { range: true, step: 20, defaultValue: [20, 20], onBeforeChange: log })
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Basic Range\uFF0C`step=20, dots` '
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
	      'Multi Range'
	    ),
	    React.createElement(Slider, { range: 3, value: [20, 40, 60, 80] })
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
	  ),
	  React.createElement(
	    'div',
	    { style: style },
	    React.createElement(
	      'p',
	      null,
	      'Range with dynamic `max` `min`'
	    ),
	    React.createElement(DynamicBounds, null)
	  )
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=range.js.map