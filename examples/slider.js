webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(319);


/***/ },

/***/ 319:
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
	  onSliderChange: function onSliderChange(value) {
	    log(value);
	    this.setState({
	      value: value
	    });
	  },
	  onAfterChange: function onAfterChange(value) {
	    console.log(value);
	  },
	  render: function render() {
	    return React.createElement(Slider, { value: this.state.value,
	      onChange: this.onSliderChange, onAfterChange: this.onAfterChange
	    });
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
	      React.createElement(Slider, { defaultValue: 50, min: this.state.min, max: this.state.max,
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