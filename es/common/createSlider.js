import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/es/Dom/addEventListener';
import classNames from 'classnames';
import warning from 'warning';
import Steps from './Steps';
import Marks from './Marks';
import Handle from '../Handle';
import * as utils from '../utils';

function noop() {}

export default function createSlider(Component) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(ComponentEnhancer, _Component);

    function ComponentEnhancer(props) {
      _classCallCheck(this, ComponentEnhancer);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props));

      _this.onMouseDown = function (e) {
        if (e.button !== 0) {
          return;
        }

        var isVertical = _this.props.vertical;
        var position = utils.getMousePosition(isVertical, e);
        if (!utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.dragOffset = 0;
        } else {
          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
          _this.dragOffset = position - handlePosition;
          position = handlePosition;
        }
        _this.removeDocumentEvents();
        _this.onStart(position);
        _this.addDocumentMouseEvents();
      };

      _this.onTouchStart = function (e) {
        if (utils.isNotTouchEvent(e)) return;

        var isVertical = _this.props.vertical;
        var position = utils.getTouchPosition(isVertical, e);
        if (!utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.dragOffset = 0;
        } else {
          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
          _this.dragOffset = position - handlePosition;
          position = handlePosition;
        }
        _this.onStart(position);
        _this.addDocumentTouchEvents();
        utils.pauseEvent(e);
      };

      _this.onFocus = function (e) {
        var _this$props = _this.props,
            onFocus = _this$props.onFocus,
            vertical = _this$props.vertical;

        if (utils.isEventFromHandle(e, _this.handlesRefs)) {
          var handlePosition = utils.getHandleCenterPosition(vertical, e.target);
          _this.dragOffset = 0;
          _this.onStart(handlePosition);
          utils.pauseEvent(e);
          if (onFocus) {
            onFocus(e);
          }
        }
      };

      _this.onBlur = function (e) {
        var onBlur = _this.props.onBlur;

        _this.onEnd(e);
        if (onBlur) {
          onBlur(e);
        }
      };

      _this.onMouseUp = function () {
        if (_this.handlesRefs[_this.prevMovedHandleIndex]) {
          _this.handlesRefs[_this.prevMovedHandleIndex].clickFocus();
        }
      };

      _this.onMouseMove = function (e) {
        if (!_this.sliderRef) {
          _this.onEnd();
          return;
        }
        var position = utils.getMousePosition(_this.props.vertical, e);
        _this.onMove(e, position - _this.dragOffset);
      };

      _this.onTouchMove = function (e) {
        if (utils.isNotTouchEvent(e) || !_this.sliderRef) {
          _this.onEnd();
          return;
        }

        var position = utils.getTouchPosition(_this.props.vertical, e);
        _this.onMove(e, position - _this.dragOffset);
      };

      _this.onKeyDown = function (e) {
        if (_this.sliderRef && utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.onKeyboard(e);
        }
      };

      _this.saveSlider = function (slider) {
        _this.sliderRef = slider;
      };

      _this.onClickMarkLabel = function (e, value) {
        e.stopPropagation();
        _this.onChange({ value: value, source: 'label' });
      };

      if (process.env.NODE_ENV !== 'production') {
        var step = props.step,
            max = props.max,
            min = props.min;

        warning(step && Math.floor(step) === step ? (max - min) % step === 0 : true, 'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)', max - min, step);
      }
      _this.handlesRefs = {};
      return _this;
    }

    ComponentEnhancer.prototype.componentWillUnmount = function componentWillUnmount() {
      if (_Component.prototype.componentWillUnmount) _Component.prototype.componentWillUnmount.call(this);
      this.removeDocumentEvents();
    };

    ComponentEnhancer.prototype.componentDidMount = function componentDidMount() {
      // Snapshot testing cannot handle refs, so be sure to null-check this.
      this.document = this.sliderRef && this.sliderRef.ownerDocument;
    };

    ComponentEnhancer.prototype.addDocumentTouchEvents = function addDocumentTouchEvents() {
      // just work for Chrome iOS Safari and Android Browser
      this.onTouchMoveListener = addEventListener(this.document, 'touchmove', this.onTouchMove);
      this.onTouchUpListener = addEventListener(this.document, 'touchend', this.onEnd);
    };

    ComponentEnhancer.prototype.addDocumentMouseEvents = function addDocumentMouseEvents() {
      this.onMouseMoveListener = addEventListener(this.document, 'mousemove', this.onMouseMove);
      this.onMouseUpListener = addEventListener(this.document, 'mouseup', this.onEnd);
    };

    ComponentEnhancer.prototype.removeDocumentEvents = function removeDocumentEvents() {
      /* eslint-disable no-unused-expressions */
      this.onTouchMoveListener && this.onTouchMoveListener.remove();
      this.onTouchUpListener && this.onTouchUpListener.remove();

      this.onMouseMoveListener && this.onMouseMoveListener.remove();
      this.onMouseUpListener && this.onMouseUpListener.remove();
      /* eslint-enable no-unused-expressions */
    };

    ComponentEnhancer.prototype.focus = function focus() {
      if (!this.props.disabled) {
        this.handlesRefs[0].focus();
      }
    };

    ComponentEnhancer.prototype.blur = function blur() {
      if (!this.props.disabled) {
        this.handlesRefs[0].blur();
      }
    };

    ComponentEnhancer.prototype.getSliderStart = function getSliderStart() {
      var slider = this.sliderRef;
      var rect = slider.getBoundingClientRect();

      return this.props.vertical ? rect.top : rect.left;
    };

    ComponentEnhancer.prototype.getSliderLength = function getSliderLength() {
      var slider = this.sliderRef;
      if (!slider) {
        return 0;
      }

      var coords = slider.getBoundingClientRect();
      return this.props.vertical ? coords.height : coords.width;
    };

    ComponentEnhancer.prototype.calcValue = function calcValue(offset) {
      var _props = this.props,
          vertical = _props.vertical,
          min = _props.min,
          max = _props.max;

      var ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
      var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
      return value;
    };

    ComponentEnhancer.prototype.calcValueByPos = function calcValueByPos(position) {
      var pixelOffset = position - this.getSliderStart();
      var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
      return nextValue;
    };

    ComponentEnhancer.prototype.calcOffset = function calcOffset(value) {
      var _props2 = this.props,
          min = _props2.min,
          max = _props2.max;

      var ratio = (value - min) / (max - min);
      return ratio * 100;
    };

    ComponentEnhancer.prototype.saveHandle = function saveHandle(index, handle) {
      this.handlesRefs[index] = handle;
    };

    ComponentEnhancer.prototype.render = function render() {
      var _classNames;

      var _props3 = this.props,
          prefixCls = _props3.prefixCls,
          className = _props3.className,
          marks = _props3.marks,
          dots = _props3.dots,
          step = _props3.step,
          included = _props3.included,
          disabled = _props3.disabled,
          vertical = _props3.vertical,
          min = _props3.min,
          max = _props3.max,
          children = _props3.children,
          maximumTrackStyle = _props3.maximumTrackStyle,
          style = _props3.style,
          railStyle = _props3.railStyle,
          dotStyle = _props3.dotStyle,
          activeDotStyle = _props3.activeDotStyle;

      var _Component$prototype$ = _Component.prototype.render.call(this),
          tracks = _Component$prototype$.tracks,
          handles = _Component$prototype$.handles;

      var sliderClassName = classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + '-with-marks'] = Object.keys(marks).length, _classNames[prefixCls + '-disabled'] = disabled, _classNames[prefixCls + '-vertical'] = vertical, _classNames[className] = className, _classNames));
      return React.createElement(
        'div',
        {
          ref: this.saveSlider,
          className: sliderClassName,
          onTouchStart: disabled ? noop : this.onTouchStart,
          onMouseDown: disabled ? noop : this.onMouseDown,
          onMouseUp: disabled ? noop : this.onMouseUp,
          onKeyDown: disabled ? noop : this.onKeyDown,
          onFocus: disabled ? noop : this.onFocus,
          onBlur: disabled ? noop : this.onBlur,
          style: style
        },
        React.createElement('div', {
          className: prefixCls + '-rail',
          style: _extends({}, maximumTrackStyle, railStyle)
        }),
        tracks,
        React.createElement(Steps, {
          prefixCls: prefixCls,
          vertical: vertical,
          marks: marks,
          dots: dots,
          step: step,
          included: included,
          lowerBound: this.getLowerBound(),
          upperBound: this.getUpperBound(),
          max: max,
          min: min,
          dotStyle: dotStyle,
          activeDotStyle: activeDotStyle
        }),
        handles,
        React.createElement(Marks, {
          className: prefixCls + '-mark',
          onClickLabel: disabled ? noop : this.onClickMarkLabel,
          vertical: vertical,
          marks: marks,
          included: included,
          lowerBound: this.getLowerBound(),
          upperBound: this.getUpperBound(),
          max: max,
          min: min
        }),
        children
      );
    };

    return ComponentEnhancer;
  }(Component), _class.displayName = 'ComponentEnhancer(' + Component.displayName + ')', _class.propTypes = _extends({}, Component.propTypes, {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    marks: PropTypes.object,
    included: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.any,
    onBeforeChange: PropTypes.func,
    onChange: PropTypes.func,
    onAfterChange: PropTypes.func,
    handle: PropTypes.func,
    dots: PropTypes.bool,
    vertical: PropTypes.bool,
    style: PropTypes.object,
    minimumTrackStyle: PropTypes.object, // just for compatibility, will be deperecate
    maximumTrackStyle: PropTypes.object, // just for compatibility, will be deperecate
    handleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    trackStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    railStyle: PropTypes.object,
    dotStyle: PropTypes.object,
    activeDotStyle: PropTypes.object,
    autoFocus: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }), _class.defaultProps = _extends({}, Component.defaultProps, {
    prefixCls: 'rc-slider',
    className: '',
    min: 0,
    max: 100,
    step: 1,
    marks: {},
    handle: function handle(_ref) {
      var index = _ref.index,
          restProps = _objectWithoutProperties(_ref, ['index']);

      delete restProps.dragging;
      return React.createElement(Handle, _extends({}, restProps, { key: index }));
    },

    onBeforeChange: noop,
    onChange: noop,
    onAfterChange: noop,
    included: true,
    disabled: false,
    dots: false,
    vertical: false,
    trackStyle: [{}],
    handleStyle: [{}],
    railStyle: {},
    dotStyle: {},
    activeDotStyle: {}
  }), _temp;
}