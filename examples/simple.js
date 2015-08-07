webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var Slider = __webpack_require__(6);
	var React = __webpack_require__(9);
	
	function onChange(v) {
	  console.log(v);
	}
	
	// React.render(<Slider marks={["一","二","三","四","五"]} index={3}/>, document.getElementById('__react-content'));
	// React.render(<Slider className='rc-slider' step={20}/>, document.getElementById('__react-content'));
	React.render(React.createElement(
	  'div',
	  { style: { width: 400, margin: 100 } },
	  React.createElement(Slider, { onChange: onChange })
	), document.getElementById('__react-content'));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/slider/node_modules/rc-tools/node_modules/css-loader/index.js?sourceMap!/Users/yiminghe/code/react-components/slider/node_modules/rc-tools/node_modules/less-loader/index.js?sourceMap!/Users/yiminghe/code/react-components/slider/assets/index.less", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/slider/node_modules/rc-tools/node_modules/css-loader/index.js?sourceMap!/Users/yiminghe/code/react-components/slider/node_modules/rc-tools/node_modules/less-loader/index.js?sourceMap!/Users/yiminghe/code/react-components/slider/assets/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, "* {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n*:before,\n*:after {\n  box-sizing: border-box;\n}\n.rc-slider {\n  position: relative;\n  height: 4px;\n  width: 100%;\n  border-radius: 6px;\n  background-color: #e9e9e9;\n}\n.rc-slider-track {\n  position: absolute;\n  left: 0;\n  height: 4px;\n  border-radius: 6px;\n  background-color: #abe2fb;\n  z-index: 1;\n}\n.rc-slider-handle {\n  position: absolute;\n  margin-left: -7px;\n  margin-top: -5px;\n  width: 14px;\n  height: 14px;\n  cursor: pointer;\n  border-radius: 50%;\n  border: solid 2px #96dbfa;\n  background-color: #fff;\n  z-index: 2;\n}\n.rc-slider-handle:hover {\n  border-color: #57c5f7;\n}\n.rc-slider-handle-active:active {\n  border-color: #57c5f7;\n  box-shadow: 0 0 5px #57c5f7;\n}\n.rc-slider-mark {\n  position: absolute;\n  top: 10px;\n  left: 0;\n  width: 100%;\n  font-size: 12px;\n  z-index: 3;\n}\n.rc-slider-mark-text {\n  position: absolute;\n  display: inline-block;\n  vertical-align: middle;\n  text-align: center;\n  cursor: pointer;\n  color: #999;\n}\n.rc-slider-mark-text-active {\n  color: #666;\n}\n.rc-slider-step {\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  background: transparent;\n  z-index: 1;\n}\n.rc-slider-dot {\n  position: absolute;\n  top: -2px;\n  margin-left: -4px;\n  width: 8px;\n  height: 8px;\n  border: 2px solid #e9e9e9;\n  background-color: #fff;\n  cursor: pointer;\n  border-radius: 50%;\n  vertical-align: middle;\n}\n.rc-slider-dot:first-child {\n  margin-left: -4px;\n}\n.rc-slider-dot:last-child {\n  margin-left: -4px;\n}\n.rc-slider-dot-active {\n  border-color: #96dbfa;\n}\n.rc-slider-disabled {\n  background-color: #e9e9e9;\n}\n.rc-slider-disabled .rc-slider-track {\n  background-color: #cccccc;\n}\n.rc-slider-disabled .rc-slider-handle {\n  border-color: #cccccc;\n  background-color: #fff;\n  cursor: not-allowed;\n}\n.rc-slider-disabled .rc-slider-mark-text,\n.rc-slider-disabled .dot {\n  cursor: not-allowed !important;\n}\n.rc-slider-tooltip {\n  position: absolute;\n  left: -9999px;\n  top: -9999px;\n  z-index: 4;\n  visibility: visible;\n}\n.rc-slider-tooltip-hidden {\n  display: none;\n}\n.rc-slider-tooltip-placement-points-bc-tc {\n  padding: 4px 0 8px 0;\n}\n.rc-slider-tooltip-inner {\n  padding: 6px 0;\n  width: 24px;\n  height: 24px;\n  font-size: 12px;\n  line-height: 1;\n  color: #ffffff;\n  text-align: center;\n  text-decoration: none;\n  background-color: #6c6c6c;\n  border-radius: 6px;\n  box-shadow: 0 0 4px #d9d9d9;\n}\n.rc-slider-tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.rc-slider-tooltip-placement-points-bc-tc .rc-slider-tooltip-arrow {\n  bottom: 4px;\n  left: 50%;\n  margin-left: -4px;\n  border-width: 4px 4px 0;\n  border-top-color: #6c6c6c;\n}\n", "", {"version":3,"sources":["index.less"],"names":[],"mappings":"AAWA;EACE,sBAAA;EACA,6CAAA;;AAGF,CAAC;AACD,CAAC;EACC,sBAAA;;AAGF,CAAC;EACC,kBAAA;EACA,WAAA;EACA,WAAA;EACA,kBAAA;EACA,yBAAA;;AAEA,CAPD,SAOE;EACC,kBAAA;EACA,OAAA;EACA,WAAA;EACA,kBAAA;EACA,yBAAA;EACA,UAAA;;AAGF,CAhBD,SAgBE;EACC,kBAAA;EACA,iBAAA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,kBAAA;EACA,yBAAA;EACA,sBAAA;EACA,UAAA;;AAEA,CA5BH,SAgBE,OAYE;EACC,qBAAA;;AAGA,CAhCL,SAgBE,OAeE,OACE;EACC,qBAAA;EACA,2BAAA;;AAKN,CAvCD,SAuCE;EACC,kBAAA;EACA,SAAA;EACA,OAAA;EACA,WAAA;EACA,eAAA;EACA,UAAA;;AAGF,CAhDD,SAgDE;EACC,kBAAA;EACA,qBAAA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;EACA,WAAA;;AAEA,CAxDH,SAgDE,UAQE;EACC,WAAA;;AAIJ,CA7DD,SA6DE;EACC,kBAAA;EACA,WAAA;EACA,WAAA;EACA,uBAAA;EACA,UAAA;;AAGF,CArED,SAqEE;EACC,kBAAA;EACA,SAAA;EACA,iBAAA;EACA,UAAA;EACA,WAAA;EACA,yBAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;EACA,sBAAA;;AACA,CAhFH,SAqEE,IAWE;EACC,iBAAA;;AAEF,CAnFH,SAqEE,IAcE;EACC,iBAAA;;AAEF,CAtFH,SAqEE,IAiBE;EACC,qBAAA;;AAIJ,CA3FD,SA2FE;EACC,yBAAA;;AADF,CA3FD,SA2FE,SAGC,EAAC,SAAc;EACb,yBAAA;;AAJJ,CA3FD,SA2FE,SAOC,EAAC,SAAc;EACb,qBAAA;EACA,sBAAA;EACA,mBAAA;;AAVJ,CA3FD,SA2FE,SAaC,EAAC,SAAc;AAbjB,CA3FD,SA2FE,SAa4B;EACzB,mBAAA;;AAKJ,CA9GD,SA8GE;EACC,kBAAA;EACA,aAAA;EACA,YAAA;EACA,UAAA;EACA,mBAAA;;AAEA,CArHH,SA8GE,QAOE;EACC,aAAA;;AAGF,CAzHH,SA8GE,QAWE;EACC,oBAAA;;AAGF,CA7HH,SA8GE,QAeE;EACC,cAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,cAAA;EACA,cAAA;EACA,kBAAA;EACA,qBAAA;EACA,yBAAA;EACA,kBAAA;EACA,2BAAA;;AAGF,CA3IH,SA8GE,QA6BE;EACC,kBAAA;EACA,QAAA;EACA,SAAA;EACA,yBAAA;EACA,mBAAA;;AAGF,CAnJH,SA8GE,QAqCE,uBAAwB,EAnJ5B,SA8GE,QAqC2B;EACxB,WAAA;EACA,SAAA;EACA,iBAAA;EACA,uBAAA;EACA,yBAAA","sourcesContent":["@prefixClass: rc-slider;\n\n@disabledColor: #ccc;\n@border-radius-base: 6px;\n@primary-color: #2db7f5;\n@tooltip-color: #fff;\n@tooltip-bg: tint(#666, 4%);\n@tooltip-arrow-width: 4px;\n@tooltip-distance: @tooltip-arrow-width+4;\n@tooltip-arrow-color: @tooltip-bg;\n\n* {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); //  remove tap highlight color for mobile safari\n}\n\n*:before,\n*:after {\n  box-sizing: border-box;\n}\n\n.@{prefixClass} {\n  position: relative;\n  height: 4px;\n  width: 100%;\n  border-radius: @border-radius-base;\n  background-color: #e9e9e9;\n\n  &-track {\n    position: absolute;\n    left: 0;\n    height: 4px;\n    border-radius: @border-radius-base;\n    background-color: tint(@primary-color, 60%);\n    z-index: 1;\n  }\n\n  &-handle {\n    position: absolute;\n    margin-left: -7px;\n    margin-top: -5px;\n    width: 14px;\n    height: 14px;\n    cursor: pointer;\n    border-radius: 50%;\n    border: solid 2px tint(@primary-color, 50%);\n    background-color: #fff;\n    z-index: 2;\n\n    &:hover {\n      border-color: tint(@primary-color, 20%);\n    }\n    &-active {\n      &:active {\n        border-color: tint(@primary-color, 20%);\n        box-shadow: 0 0 5px tint(@primary-color, 20%);\n      }\n    }\n  }\n\n  &-mark {\n    position: absolute;\n    top: 10px;\n    left: 0;\n    width: 100%;\n    font-size: 12px;\n    z-index: 3;\n  }\n\n  &-mark-text {\n    position: absolute;\n    display: inline-block;\n    vertical-align: middle;\n    text-align: center;\n    cursor: pointer;\n    color: #999;\n\n    &-active {\n      color: #666;\n    }\n  }\n\n  &-step {\n    position: absolute;\n    width: 100%;\n    height: 4px;\n    background: transparent;\n    z-index: 1;\n  }\n\n  &-dot {\n    position: absolute;\n    top: -2px;\n    margin-left: -4px;\n    width: 8px;\n    height: 8px;\n    border: 2px solid #e9e9e9;\n    background-color: #fff;\n    cursor: pointer;\n    border-radius: 50%;\n    vertical-align: middle;\n    &:first-child {\n      margin-left: -4px;\n    }\n    &:last-child {\n      margin-left: -4px;\n    }\n    &-active {\n      border-color: tint(@primary-color, 50%);\n    }\n  }\n\n  &-disabled {\n    background-color: #e9e9e9;\n\n    .@{prefixClass}-track {\n      background-color: @disabledColor;\n    }\n\n    .@{prefixClass}-handle {\n      border-color: @disabledColor;\n      background-color: #fff;\n      cursor: not-allowed;\n    }\n\n    .@{prefixClass}-mark-text, .dot {\n      cursor: not-allowed!important;\n    }\n  }\n\n  // slider tooltip style\n  &-tooltip {\n    position: absolute;\n    left: -9999px;\n    top: -9999px;\n    z-index: 4;\n    visibility: visible;\n\n    &-hidden {\n      display: none;\n    }\n\n    &-placement-points-bc-tc {\n      padding: @tooltip-arrow-width 0 @tooltip-distance 0;\n    }\n\n    &-inner {\n      padding: 6px 0;\n      width: 24px;\n      height: 24px;\n      font-size: 12px;\n      line-height: 1;\n      color: @tooltip-color;\n      text-align: center;\n      text-decoration: none;\n      background-color: @tooltip-bg;\n      border-radius: @border-radius-base;\n      box-shadow: 0 0 4px #d9d9d9;\n    }\n\n    &-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-color: transparent;\n      border-style: solid;\n    }\n\n    &-placement-points-bc-tc &-arrow {\n      bottom: @tooltip-distance - @tooltip-arrow-width;\n      left: 50%;\n      margin-left: -@tooltip-arrow-width;\n      border-width: @tooltip-arrow-width @tooltip-arrow-width 0;\n      border-top-color: @tooltip-arrow-color;\n    }\n  }\n}"]}]);

/***/ },
/* 4 */
/***/ function(module, exports) {

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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(8);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcTooltip = __webpack_require__(10);
	
	var _rcTooltip2 = _interopRequireDefault(_rcTooltip);
	
	var _rcUtil = __webpack_require__(12);
	
	var _rcUtil2 = _interopRequireDefault(_rcUtil);
	
	function noop() {}
	
	function pauseEvent(e) {
	  e.cancelBubble = true;
	  e.returnValue = false;
	  if (e.stopPropagation) {
	    e.stopPropagation();
	  }
	  if (e.preventDefault) {
	    e.preventDefault();
	  }
	}
	
	function prefixClsFn(prefixCls) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return args.map(function (s) {
	    return prefixCls + '-' + s;
	  }).join(' ');
	}
	
	function getValueFromIndex(props) {
	  var value = undefined;
	  var marksLen = props.marks.length;
	  var index = undefined;
	  if ('index' in props) {
	    index = props.index;
	  } else {
	    index = props.defaultIndex;
	  }
	  if (marksLen > 0) {
	    value = (props.max - props.min) / (marksLen - 1) * index;
	    value = value.toFixed(5);
	  }
	  return value;
	}
	
	var Slider = _react2['default'].createClass({
	  displayName: 'Slider',
	
	  propTypes: {
	    min: _react2['default'].PropTypes.number,
	    max: _react2['default'].PropTypes.number,
	    step: _react2['default'].PropTypes.number,
	    defaultValue: _react2['default'].PropTypes.number,
	    defaultIndex: _react2['default'].PropTypes.number,
	    value: _react2['default'].PropTypes.number,
	    index: _react2['default'].PropTypes.number,
	    marks: _react2['default'].PropTypes.array,
	    isIncluded: _react2['default'].PropTypes.bool,
	    className: _react2['default'].PropTypes.string,
	    prefixCls: _react2['default'].PropTypes.string,
	    disabled: _react2['default'].PropTypes.bool,
	    children: _react2['default'].PropTypes.any,
	    onBeforeChange: _react2['default'].PropTypes.func,
	    onChange: _react2['default'].PropTypes.func,
	    onAfterChange: _react2['default'].PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      min: 0,
	      max: 100,
	      step: 1,
	      defaultValue: 0,
	      marks: [],
	      isIncluded: true,
	      className: '',
	      prefixCls: 'rc-slider',
	      disabled: false,
	      defaultIndex: 0
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var props = this.props;
	    var value = props.defaultValue;
	    if ('value' in props) {
	      value = props.value;
	    }
	    value = this._trimAlignValue(value);
	    var marksLen = props.marks.length;
	    if (marksLen > 0) {
	      value = getValueFromIndex(props);
	    }
	    return {
	      dragging: false,
	      showTooltip: false,
	      value: value
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if ('value' in nextProps) {
	      this.setState({
	        value: nextProps.value
	      });
	    } else if ('index' in nextProps) {
	      this.setState({
	        value: getValueFromIndex(nextProps)
	      });
	    }
	  },
	
	  onMouseUp: function onMouseUp() {
	    this._end('mouse');
	  },
	
	  onTouchUp: function onTouchUp() {
	    this._end('touch');
	  },
	
	  onMouseMove: function onMouseMove(e) {
	    var position = e.pageX;
	    this.onMove(e, position);
	  },
	
	  onTouchMove: function onTouchMove(e) {
	    if (e.touches.length > 1 || e.type === 'touchend' && e.touches.length > 0) {
	      this._end('touch');
	      return;
	    }
	
	    var position = this._getTouchPosition(e);
	
	    this.onMove(e, position);
	  },
	
	  onMove: function onMove(e, position) {
	    pauseEvent(e);
	    var props = this.props;
	    var state = this.state;
	
	    var value = state.value;
	    var oldValue = value;
	
	    var diffPosition = position - this.startPosition;
	
	    var diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);
	    value = this._trimAlignValue(this.startValue + diffValue);
	
	    if (value !== oldValue && !('value' in props) && !('index' in props)) {
	      this.setState({ value: value });
	    }
	    if (value !== oldValue) {
	      this._triggerEvents('onChange', value);
	    }
	  },
	
	  onTouchStart: function onTouchStart(e) {
	    if (e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0) {
	      return;
	    }
	
	    var position = this._getTouchPosition(e);
	    var value = this._calValueByPos(position);
	    this._triggerEvents('onChange', value);
	    this._start(position);
	    this._addDocumentEvents('touch');
	    pauseEvent(e);
	  },
	
	  onSliderMouseDown: function onSliderMouseDown(e) {
	    var position = e.pageX;
	    var value = this._calValueByPos(position);
	    this._triggerEvents('onChange', value);
	    this._start(position);
	    this._addDocumentEvents('mouse');
	    pauseEvent(e);
	  },
	
	  getIndex: function getIndex(v) {
	    var props = this.props;
	    var value = v === undefined ? this.state.value : v;
	
	    if (props.marks.length === 0) {
	      return Math.floor((value - props.min) / props.step);
	    }
	    var unit = ((props.max - props.min) / (props.marks.length - 1)).toFixed(5);
	    return Math.round(value / unit);
	  },
	
	  getSliderLength: function getSliderLength() {
	    var slider = this.refs.slider;
	    if (!slider) {
	      return 0;
	    }
	
	    return slider.getDOMNode().clientWidth;
	  },
	
	  getSliderStart: function getSliderStart() {
	    var slider = this.refs.slider.getDOMNode();
	    var rect = slider.getBoundingClientRect();
	
	    return rect.left;
	  },
	
	  renderSteps: function renderSteps() {
	    var props = this.props;
	    var marksLen = props.marks.length;
	    var stepNum = marksLen > 0 ? marksLen : Math.floor((props.max - props.min) / props.step) + 1;
	    var unit = 100 / (stepNum - 1);
	
	    var prefixCls = props.prefixCls;
	    var stepClassName = prefixClsFn(prefixCls, 'step');
	
	    var elements = [];
	    for (var i = 0; i < stepNum; i++) {
	      var offset = unit * i + '%';
	      var style = {
	        left: offset
	      };
	      var className = prefixClsFn(prefixCls, 'dot');
	      if (props.isIncluded) {
	        if (i <= this.getIndex()) {
	          className = prefixClsFn(prefixCls, 'dot', 'dot-active');
	        }
	      } else {
	        className = i === this.getIndex() ? prefixClsFn(prefixCls, 'dot', 'dot-active') : className;
	      }
	
	      elements[i] = _react2['default'].createElement('span', { className: className, style: style, ref: 'step' + i, key: 'step' + i });
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      { className: stepClassName },
	      elements
	    );
	  },
	
	  renderMark: function renderMark(i) {
	    var marks = this.props.marks;
	    var marksLen = marks.length;
	    var unit = 100 / (marksLen - 1);
	    var offset = unit * i;
	
	    var style = {
	      width: unit / 2 + '%'
	    };
	
	    if (i === marksLen - 1) {
	      style.right = -unit / 4 + '%';
	    } else {
	      style.left = i > 0 ? offset - unit / 4 + '%' : -unit / 4 + '%';
	    }
	
	    var prefixCls = this.props.prefixCls;
	    var className = prefixClsFn(prefixCls, 'mark-text');
	
	    if (this.props.isIncluded) {
	      if (i <= this.getIndex()) {
	        className = prefixClsFn(prefixCls, 'mark-text', 'mark-text-active');
	      }
	    } else {
	      className = i === this.getIndex() ? prefixClsFn(prefixCls, 'mark-text', 'mark-text-active') : className;
	    }
	
	    return _react2['default'].createElement(
	      'span',
	      { className: className, style: style, key: i },
	      this.props.marks[i]
	    );
	  },
	
	  renderMarks: function renderMarks() {
	    var marks = this.props.marks;
	    var marksLen = marks.length;
	    var elements = [];
	    for (var i = 0; i < marksLen; i++) {
	      elements[i] = this.renderMark(i);
	    }
	
	    var prefixCls = this.props.prefixCls;
	    var className = prefixClsFn(prefixCls, 'mark');
	
	    return _react2['default'].createElement(
	      'div',
	      { className: className },
	      elements
	    );
	  },
	
	  renderHandler: function renderHandler(offset) {
	    var onStyle = {
	      left: offset
	    };
	
	    var prefixCls = this.props.prefixCls;
	    var className = prefixClsFn(prefixCls, 'handle');
	
	    var events = {};
	
	    var tooltipVisible = undefined;
	
	    if (this.state.dragging) {
	      tooltipVisible = true;
	    } else {
	      events = {
	        onMouseEnter: this.showTooltip.bind(this, true),
	        onMouseLeave: this.showTooltip.bind(this, false)
	      };
	      tooltipVisible = this.state.showTooltip;
	    }
	
	    var handle = _react2['default'].createElement('div', _extends({ className: className
	    }, events, {
	      ref: 'handle',
	      style: onStyle }));
	
	    if (this.props.marks.length > 0) {
	      return handle;
	    }
	    return _react2['default'].createElement(
	      _rcTooltip2['default'],
	      {
	        placement: { points: ['bc', 'tc'] },
	        visible: tooltipVisible,
	        overlay: _react2['default'].createElement(
	          'span',
	          null,
	          this.state.value
	        ),
	        delay: 0,
	        prefixCls: prefixClsFn(prefixCls, 'tooltip') },
	      handle
	    );
	  },
	
	  renderTrack: function renderTrack(offset) {
	    var style = {
	      width: offset
	    };
	
	    var prefixCls = this.props.prefixCls;
	    var trackClassName = prefixClsFn(prefixCls, 'track');
	
	    return _react2['default'].createElement('div', { className: trackClassName, ref: 'track', style: style });
	  },
	
	  render: function render() {
	    var _sliderClassName;
	
	    var state = this.state;
	    var props = this.props;
	    var value = state.value;
	    var offset = this._calcOffset(value);
	    var track = this.props.isIncluded ? this.renderTrack(offset) : null;
	    var ons = this.renderHandler(offset);
	    var steps = props.step > 1 || props.marks.length > 0 ? this.renderSteps() : null;
	    var sliderMarks = props.marks.length > 0 ? this.renderMarks() : null;
	    var prefixCls = props.prefixCls;
	    var disabled = props.disabled;
	    var sliderClassName = (_sliderClassName = {}, _defineProperty(_sliderClassName, prefixCls, 1), _defineProperty(_sliderClassName, props.className, !!props.className), _defineProperty(_sliderClassName, prefixCls + '-disabled', disabled), _sliderClassName);
	
	    return _react2['default'].createElement(
	      'div',
	      { className: _rcUtil2['default'].classSet(sliderClassName), ref: 'slider',
	        onTouchStart: disabled ? noop : this.onTouchStart,
	        onMouseDown: disabled ? noop : this.onSliderMouseDown },
	      track,
	      ons,
	      steps,
	      sliderMarks,
	      this.props.children
	    );
	  },
	
	  showTooltip: function showTooltip(show) {
	    this.setState({
	      showTooltip: show
	    });
	  },
	
	  _trimAlignValue: function _trimAlignValue(v, propsArg) {
	    var val = v;
	    var props = propsArg || this.props;
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
	      alignValue += valModStep > 0 ? step : -step;
	    }
	
	    return parseFloat(alignValue.toFixed(5));
	  },
	
	  _calcOffset: function _calcOffset(value) {
	    var ratio = (value - this.props.min) / (this.props.max - this.props.min);
	    return ratio * 100 + '%';
	  },
	
	  _calcValue: function _calcValue(offset) {
	    var ratio = offset / this.getSliderLength();
	    return ratio * (this.props.max - this.props.min) + this.props.min;
	  },
	
	  _calValueByPos: function _calValueByPos(position) {
	    var pixelOffset = position - this.getSliderStart();
	    // pixelOffset -= (this.state.onSize / 2);
	    var nextValue = this._trimAlignValue(this._calcValue(pixelOffset));
	    this.setState({
	      value: nextValue
	    });
	    return nextValue;
	  },
	
	  _getTouchPosition: function _getTouchPosition(e) {
	    var touch = e.touches[0];
	    return touch.pageX;
	  },
	
	  _triggerEvents: function _triggerEvents(event, v) {
	    var props = this.props;
	    var hasMarks = props.marks && props.marks.length > 0;
	    if (props[event]) {
	      var data = undefined;
	      if (hasMarks) {
	        data = this.getIndex(v);
	      } else if (v === undefined) {
	        data = this.state.value;
	      } else {
	        data = v;
	      }
	      props[event](data);
	    }
	  },
	
	  _addDocumentEvents: function _addDocumentEvents(type) {
	    if (type === 'touch') {
	      // just work for chrome iOS Safari and Android Browser
	      this.onTouchMoveListener = _rcUtil.Dom.addEventListener(document, 'touchmove', this.onTouchMove);
	      this.onTouchUpListener = _rcUtil.Dom.addEventListener(document, 'touchend', this.onTouchUp);
	    } else if (type === 'mouse') {
	      this.onMouseMoveListener = _rcUtil.Dom.addEventListener(document, 'mousemove', this.onMouseMove);
	      this.onMouseUpListener = _rcUtil.Dom.addEventListener(document, 'mouseup', this.onMouseUp);
	    }
	  },
	
	  _removeEventons: function _removeEventons(type) {
	    if (type === 'touch') {
	      this.onTouchMoveListener.remove();
	      this.onTouchUpListener.remove();
	    } else if (type === 'mouse') {
	      this.onMouseMoveListener.remove();
	      this.onMouseUpListener.remove();
	    }
	  },
	
	  _start: function _start(position) {
	    this._triggerEvents('onBeforeChange');
	    this.startValue = this.state.value;
	    this.startPosition = position;
	    this.setState({
	      dragging: true
	    });
	  },
	
	  _end: function _end(type) {
	    this._removeEventons(type);
	    this._triggerEvents('onAfterChange');
	    this.setState({
	      dragging: false,
	      showTooltip: false
	    });
	  }
	});
	
	exports['default'] = Slider;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(11);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcUtil = __webpack_require__(12);
	
	var _rcUtil2 = _interopRequireDefault(_rcUtil);
	
	var _Popup = __webpack_require__(24);
	
	var _Popup2 = _interopRequireDefault(_Popup);
	
	var Tooltip = (function (_React$Component) {
	  _inherits(Tooltip, _React$Component);
	
	  function Tooltip(props) {
	    var _this = this;
	
	    _classCallCheck(this, Tooltip);
	
	    _get(Object.getPrototypeOf(Tooltip.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      visible: !!props.defaultVisible
	    };
	    if ('visible' in props) {
	      this.state.visible = !!props.visible;
	    }
	    ['onClick', 'onMouseEnter', 'onMouseDown', 'onTouchStart', 'onMouseLeave', 'onFocus', 'onBlur', 'onDocumentClick'].forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	  }
	
	  _createClass(Tooltip, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.componentDidUpdate();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if ('visible' in nextProps) {
	        this.setState({
	          visible: !!nextProps.visible
	        });
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (!this.popupRendered) {
	        return;
	      }
	      if (this.props.renderPopupToBody) {
	        this.popupInstance = _react2['default'].render(this.getPopupElement(), this.getTipContainer());
	      }
	      var props = this.props;
	      if (props.trigger.indexOf('click') !== -1) {
	        if (this.state.visible) {
	          if (!this.clickOutsideHandler) {
	            this.clickOutsideHandler = _rcUtil2['default'].Dom.addEventListener(document, 'mousedown', this.onDocumentClick);
	            this.touchOutsideHandler = _rcUtil2['default'].Dom.addEventListener(document, 'touchstart', this.onDocumentClick);
	          }
	          return;
	        }
	      }
	      if (this.clickOutsideHandler) {
	        this.clickOutsideHandler.remove();
	        this.touchOutsideHandler.remove();
	        this.clickOutsideHandler = null;
	        this.touchOutsideHandler = null;
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var tipContainer = this.tipContainer;
	      if (tipContainer) {
	        _react2['default'].unmountComponentAtNode(tipContainer);
	        document.body.removeChild(tipContainer);
	        this.tipContainer = null;
	      }
	      if (this.delayTimer) {
	        clearTimeout(this.delayTimer);
	        this.delayTimer = null;
	      }
	      if (this.clickOutsideHandler) {
	        this.clickOutsideHandler.remove();
	        this.touchOutsideHandler.remove();
	        this.clickOutsideHandler = null;
	        this.touchOutsideHandler = null;
	      }
	    }
	  }, {
	    key: 'onMouseEnter',
	    value: function onMouseEnter() {
	      this.delaySetVisible(true);
	    }
	  }, {
	    key: 'onMouseLeave',
	    value: function onMouseLeave() {
	      this.delaySetVisible(false);
	    }
	  }, {
	    key: 'onFocus',
	    value: function onFocus() {
	      this.focusTime = Date.now();
	      this.setVisible(true);
	    }
	  }, {
	    key: 'onMouseDown',
	    value: function onMouseDown() {
	      this.preClickTime = Date.now();
	    }
	  }, {
	    key: 'onTouchStart',
	    value: function onTouchStart() {
	      this.preTouchTime = Date.now();
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      this.setVisible(false);
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(e) {
	      // focus will trigger click
	      if (this.focusTime) {
	        var preTime = undefined;
	        if (this.preClickTime && this.preTouchTime) {
	          preTime = Math.min(this.preClickTime, this.preTouchTime);
	        } else if (this.preClickTime) {
	          preTime = this.preClickTime;
	        } else if (this.preTouchTime) {
	          preTime = this.preTouchTime;
	        }
	        if (Math.abs(preTime - this.focusTime) < 20) {
	          return;
	        }
	        this.focusTime = 0;
	      }
	      this.preClickTime = 0;
	      this.preTouchTime = 0;
	      e.preventDefault();
	      if (this.state.visible) {
	        this.setVisible(false);
	      } else {
	        this.setVisible(true);
	      }
	    }
	  }, {
	    key: 'onDocumentClick',
	    value: function onDocumentClick(e) {
	      var target = e.target;
	      var root = _react2['default'].findDOMNode(this);
	      var popupNode = this.getPopupDomNode();
	      if (!_rcUtil2['default'].Dom.contains(root, target) && !_rcUtil2['default'].Dom.contains(popupNode, target)) {
	        this.setVisible(false);
	      }
	    }
	  }, {
	    key: 'getPopupDomNode',
	    value: function getPopupDomNode() {
	      // for test
	      return this.refs.popup ? this.refs.popup.getPopupDomNode() : this.popupInstance.getPopupDomNode();
	    }
	  }, {
	    key: 'getTipContainer',
	    value: function getTipContainer() {
	      if (!this.tipContainer) {
	        this.tipContainer = document.createElement('div');
	        document.body.appendChild(this.tipContainer);
	      }
	      return this.tipContainer;
	    }
	  }, {
	    key: 'getPopupElement',
	    value: function getPopupElement() {
	      if (!this.popupRendered) {
	        return null;
	      }
	      var props = this.props;
	      var state = this.state;
	      var ref = {};
	      if (!props.renderPopupToBody) {
	        ref.ref = 'popup';
	      }
	      return _react2['default'].createElement(
	        _Popup2['default'],
	        _extends({ prefixCls: props.prefixCls
	        }, ref, {
	          visible: state.visible,
	          trigger: props.trigger,
	          placement: props.placement,
	          animation: props.animation,
	          wrap: this,
	          style: props.overlayStyle,
	          transitionName: props.transitionName }),
	        props.overlay
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.visible) {
	        this.popupRendered = true;
	      }
	      var props = this.props;
	      var children = props.children;
	      var child = _react2['default'].Children.only(children);
	      var childProps = child.props || {};
	      var newChildProps = {};
	      var trigger = props.trigger;
	      var mouseProps = {};
	      if (trigger.indexOf('click') !== -1) {
	        newChildProps.onClick = (0, _rcUtil.createChainedFunction)(this.onClick, childProps.onClick);
	        newChildProps.onMouseDown = (0, _rcUtil.createChainedFunction)(this.onMouseDown, childProps.onMouseDown);
	        newChildProps.onTouchStart = (0, _rcUtil.createChainedFunction)(this.onTouchStart, childProps.onTouchStart);
	      }
	      if (trigger.indexOf('hover') !== -1) {
	        mouseProps.onMouseEnter = (0, _rcUtil.createChainedFunction)(this.onMouseEnter, childProps.onMouseEnter);
	        mouseProps.onMouseLeave = (0, _rcUtil.createChainedFunction)(this.onMouseLeave, childProps.onMouseLeave);
	      }
	      if (trigger.indexOf('focus') !== -1) {
	        newChildProps.onFocus = (0, _rcUtil.createChainedFunction)(this.onFocus, childProps.onFocus);
	        newChildProps.onBlur = (0, _rcUtil.createChainedFunction)(this.onBlur, childProps.onBlur);
	      }
	
	      var popupElement = props.renderPopupToBody ? null : this.getPopupElement();
	      var className = props.prefixCls + '-wrap';
	
	      if (this.state.visible) {
	        className += ' ' + props.prefixCls + '-wrap-open';
	      }
	
	      return _react2['default'].createElement(
	        'span',
	        _extends({ className: className }, mouseProps, { style: props.wrapStyle }),
	        _rcUtil2['default'].Children.mapSelf([_react2['default'].cloneElement(child, newChildProps), popupElement])
	      );
	    }
	  }, {
	    key: 'setVisible',
	    value: function setVisible(visible) {
	      if (!('visible' in this.props)) {
	        this.setState({
	          visible: visible
	        });
	      }
	      this.props.onVisibleChange(visible);
	    }
	  }, {
	    key: 'delaySetVisible',
	    value: function delaySetVisible(visible) {
	      var _this2 = this;
	
	      var delay = this.props.delay * 1000;
	      if (delay) {
	        if (this.delayTimer) {
	          clearTimeout(this.delayTimer);
	        }
	        this.delayTimer = setTimeout(function () {
	          _this2.setVisible(visible);
	          _this2.delayTimer = null;
	        }, delay);
	      } else {
	        this.setVisible(visible);
	      }
	    }
	  }]);
	
	  return Tooltip;
	})(_react2['default'].Component);
	
	Tooltip.propTypes = {
	  trigger: _react2['default'].PropTypes.any,
	  placement: _react2['default'].PropTypes.any,
	  onVisibleChange: _react2['default'].PropTypes.func,
	  renderPopupToBody: _react2['default'].PropTypes.bool,
	  overlay: _react2['default'].PropTypes.node.isRequired,
	  overlayStyle: _react2['default'].PropTypes.object,
	  wrapStyle: _react2['default'].PropTypes.object,
	  delay: _react2['default'].PropTypes.number
	};
	
	Tooltip.defaultProps = {
	  prefixCls: 'rc-tooltip',
	  renderPopupToBody: true,
	  onVisibleChange: function onVisibleChange() {},
	  delay: 0.1,
	  overlayStyle: {},
	  wrapStyle: {},
	  placement: 'right',
	  trigger: ['hover']
	};
	
	exports['default'] = Tooltip;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  guid: __webpack_require__(13),
	  classSet: __webpack_require__(14),
	  joinClasses: __webpack_require__(15),
	  KeyCode: __webpack_require__(16),
	  PureRenderMixin: __webpack_require__(17),
	  shallowEqual: __webpack_require__(18),
	  createChainedFunction: __webpack_require__(19),
	  Dom: {
	    addEventListener: __webpack_require__(20),
	    contains: __webpack_require__(21)
	  },
	  Children: {
	    toArray: __webpack_require__(22),
	    mapSelf: __webpack_require__(23)
	  }
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	var seed = 0;
	module.exports = function () {
	  return Date.now() + '_' + (seed++);
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/cx.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames === 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}
	
	module.exports = cx;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/utils/joinClasses.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	"use strict";
	
	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	
	function joinClasses(className /*, ... */ ) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}
	
	module.exports = joinClasses;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * @ignore
	 * some key-codes definition and utils from closure-library
	 * @author yiminghe@gmail.com
	 */
	
	var KeyCode = {
	  /**
	   * MAC_ENTER
	   */
	  MAC_ENTER: 3,
	  /**
	   * BACKSPACE
	   */
	  BACKSPACE: 8,
	  /**
	   * TAB
	   */
	  TAB: 9,
	  /**
	   * NUMLOCK on FF/Safari Mac
	   */
	  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
	  /**
	   * ENTER
	   */
	  ENTER: 13,
	  /**
	   * SHIFT
	   */
	  SHIFT: 16,
	  /**
	   * CTRL
	   */
	  CTRL: 17,
	  /**
	   * ALT
	   */
	  ALT: 18,
	  /**
	   * PAUSE
	   */
	  PAUSE: 19,
	  /**
	   * CAPS_LOCK
	   */
	  CAPS_LOCK: 20,
	  /**
	   * ESC
	   */
	  ESC: 27,
	  /**
	   * SPACE
	   */
	  SPACE: 32,
	  /**
	   * PAGE_UP
	   */
	  PAGE_UP: 33, // also NUM_NORTH_EAST
	  /**
	   * PAGE_DOWN
	   */
	  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
	  /**
	   * END
	   */
	  END: 35, // also NUM_SOUTH_WEST
	  /**
	   * HOME
	   */
	  HOME: 36, // also NUM_NORTH_WEST
	  /**
	   * LEFT
	   */
	  LEFT: 37, // also NUM_WEST
	  /**
	   * UP
	   */
	  UP: 38, // also NUM_NORTH
	  /**
	   * RIGHT
	   */
	  RIGHT: 39, // also NUM_EAST
	  /**
	   * DOWN
	   */
	  DOWN: 40, // also NUM_SOUTH
	  /**
	   * PRINT_SCREEN
	   */
	  PRINT_SCREEN: 44,
	  /**
	   * INSERT
	   */
	  INSERT: 45, // also NUM_INSERT
	  /**
	   * DELETE
	   */
	  DELETE: 46, // also NUM_DELETE
	  /**
	   * ZERO
	   */
	  ZERO: 48,
	  /**
	   * ONE
	   */
	  ONE: 49,
	  /**
	   * TWO
	   */
	  TWO: 50,
	  /**
	   * THREE
	   */
	  THREE: 51,
	  /**
	   * FOUR
	   */
	  FOUR: 52,
	  /**
	   * FIVE
	   */
	  FIVE: 53,
	  /**
	   * SIX
	   */
	  SIX: 54,
	  /**
	   * SEVEN
	   */
	  SEVEN: 55,
	  /**
	   * EIGHT
	   */
	  EIGHT: 56,
	  /**
	   * NINE
	   */
	  NINE: 57,
	  /**
	   * QUESTION_MARK
	   */
	  QUESTION_MARK: 63, // needs localization
	  /**
	   * A
	   */
	  A: 65,
	  /**
	   * B
	   */
	  B: 66,
	  /**
	   * C
	   */
	  C: 67,
	  /**
	   * D
	   */
	  D: 68,
	  /**
	   * E
	   */
	  E: 69,
	  /**
	   * F
	   */
	  F: 70,
	  /**
	   * G
	   */
	  G: 71,
	  /**
	   * H
	   */
	  H: 72,
	  /**
	   * I
	   */
	  I: 73,
	  /**
	   * J
	   */
	  J: 74,
	  /**
	   * K
	   */
	  K: 75,
	  /**
	   * L
	   */
	  L: 76,
	  /**
	   * M
	   */
	  M: 77,
	  /**
	   * N
	   */
	  N: 78,
	  /**
	   * O
	   */
	  O: 79,
	  /**
	   * P
	   */
	  P: 80,
	  /**
	   * Q
	   */
	  Q: 81,
	  /**
	   * R
	   */
	  R: 82,
	  /**
	   * S
	   */
	  S: 83,
	  /**
	   * T
	   */
	  T: 84,
	  /**
	   * U
	   */
	  U: 85,
	  /**
	   * V
	   */
	  V: 86,
	  /**
	   * W
	   */
	  W: 87,
	  /**
	   * X
	   */
	  X: 88,
	  /**
	   * Y
	   */
	  Y: 89,
	  /**
	   * Z
	   */
	  Z: 90,
	  /**
	   * META
	   */
	  META: 91, // WIN_KEY_LEFT
	  /**
	   * WIN_KEY_RIGHT
	   */
	  WIN_KEY_RIGHT: 92,
	  /**
	   * CONTEXT_MENU
	   */
	  CONTEXT_MENU: 93,
	  /**
	   * NUM_ZERO
	   */
	  NUM_ZERO: 96,
	  /**
	   * NUM_ONE
	   */
	  NUM_ONE: 97,
	  /**
	   * NUM_TWO
	   */
	  NUM_TWO: 98,
	  /**
	   * NUM_THREE
	   */
	  NUM_THREE: 99,
	  /**
	   * NUM_FOUR
	   */
	  NUM_FOUR: 100,
	  /**
	   * NUM_FIVE
	   */
	  NUM_FIVE: 101,
	  /**
	   * NUM_SIX
	   */
	  NUM_SIX: 102,
	  /**
	   * NUM_SEVEN
	   */
	  NUM_SEVEN: 103,
	  /**
	   * NUM_EIGHT
	   */
	  NUM_EIGHT: 104,
	  /**
	   * NUM_NINE
	   */
	  NUM_NINE: 105,
	  /**
	   * NUM_MULTIPLY
	   */
	  NUM_MULTIPLY: 106,
	  /**
	   * NUM_PLUS
	   */
	  NUM_PLUS: 107,
	  /**
	   * NUM_MINUS
	   */
	  NUM_MINUS: 109,
	  /**
	   * NUM_PERIOD
	   */
	  NUM_PERIOD: 110,
	  /**
	   * NUM_DIVISION
	   */
	  NUM_DIVISION: 111,
	  /**
	   * F1
	   */
	  F1: 112,
	  /**
	   * F2
	   */
	  F2: 113,
	  /**
	   * F3
	   */
	  F3: 114,
	  /**
	   * F4
	   */
	  F4: 115,
	  /**
	   * F5
	   */
	  F5: 116,
	  /**
	   * F6
	   */
	  F6: 117,
	  /**
	   * F7
	   */
	  F7: 118,
	  /**
	   * F8
	   */
	  F8: 119,
	  /**
	   * F9
	   */
	  F9: 120,
	  /**
	   * F10
	   */
	  F10: 121,
	  /**
	   * F11
	   */
	  F11: 122,
	  /**
	   * F12
	   */
	  F12: 123,
	  /**
	   * NUMLOCK
	   */
	  NUMLOCK: 144,
	  /**
	   * SEMICOLON
	   */
	  SEMICOLON: 186, // needs localization
	  /**
	   * DASH
	   */
	  DASH: 189, // needs localization
	  /**
	   * EQUALS
	   */
	  EQUALS: 187, // needs localization
	  /**
	   * COMMA
	   */
	  COMMA: 188, // needs localization
	  /**
	   * PERIOD
	   */
	  PERIOD: 190, // needs localization
	  /**
	   * SLASH
	   */
	  SLASH: 191, // needs localization
	  /**
	   * APOSTROPHE
	   */
	  APOSTROPHE: 192, // needs localization
	  /**
	   * SINGLE_QUOTE
	   */
	  SINGLE_QUOTE: 222, // needs localization
	  /**
	   * OPEN_SQUARE_BRACKET
	   */
	  OPEN_SQUARE_BRACKET: 219, // needs localization
	  /**
	   * BACKSLASH
	   */
	  BACKSLASH: 220, // needs localization
	  /**
	   * CLOSE_SQUARE_BRACKET
	   */
	  CLOSE_SQUARE_BRACKET: 221, // needs localization
	  /**
	   * WIN_KEY
	   */
	  WIN_KEY: 224,
	  /**
	   * MAC_FF_META
	   */
	  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
	  /**
	   * WIN_IME
	   */
	  WIN_IME: 229
	};
	
	/*
	 whether text and modified key is entered at the same time.
	 */
	KeyCode.isTextModifyingKeyEvent = function (e) {
	  var keyCode = e.keyCode;
	  if (e.altKey && !e.ctrlKey || e.metaKey ||
	      // Function keys don't generate text
	    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
	    return false;
	  }
	
	  // The following keys are quite harmless, even in combination with
	  // CTRL, ALT or SHIFT.
	  switch (keyCode) {
	    case KeyCode.ALT:
	    case KeyCode.CAPS_LOCK:
	    case KeyCode.CONTEXT_MENU:
	    case KeyCode.CTRL:
	    case KeyCode.DOWN:
	    case KeyCode.END:
	    case KeyCode.ESC:
	    case KeyCode.HOME:
	    case KeyCode.INSERT:
	    case KeyCode.LEFT:
	    case KeyCode.MAC_FF_META:
	    case KeyCode.META:
	    case KeyCode.NUMLOCK:
	    case KeyCode.NUM_CENTER:
	    case KeyCode.PAGE_DOWN:
	    case KeyCode.PAGE_UP:
	    case KeyCode.PAUSE:
	    case KeyCode.PRINT_SCREEN:
	    case KeyCode.RIGHT:
	    case KeyCode.SHIFT:
	    case KeyCode.UP:
	    case KeyCode.WIN_KEY:
	    case KeyCode.WIN_KEY_RIGHT:
	      return false;
	    default:
	      return true;
	  }
	};
	
	/*
	 whether character is entered.
	 */
	KeyCode.isCharacterKey = function (keyCode) {
	  if (keyCode >= KeyCode.ZERO &&
	    keyCode <= KeyCode.NINE) {
	    return true;
	  }
	
	  if (keyCode >= KeyCode.NUM_ZERO &&
	    keyCode <= KeyCode.NUM_MULTIPLY) {
	    return true;
	  }
	
	  if (keyCode >= KeyCode.A &&
	    keyCode <= KeyCode.Z) {
	    return true;
	  }
	
	  // Safari sends zero key code for non-latin characters.
	  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
	    return true;
	  }
	
	  switch (keyCode) {
	    case KeyCode.SPACE:
	    case KeyCode.QUESTION_MARK:
	    case KeyCode.NUM_PLUS:
	    case KeyCode.NUM_MINUS:
	    case KeyCode.NUM_PERIOD:
	    case KeyCode.NUM_DIVISION:
	    case KeyCode.SEMICOLON:
	    case KeyCode.DASH:
	    case KeyCode.EQUALS:
	    case KeyCode.COMMA:
	    case KeyCode.PERIOD:
	    case KeyCode.SLASH:
	    case KeyCode.APOSTROPHE:
	    case KeyCode.SINGLE_QUOTE:
	    case KeyCode.OPEN_SQUARE_BRACKET:
	    case KeyCode.BACKSLASH:
	    case KeyCode.CLOSE_SQUARE_BRACKET:
	      return true;
	    default:
	      return false;
	  }
	};
	
	module.exports = KeyCode;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/
	
	"use strict";
	
	var shallowEqual = __webpack_require__(18);
	
	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	           !shallowEqual(this.state, nextState);
	  }
	};
	
	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */
	
	"use strict";
	
	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = shallowEqual;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @returns {function|null}
	 */
	function createChainedFunction() {
	  var args = arguments;
	
	  return function chainedFunction() {
	    for (var i = 0; i < args.length; i++) {
	      if (args[i] && args[i].apply) {
	        args[i].apply(this, arguments);
	      }
	    }
	  };
	}
	
	module.exports = createChainedFunction;


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function (target, eventType, callback) {
	  if (target.addEventListener) {
	    target.addEventListener(eventType, callback, false);
	    return {
	      remove: function () {
	        target.removeEventListener(eventType, callback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, callback);
	    return {
	      remove: function () {
	        target.detachEvent('on' + eventType, callback);
	      }
	    };
	  }
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function (root, node) {
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	
	  return false;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(9);
	
	module.exports = function (children) {
	  var ret = [];
	  React.Children.forEach(children, function (c) {
	    ret.push(c);
	  });
	  return ret;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(9);
	
	function mirror(o) {
	  return o;
	}
	
	module.exports = function (children) {
	  // return ReactFragment
	  return React.Children.map(children, mirror);
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(25);
	
	var _rcAlign = __webpack_require__(26);
	
	var _rcAlign2 = _interopRequireDefault(_rcAlign);
	
	var _rcAnimate = __webpack_require__(30);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var placementAlignMap = {
	  left: { points: ['cr', 'cl'] },
	  right: { points: ['cl', 'cr'] },
	  top: { points: ['bc', 'tc'] },
	  bottom: { points: ['tc', 'bc'] }
	};
	
	var Popup = _react2['default'].createClass({
	  displayName: 'Popup',
	
	  propTypes: {
	    visible: _react2['default'].PropTypes.bool,
	    wrap: _react2['default'].PropTypes.object,
	    style: _react2['default'].PropTypes.object
	  },
	
	  // optimize for speed
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return this.props.visible || nextProps.visible;
	  },
	
	  onAlign: function onAlign(popupDomNode, align) {
	    var props = this.props;
	    var placement = props.placement;
	    if (placement && placement.points) {
	      var originalClassName = (0, _utils.getToolTipClassByPlacement)(props.prefixCls, placement);
	      var nextClassName = (0, _utils.getToolTipClassByPlacement)(props.prefixCls, align);
	      if (nextClassName !== originalClassName) {
	        popupDomNode.className = popupDomNode.className.replace(originalClassName, nextClassName);
	      }
	    }
	  },
	
	  getPopupDomNode: function getPopupDomNode() {
	    return _react2['default'].findDOMNode(this);
	  },
	
	  getTarget: function getTarget() {
	    return _react2['default'].findDOMNode(this.props.wrap).firstChild;
	  },
	
	  getTransitionName: function getTransitionName() {
	    var props = this.props;
	    var transitionName = props.transitionName;
	    if (!transitionName && props.animation) {
	      transitionName = props.prefixCls + '-' + props.animation;
	    }
	    return transitionName;
	  },
	
	  render: function render() {
	    var props = this.props;
	    var className = (0, _utils.getToolTipClassByPlacement)(props.prefixCls, props.placement);
	    if (props.className) {
	      className += ' ' + props.className;
	    }
	    var style = this.props.style;
	    if (!props.visible) {
	      className += ' ' + props.prefixCls + '-hidden';
	    }
	    var arrowClassName = props.prefixCls + '-arrow';
	    var innerClassname = props.prefixCls + '-inner';
	
	    var placement = props.placement;
	    var align = undefined;
	    if (placement && placement.points) {
	      align = placement;
	    } else {
	      align = placementAlignMap[placement];
	    }
	
	    return _react2['default'].createElement(
	      _rcAnimate2['default'],
	      { component: '',
	        exclusive: true,
	        animateMount: true,
	        transitionName: this.getTransitionName(),
	        showProp: 'data-visible' },
	      _react2['default'].createElement(
	        _rcAlign2['default'],
	        { target: this.getTarget,
	          key: 'popup',
	          'data-visible': props.visible,
	          disabled: !props.visible,
	          align: align,
	          onAlign: this.onAlign },
	        _react2['default'].createElement(
	          'div',
	          { className: className,
	            style: style },
	          _react2['default'].createElement('div', { className: arrowClassName }),
	          _react2['default'].createElement(
	            'div',
	            { className: innerClassname },
	            props.children
	          )
	        )
	      )
	    );
	  }
	});
	
	exports['default'] = Popup;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getToolTipClassByPlacement = getToolTipClassByPlacement;
	
	function getToolTipClassByPlacement(prefixCls, placement) {
	  if (typeof placement === 'string') {
	    return prefixCls + ' ' + prefixCls + '-placement-' + placement;
	  }
	  var offset = placement.offset || [0, 0];
	  var offsetClass = '';
	  if (offset && offset.length) {
	    offsetClass = prefixCls + '-placement-offset-x-' + offset[0] + ' ' + prefixCls + '-placement-offset-y-' + offset[1];
	  }
	  var points = placement.points;
	  return prefixCls + ' ' + offsetClass + ' ' + prefixCls + '-placement-points-' + points[0] + '-' + points[1];
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// export this package's api
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Align = __webpack_require__(27);
	
	var _Align2 = _interopRequireDefault(_Align);
	
	exports['default'] = _Align2['default'];
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _domAlign = __webpack_require__(28);
	
	var _domAlign2 = _interopRequireDefault(_domAlign);
	
	var _rcUtil = __webpack_require__(12);
	
	var _rcUtil2 = _interopRequireDefault(_rcUtil);
	
	function isWindow(obj) {
	  /*eslint-disable eqeqeq */
	  return obj != null && obj == obj.window;
	  /*eslint-enable eqeqeq */
	}
	
	function buffer(fn, ms) {
	  var timer;
	  return function () {
	    if (timer) {
	      clearTimeout(timer);
	    }
	    timer = setTimeout(fn, ms);
	  };
	}
	
	var Align = (function (_React$Component) {
	  _inherits(Align, _React$Component);
	
	  function Align(props) {
	    _classCallCheck(this, Align);
	
	    _get(Object.getPrototypeOf(Align.prototype), 'constructor', this).apply(this, arguments);
	    this.handleWindowResize = this.handleWindowResize.bind(this);
	  }
	
	  _createClass(Align, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      var props = this.props;
	      // parent ref not attached ....
	      if (!props.disabled) {
	        this.hackRefTimer = setTimeout(function () {
	          var source = _react2['default'].findDOMNode(_this);
	          props.onAlign(source, (0, _domAlign2['default'])(source, props.target(), props.align));
	        }, 0);
	        if (props.monitorWindowResize) {
	          this.startMonitorWindowResize();
	        }
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      this.clearHackRefTimer();
	    }
	  }, {
	    key: 'startMonitorWindowResize',
	    value: function startMonitorWindowResize() {
	      if (!this.resizeHandler) {
	        this.resizeHandler = _rcUtil2['default'].Dom.addEventListener(window, 'resize', buffer(this.handleWindowResize, this.props.monitorBufferTime));
	      }
	    }
	  }, {
	    key: 'stopMonitorWindowResize',
	    value: function stopMonitorWindowResize() {
	      if (this.resizeHandler) {
	        this.resizeHandler.remove();
	        this.resizeHandler = null;
	      }
	    }
	  }, {
	    key: 'clearHackRefTimer',
	    value: function clearHackRefTimer() {
	      if (this.hackRefTimer) {
	        clearTimeout(this.hackRefTimer);
	        this.hackRefTimer = null;
	      }
	    }
	  }, {
	    key: 'handleWindowResize',
	    value: function handleWindowResize() {
	      var props = this.props;
	      if (!props.disabled) {
	        var source = _react2['default'].findDOMNode(this);
	        props.onAlign(source, (0, _domAlign2['default'])(source, props.target(), props.align));
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.stopMonitorWindowResize();
	      this.clearHackRefTimer();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var _this2 = this;
	
	      var reAlign = false;
	      var props = this.props;
	      var currentTarget;
	
	      this.hackRefTimer = setTimeout(function () {
	        if (!props.disabled) {
	          if (prevProps.disabled || prevProps.align !== props.align) {
	            reAlign = true;
	            currentTarget = props.target();
	          } else {
	            var lastTarget = prevProps.target();
	            currentTarget = props.target();
	            if (isWindow(lastTarget) && isWindow(currentTarget)) {
	              reAlign = false;
	            } else if (lastTarget !== currentTarget) {
	              reAlign = true;
	            }
	          }
	        }
	
	        if (reAlign) {
	          var source = _react2['default'].findDOMNode(_this2);
	          props.onAlign(source, (0, _domAlign2['default'])(source, currentTarget, props.align));
	        }
	      }, 0);
	
	      if (props.monitorWindowResize && !props.disabled) {
	        this.startMonitorWindowResize();
	      } else {
	        this.stopMonitorWindowResize();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].Children.only(this.props.children);
	    }
	  }]);
	
	  return Align;
	})(_react2['default'].Component);
	
	Align.defaultProps = {
	  target: function target() {
	    return window;
	  },
	  onAlign: function onAlign() {},
	  monitorBufferTime: 50,
	  monitorWindowResize: false,
	  disabled: false
	};
	
	Align.PropTypes = {
	  align: _react2['default'].PropTypes.object.isRequired,
	  target: _react2['default'].PropTypes.func,
	  onAlign: _react2['default'].PropTypes.func,
	  monitorBufferTime: _react2['default'].PropTypes.number,
	  monitorWindowResize: _react2['default'].PropTypes.bool,
	  disabled: _react2['default'].PropTypes.bool
	};
	
	exports['default'] = Align;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * align dom node flexibly
	 * @author yiminghe@gmail.com
	 */
	
	'use strict';
	
	var utils = __webpack_require__(29);
	
	// http://yiminghe.iteye.com/blog/1124720
	
	/**
	 * 获取 node 上的 align 对齐点 相对于页面的坐标
	 */
	
	function getAlignOffset(region, align) {
	  var V = align.charAt(0),
	      H = align.charAt(1),
	      w = region.width,
	      h = region.height,
	      x,
	      y;
	
	  x = region.left;
	  y = region.top;
	
	  if (V === 'c') {
	    y += h / 2;
	  } else if (V === 'b') {
	    y += h;
	  }
	
	  if (H === 'c') {
	    x += w / 2;
	  } else if (H === 'r') {
	    x += w;
	  }
	
	  return {
	    left: x,
	    top: y
	  };
	}
	
	/**
	 * 得到会导致元素显示不全的祖先元素
	 */
	
	function getOffsetParent(element) {
	  // ie 这个也不是完全可行
	  /*
	   <div style="width: 50px;height: 100px;overflow: hidden">
	   <div style="width: 50px;height: 100px;position: relative;" id="d6">
	   元素 6 高 100px 宽 50px<br/>
	   </div>
	   </div>
	   */
	  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
	  //  In other browsers it only includes elements with position absolute, relative or
	  // fixed, not elements with overflow set to auto or scroll.
	  //        if (UA.ie && ieMode < 8) {
	  //            return element.offsetParent;
	  //        }
	  // 统一的 offsetParent 方法
	  var doc = element.ownerDocument,
	      body = doc.body,
	      parent,
	      positionStyle = utils.css(element, 'position'),
	      skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';
	
	  if (!skipStatic) {
	    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
	  }
	
	  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
	    positionStyle = utils.css(parent, 'position');
	    if (positionStyle !== 'static') {
	      return parent;
	    }
	  }
	  return null;
	}
	
	/**
	 * 获得元素的显示部分的区域
	 */
	
	function getVisibleRectForElement(element) {
	  var visibleRect = {
	    left: 0,
	    right: Infinity,
	    top: 0,
	    bottom: Infinity
	  },
	      el = element,
	      scrollX,
	      scrollY,
	      winSize,
	      doc = element.ownerDocument,
	      win = doc.defaultView || doc.parentWindow,
	      body = doc.body,
	      documentElement = doc.documentElement;
	
	  // Determine the size of the visible rect by climbing the dom accounting for
	  // all scrollable containers.
	  while (el) {
	    // clientWidth is zero for inline block elements in ie.
	    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) && (el !== body && el !== documentElement && utils.css(el, 'overflow') !== 'visible')) {
	      var pos = utils.offset(el);
	      // add border
	      pos.left += el.clientLeft;
	      pos.top += el.clientTop;
	      visibleRect.top = Math.max(visibleRect.top, pos.top);
	      visibleRect.right = Math.min(visibleRect.right,
	      // consider area without scrollBar
	      pos.left + el.clientWidth);
	      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
	      visibleRect.left = Math.max(visibleRect.left, pos.left);
	    } else if (el === body || el === documentElement) {
	      break;
	    }
	    el = getOffsetParent(el);
	  }
	
	  // Clip by window's viewport.
	  scrollX = utils.getWindowScrollLeft(win);
	  scrollY = utils.getWindowScrollTop(win);
	  visibleRect.left = Math.max(visibleRect.left, scrollX);
	  visibleRect.top = Math.max(visibleRect.top, scrollY);
	  winSize = {
	    width: utils.viewportWidth(win),
	    height: utils.viewportHeight(win)
	  };
	  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
	  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
	  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
	}
	
	function getElFuturePos(elRegion, refNodeRegion, points, offset) {
	  var xy, diff, p1, p2;
	
	  xy = {
	    left: elRegion.left,
	    top: elRegion.top
	  };
	
	  p1 = getAlignOffset(refNodeRegion, points[1]);
	  p2 = getAlignOffset(elRegion, points[0]);
	
	  diff = [p2.left - p1.left, p2.top - p1.top];
	
	  return {
	    left: xy.left - diff[0] + +offset[0],
	    top: xy.top - diff[1] + +offset[1]
	  };
	}
	
	function isFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
	}
	
	function isFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
	}
	
	function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
	  var pos = utils.clone(elFuturePos),
	      size = {
	    width: elRegion.width,
	    height: elRegion.height
	  };
	
	  if (overflow.adjustX && pos.left < visibleRect.left) {
	    pos.left = visibleRect.left;
	  }
	
	  // Left edge inside and right edge outside viewport, try to resize it.
	  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
	    size.width -= pos.left + size.width - visibleRect.right;
	  }
	
	  // Right edge outside viewport, try to move it.
	  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
	    // 保证左边界和可视区域左边界对齐
	    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
	  }
	
	  // Top edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top < visibleRect.top) {
	    pos.top = visibleRect.top;
	  }
	
	  // Top edge inside and bottom edge outside viewport, try to resize it.
	  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
	    size.height -= pos.top + size.height - visibleRect.bottom;
	  }
	
	  // Bottom edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
	    // 保证上边界和可视区域上边界对齐
	    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
	  }
	
	  return utils.mix(pos, size);
	}
	
	function flip(points, reg, map) {
	  var ret = [];
	  utils.each(points, function (p) {
	    ret.push(p.replace(reg, function (m) {
	      return map[m];
	    }));
	  });
	  return ret;
	}
	
	function flipOffset(offset, index) {
	  offset[index] = -offset[index];
	  return offset;
	}
	
	function getRegion(node) {
	  var offset, w, h;
	  if (!utils.isWindow(node) && node.nodeType !== 9) {
	    offset = utils.offset(node);
	    w = utils.outerWidth(node);
	    h = utils.outerHeight(node);
	  } else {
	    var win = utils.getWindow(node);
	    offset = {
	      left: utils.getWindowScrollLeft(win),
	      top: utils.getWindowScrollTop(win)
	    };
	    w = utils.viewportWidth(win);
	    h = utils.viewportHeight(win);
	  }
	  offset.width = w;
	  offset.height = h;
	  return offset;
	}
	
	/*
	 * align node
	 * @param {Element} node current dom node
	 * @param {Object} align align config
	 *
	 *    @example
	 *    {
	 *      node: null,         // 参考元素, falsy 或 window 为可视区域, 'trigger' 为触发元素, 其他为指定元素
	 *      points: ['cc','cc'], // ['tr', 'tl'] 表示 overlay 的 tr 与参考节点的 tl 对齐
	 *      offset: [0, 0]      // 有效值为 [n, m]
	 *    }
	 */
	function domAlign(el, refNode, align) {
	  var points = align.points;
	  var offset = align.offset;
	  var overflow = align.overflow;
	  offset = offset && [].concat(offset) || [0, 0];
	  overflow = overflow || {};
	  var newOverflowCfg = {};
	
	  var fail = 0;
	  // 当前节点可以被放置的显示区域
	  var visibleRect = getVisibleRectForElement(el);
	  // 当前节点所占的区域, left/top/width/height
	  var elRegion = getRegion(el);
	  // 参照节点所占的区域, left/top/width/height
	  var refNodeRegion = getRegion(refNode);
	  // 当前节点将要被放置的位置
	  var elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
	  // 当前节点将要所处的区域
	  var newElRegion = utils.merge(elRegion, elFuturePos);
	
	  // 如果可视区域不能完全放置当前节点时允许调整
	  if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
	    if (overflow.adjustX) {
	      // 如果横向不能放下
	      if (isFailX(elFuturePos, elRegion, visibleRect)) {
	        fail = 1;
	        // 对齐位置反下
	        points = flip(points, /[lr]/ig, {
	          l: 'r',
	          r: 'l'
	        });
	        // 偏移量也反下
	        offset = flipOffset(offset, 0);
	      }
	    }
	
	    if (overflow.adjustY) {
	      // 如果纵向不能放下
	      if (isFailY(elFuturePos, elRegion, visibleRect)) {
	        fail = 1;
	        // 对齐位置反下
	        points = flip(points, /[tb]/ig, {
	          t: 'b',
	          b: 't'
	        });
	        // 偏移量也反下
	        offset = flipOffset(offset, 1);
	      }
	    }
	
	    // 如果失败，重新计算当前节点将要被放置的位置
	    if (fail) {
	      elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
	      utils.mix(newElRegion, elFuturePos);
	    }
	
	    // 检查反下后的位置是否可以放下了
	    // 如果仍然放不下只有指定了可以调整当前方向才调整
	    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);
	
	    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);
	
	    // 确实要调整，甚至可能会调整高度宽度
	    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
	      newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
	    }
	  }
	
	  // https://github.com/kissyteam/kissy/issues/190
	  // http://localhost:8888/kissy/src/overlay/demo/other/relative_align/align.html
	  // 相对于屏幕位置没变，而 left/top 变了
	  // 例如 <div 'relative'><el absolute></div>
	  utils.offset(el, { left: newElRegion.left, top: newElRegion.top });
	
	  // need judge to in case set fixed with in css on height auto element
	  if (newElRegion.width !== elRegion.width) {
	    utils.css(el, 'width', el.width() + newElRegion.width - elRegion.width);
	  }
	
	  if (newElRegion.height !== elRegion.height) {
	    utils.css(el, 'height', el.height() + newElRegion.height - elRegion.height);
	  }
	
	  return {
	    points: points,
	    offset: offset,
	    overflow: newOverflowCfg
	  };
	}
	
	domAlign.__getOffsetParent = getOffsetParent;
	
	domAlign.__getVisibleRectForElement = getVisibleRectForElement;
	
	module.exports = domAlign;
	/**
	 *  2012-04-26 yiminghe@gmail.com
	 *   - 优化智能对齐算法
	 *   - 慎用 resizeXX
	 *
	 *  2011-07-13 yiminghe@gmail.com note:
	 *   - 增加智能对齐，以及大小调整选项
	 **/
	
	// body may have overflow set on it, yet we still get the entire
	// viewport. In some browsers, el.offsetParent may be
	// document.documentElement, so check for that too.

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
	
	var getComputedStyleX;
	
	function css(el, name, value) {
	  if (typeof name === 'object') {
	    for (var i in name) {
	      css(el, i, name[i]);
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value = value + 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  } else {
	    return getComputedStyleX(el, name);
	  }
	}
	
	function getClientPosition(elem) {
	  var box, x, y;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();
	
	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin
	
	  x = box.left;
	  y = box.top;
	
	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.
	
	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.
	
	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0
	
	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;
	
	  return { left: x, top: y };
	}
	
	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    //ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      //quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}
	
	function getScrollLeft(w) {
	  return getScroll(w);
	}
	
	function getScrollTop(w) {
	  return getScroll(w, true);
	}
	
	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}
	function _getComputedStyle(elem, name, computedStyle) {
	  var val = '';
	  var d = elem.ownerDocument;
	
	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null)) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }
	
	  return val;
	}
	
	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/,
	    CURRENT_STYLE = 'currentStyle',
	    RUNTIME_STYLE = 'runtimeStyle',
	    LEFT = 'left',
	    PX = 'px';
	
	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];
	
	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了
	
	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style,
	        left = style[LEFT],
	        rsLeft = elem[RUNTIME_STYLE][LEFT];
	
	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];
	
	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;
	
	    // Revert the changed values
	    style[LEFT] = left;
	
	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}
	
	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}
	
	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setOffset(elem, offset) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }
	  var preset = -9999;
	  if ('left' in offset) {
	    elem.style.left = preset + 'px';
	  }
	  if ('top' in offset) {
	    elem.style.top = preset + 'px';
	  }
	  var old = getOffset(elem);
	  var ret = {};
	  var key;
	  for (key in offset) {
	    ret[key] = preset + offset[key] - old[key];
	  }
	  css(elem, ret);
	}
	
	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}
	
	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}
	
	var BOX_MODELS = ['margin', 'border', 'padding'],
	    CONTENT_INDEX = -1,
	    PADDING_INDEX = 2,
	    BORDER_INDEX = 1,
	    MARGIN_INDEX = 0;
	
	function swap(elem, options, callback) {
	  var old = {},
	      style = elem.style,
	      name;
	
	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    old[name] = style[name];
	    style[name] = options[name];
	  }
	
	  callback.call(elem);
	
	  // Revert the old values
	  for (name in options) {
	    style[name] = old[name];
	  }
	}
	
	function getPBMWidth(elem, props, which) {
	  var value = 0,
	      prop,
	      j,
	      i;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp;
	        if (prop === 'border') {
	          cssProp = prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}
	
	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /*eslint eqeqeq:0*/
	  return obj != null && obj == obj.window;
	}
	
	var domUtils = {};
	
	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    //firefox chrome documentElement.scrollHeight< body.scrollHeight
	    //ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    //quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };
	
	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name,
	        doc = win.document,
	        body = doc.body,
	        documentElement = doc.documentElement,
	        documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});
	
	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, extra) {
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'],
	      borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue == null || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue == null || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    } else {
	      return cssBoxValue;
	    }
	  } else if (borderBoxValueOrIsBorderBox) {
	    return val + (extra === BORDER_INDEX ? 0 : extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
	  } else {
	    return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	  }
	}
	
	var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
	
	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay(elem) {
	  var val,
	      args = arguments;
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}
	
	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	
	  domUtils[name] = function (elem, val) {
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});
	
	function mix(to, from) {
	  for (var i in from) {
	    to[i] = from[i];
	  }
	  return to;
	}
	
	var utils = module.exports = {
	  getWindow: function getWindow(node) {
	    if (node && node.document && node.setTimeout) {
	      return node;
	    }
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },
	  offset: function offset(el, value) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value);
	    } else {
	      return getOffset(el);
	    }
	  },
	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var i;
	    var ret = {};
	    for (i in obj) {
	      ret[i] = obj[i];
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (i in obj) {
	        ret.overflow[i] = obj.overflow[i];
	      }
	    }
	    return ret;
	  },
	  mix: mix,
	  getWindowScrollLeft: function getWindowScrollLeft(w) {
	    return getScrollLeft(w);
	  },
	  getWindowScrollTop: function getWindowScrollTop(w) {
	    return getScrollTop(w);
	  },
	  merge: function merge() {
	    var ret = {};
	    for (var i = 0; i < arguments.length; i++) {
	      utils.mix(ret, arguments[i]);
	    }
	    return ret;
	  },
	  viewportWidth: 0,
	  viewportHeight: 0
	};
	
	mix(utils, domUtils);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// export this package's api
	'use strict';
	
	module.exports = __webpack_require__(31);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ChildrenUtils = __webpack_require__(32);
	
	var _ChildrenUtils2 = _interopRequireDefault(_ChildrenUtils);
	
	var _AnimateChild = __webpack_require__(33);
	
	var _AnimateChild2 = _interopRequireDefault(_AnimateChild);
	
	var defaultKey = 'rc_animate_' + Date.now();
	
	function getChildrenFromProps(props) {
	  var children = props.children;
	  if (_react2['default'].isValidElement(children)) {
	    if (!children.key) {
	      return _react2['default'].cloneElement(children, {
	        key: defaultKey
	      });
	    }
	  }
	  return children;
	}
	
	var Animate = _react2['default'].createClass({
	  displayName: 'Animate',
	
	  protoTypes: {
	    component: _react2['default'].PropTypes.any,
	    animation: _react2['default'].PropTypes.object,
	    transitionName: _react2['default'].PropTypes.string,
	    transitionEnter: _react2['default'].PropTypes.bool,
	    transitionLeave: _react2['default'].PropTypes.bool,
	    onEnd: _react2['default'].PropTypes.func,
	    showProp: _react2['default'].PropTypes.bool,
	    animateMount: _react2['default'].PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      animation: {},
	      component: 'span',
	      transitionEnter: true,
	      transitionLeave: true,
	      enter: true,
	      animateMount: false,
	      onEnd: function onEnd() {}
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    this.currentlyAnimatingKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	    return {
	      children: (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(this.props))
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var _this = this;
	
	    var nextChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(nextProps));
	    var props = this.props;
	    var showProp = props.showProp;
	    var exclusive = props.exclusive;
	    var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
	    // last props children if exclusive
	    // exclusive needs immediate response
	    var currentChildren = this.state.children;
	    var newChildren = _ChildrenUtils2['default'].mergeChildren(currentChildren, nextChildren);
	
	    if (showProp && !exclusive) {
	      newChildren = newChildren.map(function (c) {
	        if (!c.props[showProp] && (0, _ChildrenUtils.isShownInChildren)(currentChildren, c, showProp)) {
	          c = _react2['default'].cloneElement(c, _defineProperty({}, showProp, true));
	        }
	        return c;
	      });
	    }
	
	    this.setState({
	      children: newChildren
	    });
	
	    // exclusive needs immediate response
	    if (exclusive) {
	      Object.keys(currentlyAnimatingKeys).forEach(function (key) {
	        _this.stop(key);
	      });
	      currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props));
	    }
	
	    nextChildren.forEach(function (c) {
	      var key = c.key;
	      if (currentlyAnimatingKeys[key]) {
	        return;
	      }
	      var hasPrev = (0, _ChildrenUtils.inChildren)(currentChildren, c);
	      if (showProp) {
	        if (hasPrev) {
	          var showInNow = (0, _ChildrenUtils.isShownInChildren)(currentChildren, c, showProp);
	          var showInNext = c.props[showProp];
	          if (!showInNow && showInNext) {
	            _this.keysToEnter.push(key);
	          }
	        }
	      } else if (!hasPrev) {
	        _this.keysToEnter.push(key);
	      }
	    });
	
	    currentChildren.forEach(function (c) {
	      var key = c.key;
	      if (currentlyAnimatingKeys[key]) {
	        return;
	      }
	      var hasNext = (0, _ChildrenUtils.inChildren)(nextChildren, c);
	      if (showProp) {
	        if (hasNext) {
	          var showInNext = (0, _ChildrenUtils.isShownInChildren)(nextChildren, c, showProp);
	          var showInNow = c.props[showProp];
	          if (!showInNext && showInNow) {
	            _this.keysToLeave.push(key);
	          }
	        }
	      } else if (!hasNext) {
	        _this.keysToLeave.push(key);
	      }
	    });
	  },
	
	  performEnter: function performEnter(key) {
	    // may already remove by exclusive
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillEnter(this._handleDoneEntering.bind(this, key));
	    }
	  },
	
	  _handleDoneEntering: function _handleDoneEntering(key) {
	    delete this.currentlyAnimatingKeys[key];
	    var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(this.props));
	    if (!this.isValidChildByKey(currentChildren, key)) {
	      // exclusive will not need this
	      this.performLeave(key);
	    } else {
	      this.props.onEnd(key, true);
	      if (this.isMounted() && !(0, _ChildrenUtils.isSameChildren)(this.state.children, currentChildren)) {
	        this.setState({
	          children: currentChildren
	        });
	      }
	    }
	  },
	
	  performLeave: function performLeave(key) {
	    // may already remove by exclusive
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillLeave(this._handleDoneLeaving.bind(this, key));
	    }
	  },
	
	  isValidChildByKey: function isValidChildByKey(currentChildren, key) {
	    var showProp = this.props.showProp;
	    if (showProp) {
	      return (0, _ChildrenUtils.isShownInChildrenByKey)(currentChildren, key, showProp);
	    } else {
	      return (0, _ChildrenUtils.inChildrenByKey)(currentChildren, key);
	    }
	  },
	
	  _handleDoneLeaving: function _handleDoneLeaving(key) {
	    delete this.currentlyAnimatingKeys[key];
	    var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(this.props));
	    // in case state change is too fast
	    if (this.isValidChildByKey(currentChildren, key)) {
	      this.performEnter(key);
	    } else {
	      this.props.onEnd(key, false);
	      if (this.isMounted() && !(0, _ChildrenUtils.isSameChildren)(this.state.children, currentChildren)) {
	        this.setState({
	          children: currentChildren
	        });
	      }
	    }
	  },
	
	  stop: function stop(key) {
	    delete this.currentlyAnimatingKeys[key];
	    var component = this.refs[key];
	    if (component) {
	      component.stop();
	    }
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.animateMount) {
	      this.state.children.map(function (c) {
	        return c.key;
	      }).forEach(this.performEnter);
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    var keysToEnter = this.keysToEnter;
	    this.keysToEnter = [];
	    keysToEnter.forEach(this.performEnter);
	    var keysToLeave = this.keysToLeave;
	    this.keysToLeave = [];
	    keysToLeave.forEach(this.performLeave);
	  },
	
	  render: function render() {
	    var props = this.props;
	    var children = this.state.children.map(function (child) {
	      if (!child.key) {
	        throw new Error('must set key for <rc-animate> children');
	      }
	      return _react2['default'].createElement(
	        _AnimateChild2['default'],
	        {
	          key: child.key,
	          ref: child.key,
	          animation: props.animation,
	          transitionName: props.transitionName,
	          transitionEnter: props.transitionEnter,
	          transitionLeave: props.transitionLeave },
	        child
	      );
	    });
	    var Component = props.component;
	    if (Component) {
	      return _react2['default'].createElement(
	        Component,
	        this.props,
	        children
	      );
	    } else {
	      return children[0] || null;
	    }
	  }
	});
	
	exports['default'] = Animate;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	function inChildren(children, child) {
	  var found = 0;
	  children.forEach(function (c) {
	    if (found) {
	      return;
	    }
	    found = c.key === child.key;
	  });
	  return found;
	}
	
	exports['default'] = {
	  inChildren: inChildren,
	
	  toArrayChildren: function toArrayChildren(children) {
	    var ret = [];
	    _react2['default'].Children.forEach(children, function (c) {
	      ret.push(c);
	    });
	    return ret;
	  },
	
	  isShownInChildren: function isShownInChildren(children, child, showProp) {
	    var found = 0;
	    children.forEach(function (c) {
	      if (found) {
	        return;
	      }
	      found = c.key === child.key && c.props[showProp];
	    });
	    return found;
	  },
	
	  inChildrenByKey: function inChildrenByKey(children, key) {
	    var found = 0;
	    if (children) {
	      children.forEach(function (c) {
	        if (found) {
	          return;
	        }
	        found = c.key === key;
	      });
	    }
	    return found;
	  },
	
	  isShownInChildrenByKey: function isShownInChildrenByKey(children, key, showProp) {
	    var found = 0;
	    if (children) {
	      children.forEach(function (c) {
	        if (found) {
	          return;
	        }
	        found = c.key === key && c.props[showProp];
	      });
	    }
	    return found;
	  },
	
	  isSameChildren: function isSameChildren(c1, c2) {
	    var same = c1.length === c2.length;
	    if (same) {
	      c1.forEach(function (c, i) {
	        if (c !== c2[i]) {
	          same = false;
	        }
	      });
	    }
	    return same;
	  },
	
	  mergeChildren: function mergeChildren(prev, next) {
	    var ret = [];
	
	    // For each key of `next`, the list of keys to insert before that key in
	    // the combined list
	    var nextChildrenPending = {};
	    var pendingChildren = [];
	    prev.forEach(function (c) {
	      if (inChildren(next, c)) {
	        if (pendingChildren.length) {
	          nextChildrenPending[c.key] = pendingChildren;
	          pendingChildren = [];
	        }
	      } else {
	        pendingChildren.push(c);
	      }
	    });
	
	    next.forEach(function (c) {
	      if (nextChildrenPending.hasOwnProperty(c.key)) {
	        ret = ret.concat(nextChildrenPending[c.key]);
	      }
	      ret.push(c);
	    });
	
	    ret = ret.concat(pendingChildren);
	
	    return ret;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _cssAnimation = __webpack_require__(34);
	
	var _cssAnimation2 = _interopRequireDefault(_cssAnimation);
	
	var transitionMap = {
	  enter: 'transitionEnter',
	  leave: 'transitionLeave'
	};
	
	var AnimateChild = _react2['default'].createClass({
	  displayName: 'AnimateChild',
	
	  transition: function transition(animationType, finishCallback) {
	    var _this = this;
	
	    var node = _react2['default'].findDOMNode(this);
	    var props = this.props;
	    var transitionName = props.transitionName;
	    this.stop();
	    var end = function end() {
	      _this.stopper = null;
	      finishCallback();
	    };
	    if ((_cssAnimation.isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
	      this.stopper = (0, _cssAnimation2['default'])(node, transitionName + '-' + animationType, end);
	    } else {
	      this.stopper = props.animation[animationType](node, end);
	    }
	  },
	
	  stop: function stop() {
	    if (this.stopper) {
	      this.stopper.stop();
	      this.stopper = null;
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this.stop();
	  },
	
	  componentWillEnter: function componentWillEnter(done) {
	    var props = this.props;
	    if (props.transitionEnter && props.transitionName || props.animation.enter) {
	      this.transition('enter', done);
	    } else {
	      done();
	    }
	  },
	
	  componentWillLeave: function componentWillLeave(done) {
	    var props = this.props;
	    if (props.transitionLeave && props.transitionName || props.animation.leave) {
	      this.transition('leave', done);
	    } else {
	      done();
	    }
	  },
	
	  render: function render() {
	    return this.props.children;
	  }
	});
	
	exports['default'] = AnimateChild;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Event = __webpack_require__(35);
	var Css = __webpack_require__(36);
	
	var cssAnimation = function cssAnimation(node, transitionName, callback) {
	  var className = transitionName;
	  var activeClassName = className + '-active';
	
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }
	
	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }
	
	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }
	
	    Css.removeClass(node, className);
	    Css.removeClass(node, activeClassName);
	
	    Event.removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;
	
	    // Usually this optional callback is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (callback) {
	      callback();
	    }
	  };
	
	  Event.addEndEventListener(node, node.rcEndListener);
	
	  Css.addClass(node, className);
	
	  node.rcAnimTimeout = setTimeout(function () {
	    Css.addClass(node, activeClassName);
	    node.rcAnimTimeout = null;
	  }, 0);
	
	  return {
	    stop: function stop() {
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }
	  };
	};
	
	cssAnimation.style = function (node, style, callback) {
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }
	
	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }
	
	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }
	
	    Event.removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;
	
	    // Usually this optional callback is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (callback) {
	      callback();
	    }
	  };
	
	  Event.addEndEventListener(node, node.rcEndListener);
	
	  node.rcAnimTimeout = setTimeout(function () {
	    for (var s in style) {
	      node.style[s] = style[s];
	    }
	    node.rcAnimTimeout = null;
	  }, 0);
	};
	
	cssAnimation.setTransition = function (node, property, v) {
	  property = property || '';
	  ['Webkit', 'Moz', 'O',
	  // ms is special .... !
	  'ms'].forEach(function (prefix) {
	    node.style[prefix + 'Transition' + property] = v;
	  });
	};
	
	cssAnimation.addClass = Css.addClass;
	cssAnimation.removeClass = Css.removeClass;
	cssAnimation.isCssAnimationSupported = Event.endEvents.length !== 0;
	
	module.exports = cssAnimation;

/***/ },
/* 35 */
/***/ function(module, exports) {

	
	'use strict';
	
	var EVENT_NAME_MAP = {
	  transitionend: {
	    transition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'mozTransitionEnd',
	    OTransition: 'oTransitionEnd',
	    msTransition: 'MSTransitionEnd'
	  },
	
	  animationend: {
	    animation: 'animationend',
	    WebkitAnimation: 'webkitAnimationEnd',
	    MozAnimation: 'mozAnimationEnd',
	    OAnimation: 'oAnimationEnd',
	    msAnimation: 'MSAnimationEnd'
	  }
	};
	
	var endEvents = [];
	
	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;
	
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }
	
	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }
	
	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}
	
	if (typeof window !== 'undefined') {
	  detectEvents();
	}
	
	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}
	
	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}
	
	var TransitionEvents = {
	  addEndEventListener: function addEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },
	
	  endEvents: endEvents,
	
	  removeEndEventListener: function removeEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};
	
	module.exports = TransitionEvents;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	var SPACE = ' ';
	var RE_CLASS = /[\n\t\r]/g;
	
	var norm = function norm(elemClass) {
	  return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
	};
	
	module.exports = {
	  addClass: function addClass(elem, className) {
	    elem.className += ' ' + className;
	  },
	
	  removeClass: function removeClass(elem, needle) {
	    var elemClass = elem.className.trim();
	    var className = norm(elemClass);
	    needle = needle.trim();
	    needle = SPACE + needle + SPACE;
	    // 一个 cls 有可能多次出现：'link link2 link link3 link'
	    while (className.indexOf(needle) >= 0) {
	      className = className.replace(needle, SPACE);
	    }
	    elem.className = className.trim();
	  }
	};

/***/ }
]);
//# sourceMappingURL=simple.js.map