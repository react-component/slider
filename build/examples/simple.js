webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	// use jsx to render html, do not modify simple.html
	__webpack_require__(4);
	var Slider = __webpack_require__(3);
	var React = __webpack_require__(2);
	// React.render(<Sliders marks={["一","二","三","四","五"]} index={3}/>, document.getElementById('__react-content'));
	// React.render(<Slider className='rc-slider' step={20}/>, document.getElementById('__react-content'));
	React.render(React.createElement(Slider, null), document.getElementById('__react-content'));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/slider/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/slider/assets/index.css", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/slider/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/slider/assets/index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	exports.push([module.id, ".rc-slider {\n  position: relative;\n  height: 4px;\n  width: 100%;\n  border-radius: 2px;\n  background-color: #e9e9e9;\n}\n.rc-slider-track {\n  position: absolute;\n  left: 0;\n  height: 4px;\n  border-radius: 2px;\n  background-color: #b2e9fd;\n  z-index: 1;\n}\n.rc-slider-handle {\n  position: absolute;\n  margin-left: -7px;\n  margin-top: -5px;\n  width: 10px;\n  height: 10px;\n  cursor: default;\n  border-radius: 50%;\n  border: solid 2px #d9d9d9;\n  background-color: #fff;\n  z-index: 2;\n}\n.rc-slider-handle:hover {\n  border-color: #999;\n}\n.rc-slider-handle-active {\n  border-color: #8cddfc;\n}\n.rc-slider-handle-active:active {\n  border-color: #2db7f5;\n  background-color: #2db7f5;\n  box-shadow: 0 0 0 5px rgba(45, 183, 245, 0.3);\n}\n.rc-slider-handle-active:hover {\n  border-color: #23c0fa;\n}\n.rc-slider-mark {\n  position: absolute;\n  top: 10px;\n  left: 0px;\n  width: 100%;\n  height: 20px;\n  font-size: 12px;\n  z-index: 3;\n}\n.rc-slider-mark-text {\n  position: absolute;\n  display: inline-block;\n  line-height: 1.5;\n  height: 20px;\n  vertical-align: middle;\n  text-align: center;\n  cursor: pointer;\n  color: #ccc;\n}\n.rc-slider-mark-text:first-child {\n  text-align: left;\n}\n.rc-slider-mark-text-active {\n  color: #999;\n}\n.rc-slider-step {\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  background: transparent;\n  z-index: 1;\n}\n.rc-slider-dot {\n  position: absolute;\n  top: -2px;\n  margin-left: -4px;\n  width: 4px;\n  height: 4px;\n  border: 2px solid #fff;\n  background-color: #bcbcbc;\n  cursor: pointer;\n  border-radius: 50%;\n  vertical-align: middle;\n}\n.rc-slider-dot:first-child {\n  margin-left: -2px;\n}\n.rc-slider-dot:last-child {\n  margin-left: -6px;\n}\n.rc-slider-dot-active {\n  background-color: #8cddfc;\n}\n.rc-slider-disabled {\n  background-color: #e7eaec;\n}\n.rc-slider-disabled .rc-slider-track {\n  background-color: #e7eaec;\n}\n.rc-slider-disabled .rc-slider-handle {\n  border-color: #e7eaec;\n  background-color: #fff;\n  cursor: not-allowed;\n}\n.rc-slider-disabled .rc-slider-mark-text,\n.rc-slider-disabled .dot {\n  cursor: not-allowed !important;\n}\n", ""]);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(2);
	var EventListener = __webpack_require__(9);

	function pauseEvent(e) {
	  if (e.stopPropagation) {
	    e.stopPropagation();
	  } 
	  if (e.preventDefault) {
	    e.preventDefault();
	  }
	  e.cancelBubble = true;
	  e.returnValue = false;
	  return false;
	}

	function prefixClsFn(prefixCls) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  return args.map(function(s) {
	    return prefixCls + '-' + s;
	  }).join(' ');
	}

	var Slider = React.createClass({displayName: "Slider",
	  propTypes: {
	    min: React.PropTypes.number,
	    max: React.PropTypes.number,
	    step: React.PropTypes.number,
	    value: React.PropTypes.number,
	    index: React.PropTypes.number,
	    marks: React.PropTypes.array,
	    className: React.PropTypes.string,
	    disabled: React.PropTypes.bool,
	    onBeforeChange: React.PropTypes.func,
	    onChange: React.PropTypes.func,
	    onAfterChange: React.PropTypes.func
	  },

	  getDefaultProps: function() {
	    return {
	      min: 0,
	      max: 100,
	      step: 1,
	      value: 0,
	      marks: [],
	      className: 'rc-slider',
	      disabled: false,
	      index: 0
	    };
	  },

	  getInitialState: function() {
	    var props = this.props;
	    var value = this._trimAlignValue(props.value);
	    var marksLen = props.marks.length;
	    if (marksLen > 0) {
	      value = ((props.max - props.min) / (marksLen - 1)) * (props.index);
	      value = value.toFixed(5);
	    }

	    return {
	      upperBound: 0,
	      sliderLength: 0,
	      value: value,
	      active: props.disabled ? '' : ((value > props.min || props.index > 0) ? 'active' : '')
	    };
	  },

	  componentWillReceiveProps: function(newProps) {
	    var value = newProps.value;
	    this.state.value = this._trimAlignValue(value, newProps);
	  },

	  componentDidMount: function() {
	    this._onHandleResizeListener = EventListener.listen(window, 'resize', this.handleResize);
	    this.handleResize();
	  },

	  componentWillUnmount: function() {
	    if (this._onHandleResizeListener) {
	      this._onHandleResizeListener.remove();
	    }
	  },

	  getValue: function() {
	    return this.state.value;
	  },

	  getIndex: function() {
	    var props = this.props;
	    if (props.marks.length === 0) { 
	      return;
	    }
	    var value = this.state.value;
	    var unit = (props.max - props.min) / (props.marks.length - 1);
	    return Math.floor(value / unit);
	  },

	  _trimAlignValue: function(val, props) {
	    props = props || this.props;

	    var step = props.marks.length > 0 ? (props.max - props.min) / (props.marks.length - 1) : props.step;

	    if (val <= props.min) {
	      val = props.min;
	    }
	    if (val >= props.max) {
	      val = props.max;
	    }

	    var valModStep = (val - props.min) % step;
	    var alignValue = val - valModStep;

	    if (Math.abs(valModStep) * 2 >= step) {
	      alignValue += (valModStep > 0) ? step : (-step);
	    }

	    return parseFloat(alignValue.toFixed(5));
	  },

	  _calcOffset: function(value) {
	    var ratio = (value - this.props.min) / (this.props.max - this.props.min);
	    return ratio * this.state.upperBound;
	  },

	  _calcValue: function(offset) {
	    var ratio = offset / this.state.upperBound;
	    return ratio * (this.props.max - this.props.min) + this.props.min;
	  },

	  _calValueByPos: function (position, callback) {
	    var pixelOffset = position - this.state.sliderStart;
	    // pixelOffset -= (this.state.handleSize / 2);

	    var nextValue = this._trimAlignValue(this._calcValue(pixelOffset));

	    this.setState({value: nextValue, active: 'active'}, callback);
	  },

	  _getMousePosition: function(e) {
	    return e.pageX || (e.clientX + document.documentElement.scrollLeft);
	  },

	  _triggerEvents: function(event) {
	    var props = this.props;
	    var hasMarks = props.marks && props.marks.length > 0;
	    if (props[event]) {
	      props[event](hasMarks ? this.getIndex() : this.state.value);
	    }
	  },

	  _addEventHandles: function() {
	    this._onMouseMoveListener = EventListener.listen(document, 'mousemove', this._onMouseMove);
	    this._onMouseUpListener = EventListener.listen(document, 'mouseup', this._onMouseUp);
	  },

	  _removeEventHandles: function () {
	    if (this._onMouseMoveListener) {
	      this._onMouseMoveListener.remove();
	    }

	    if (this._onMouseUpListener) {
	      this._onMouseUpListener.remove();
	    }
	  },

	  _start: function(position) {
	    if (document.activeElement) {
	      document.activeElement.blur();
	    }

	    this._triggerEvents('onBeforeChange');

	    this.setState({
	      startValue: this.state.value,
	      startPosition: position
	    });
	  },

	  _end: function() {
	    this._removeEventHandles();
	    this.setState(this._triggerEvents.bind(this, 'onAfterChange'));
	  },

	  _onMouseUp: function() {
	    this._end();
	  },

	  _onMouseMove: function(e) {
	    pauseEvent(e);
	    var position = this._getMousePosition(e);
	    var props = this.props;
	    var state = this.state;

	    var value = state.value;
	    var oldValue = value;

	    var diffPosition = position - state.startPosition;

	    var diffValue = diffPosition / (state.sliderLength) * (props.max - props.min);
	    var newValue = this._trimAlignValue(state.startValue + diffValue);

	    value = newValue;

	    if (newValue !== oldValue) {
	      this.setState({value: value, active: 'active'} ,this._triggerEvents.bind(this, 'onChange'));
	    }
	  },

	  handleResize: function() {
	    var slider = this.refs.slider.getDOMNode();
	    var rect = slider.getBoundingClientRect();

	    var sliderMin = rect.left;
	    var sliderMax = rect.right;
	    
	    this.setState({
	      upperBound: slider.clientWidth,
	      sliderLength: Math.abs(sliderMax - sliderMin),
	      sliderStart: sliderMin
	    });
	  },

	  handleMouseDown: function() {
	    return function(e)  {
	      if (this.props.disabled) {
	        return;
	      }
	      var position = this._getMousePosition(e);
	      this._start(position);
	      this._addEventHandles();
	      pauseEvent(e);
	    }.bind(this);
	  },

	  handleSliderMouseDown: function(e) {
	    if (this.props.disabled) {
	      return;
	    }
	    var position = this._getMousePosition(e);
	    this._calValueByPos(position, 
	      function()  {
	        this._triggerEvents('onChange');
	        this._start(position);
	        this._addEventHandles();
	      }.bind(this)
	    );
	    pauseEvent(e);
	  },

	  renderSteps: function() {
	    var props = this.props;
	    var marksLen = props.marks.length;
	    var stepNum = marksLen > 0 ? marksLen : Math.floor((props.max - props.min) / props.step) + 1;
	    var unit = this.state.sliderLength / (stepNum - 1);

	    var prefixCls = props.className;
	    var stepClassName = prefixClsFn(prefixCls, 'step');

	    var elements = [];
	    for (var i = 0; i < stepNum; i++) {
	      var offset = unit * i;
	      var style = {
	        left: offset.toFixed(5)
	      };
	      var className = prefixClsFn(prefixCls, 'dot');
	      if (i <= this.getIndex() || (this._calcValue(offset) <= this.getValue())) {
	        className = prefixClsFn(prefixCls, 'dot', 'dot-active');
	      }
	      elements[i] = (
	        React.createElement("span", {className: className, style: style, ref: 'step'+i})
	      );
	    }

	    return (
	      React.createElement("div", {className: stepClassName}, 
	        elements
	      )
	    );
	  },

	  renderMark: function(i) {
	    var marks = this.props.marks;
	    var marksLen = marks.length;
	    var unit = this.state.sliderLength / (marksLen - 1);
	    var offset = unit * i;

	    var style = {
	      width: (unit / 2).toFixed(5)
	    };

	    if (i === (marksLen - 1)) {
	      style.right = '0';
	      style.width = 'auto';
	    }else {
	      style.left = (i > 0 ? (offset - (unit / 4)).toFixed(5) : offset);
	    }

	    var prefixCls = this.props.className;
	    var className = prefixClsFn(prefixCls, 'mark-text');

	    if (i <= this.getIndex()) {
	      className = prefixClsFn(prefixCls, 'mark-text', 'mark-text-active');
	    }

	    return (
	      React.createElement("span", {className: className, style: style}, this.props.marks[i])
	    );
	  },

	  renderMarks: function() {
	    var marks = this.props.marks;
	    var marksLen = marks.length;
	    var elements = [];
	    for (var i = 0; i < marksLen; i++) {
	      elements[i] = this.renderMark(i);
	    }

	    var prefixCls = this.props.className;
	    var className = prefixClsFn(prefixCls, 'mark');

	    return (
	      React.createElement("div", {className: className, onMouseDown: this.handleSliderMouseDown}, 
	        elements
	      )
	    );
	  },

	  renderHandle: function(offset) {
	    var handleStyle = {
	      left: offset
	    };

	    var prefixCls = this.props.className;
	    var className = prefixClsFn(prefixCls, 'handle');

	    if (this.state.active) {
	      className =  prefixClsFn(prefixCls, 'handle', 'handle-active');
	    }

	    return (
	      React.createElement("a", {className: className, 
	        ref: "handle", 
	        style: handleStyle, 
	        href: "#", 
	        onMouseDown: this.handleMouseDown})
	    );
	  },

	  renderTrack: function(offset) {
	    var style = {
	      width: offset
	    };

	    var prefixCls = this.props.className;
	    var trackClassName = prefixClsFn(prefixCls, 'track');

	    return (
	      React.createElement("div", {className: trackClassName, ref: "track", style: style})
	    );
	  },

	  render: function() {
	    var state = this.state;
	    var props = this.props;

	    var value = state.value;
	    var offset = this._calcOffset(value);

	    var track = this.renderTrack(offset);
	    var handles = this.renderHandle(offset);
	    var steps = (props.step > 1 || props.marks.length > 0) ? this.renderSteps() : null;
	    var sliderMarks = (props.marks.length > 0) ? this.renderMarks() : null;

	    var prefixCls = props.className;
	    var sliderClassName = props.disabled ? prefixClsFn(prefixCls, 'disabled') : prefixCls;

	    return (
	      React.createElement("div", {className: sliderClassName, ref: "slider", onMouseDown: this.handleSliderMouseDown}, 
	        track, 
	        handles, 
	        steps, 
	        sliderMarks
	      )
	    );
	  }
	});

	module.exports = Slider;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * This file contains a modified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/EventListener.js
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * TODO: remove in favour of solution provided by:
	 *  https://github.com/facebook/react/issues/285
	 */

	/**
	 * Does not take into account specific nature of platform.
	 */
	'use strict';

	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  }
	};

	module.exports = EventListener;


/***/ }
]);