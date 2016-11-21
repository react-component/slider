webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(34);
	var Slider = __webpack_require__(180);
	
	var wrapperStyle = { width: 400, margin: 50 };
	
	var handleStyle = {
	  position: 'absolute',
	  transform: 'translate(-50%, -50%)',
	  cursor: 'pointer',
	  padding: '2px',
	  border: '2px solid #abe2fb',
	  borderRadius: '3px',
	  background: '#fff',
	  fontSize: '14px',
	  textAlign: 'center'
	};
	
	var CustomHandle = React.createClass({
	  displayName: 'CustomHandle',
	
	  propTypes: {
	    value: React.PropTypes.any,
	    offset: React.PropTypes.number
	  },
	  render: function render() {
	    var props = this.props;
	    var style = Object.assign({ left: props.offset + '%' }, handleStyle);
	    return React.createElement(
	      'div',
	      { style: style },
	      'val: ',
	      props.value
	    );
	  }
	});
	
	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'div',
	    { style: wrapperStyle },
	    React.createElement(
	      'p',
	      null,
	      'Default slider'
	    ),
	    React.createElement(Slider, { min: 0, max: 20, defaultValue: 3 })
	  ),
	  React.createElement(
	    'div',
	    { style: wrapperStyle },
	    React.createElement(
	      'p',
	      null,
	      'Slider with custom handle'
	    ),
	    React.createElement(Slider, { min: 0, max: 20, defaultValue: 3, handle: React.createElement(CustomHandle, null) })
	  )
	), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=custom-handles.js.map