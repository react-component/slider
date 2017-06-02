'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Track = require('./common/Track');

var _Track2 = _interopRequireDefault(_Track);

var _createSlider = require('./common/createSlider');

var _createSlider2 = _interopRequireDefault(_createSlider);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Slider = function (_React$Component) {
  (0, _inherits3['default'])(Slider, _React$Component);

  function Slider(props) {
    (0, _classCallCheck3['default'])(this, Slider);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.onEnd = function () {
      _this.setState({ dragging: false });
      _this.removeDocumentEvents();
      _this.props.onAfterChange(_this.getValue());
    };

    var defaultValue = props.defaultValue !== undefined ? props.defaultValue : props.min;
    var value = props.value !== undefined ? props.value : defaultValue;

    _this.state = {
      value: _this.trimAlignValue(value),
      dragging: false
    };
    return _this;
  }

  (0, _createClass3['default'])(Slider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

      var prevValue = this.state.value;
      var value = nextProps.value !== undefined ? nextProps.value : prevValue;
      var nextValue = this.trimAlignValue(value, nextProps);
      if (nextValue === prevValue) return;

      this.setState({ value: nextValue });
      if (utils.isValueOutOfRange(value, nextProps)) {
        this.props.onChange(nextValue);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      var props = this.props;
      var isNotControlled = !('value' in props);
      if (isNotControlled) {
        this.setState(state);
      }

      var changedValue = state.value;
      props.onChange(changedValue);
    }
  }, {
    key: 'onStart',
    value: function onStart(position) {
      this.setState({ dragging: true });
      var props = this.props;
      var prevValue = this.getValue();
      props.onBeforeChange(prevValue);

      var value = this.calcValueByPos(position);
      this.startValue = value;
      this.startPosition = position;

      if (value === prevValue) return;

      this.onChange({ value: value });
    }
  }, {
    key: 'onMove',
    value: function onMove(e, position) {
      utils.pauseEvent(e);
      var state = this.state;
      var value = this.calcValueByPos(position);
      var oldValue = state.value;
      if (value === oldValue) return;

      this.onChange({ value: value });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: 'getLowerBound',
    value: function getLowerBound() {
      return this.props.min;
    }
  }, {
    key: 'getUpperBound',
    value: function getUpperBound() {
      return this.state.value;
    }
  }, {
    key: 'trimAlignValue',
    value: function trimAlignValue(v) {
      var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var mergedProps = (0, _extends3['default'])({}, this.props, nextProps);
      var val = utils.ensureValueInRange(v, mergedProps);
      return utils.ensureValuePrecision(val, mergedProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          prefixCls = _props.prefixCls,
          vertical = _props.vertical,
          included = _props.included,
          disabled = _props.disabled,
          minimumTrackStyle = _props.minimumTrackStyle,
          handleStyle = _props.handleStyle,
          handleGenerator = _props.handle;
      var _state = this.state,
          value = _state.value,
          dragging = _state.dragging;

      var offset = this.calcOffset(value);
      var handle = handleGenerator({
        className: prefixCls + '-handle',
        vertical: vertical,
        offset: offset,
        value: value,
        dragging: dragging,
        disabled: disabled,
        handleStyle: handleStyle,
        ref: function ref(h) {
          return _this2.saveHandle(0, h);
        }
      });
      var track = _react2['default'].createElement(_Track2['default'], {
        className: prefixCls + '-track',
        vertical: vertical,
        included: included,
        offset: 0,
        length: offset,
        minimumTrackStyle: minimumTrackStyle
      });

      return { tracks: track, handles: handle };
    }
  }]);
  return Slider;
}(_react2['default'].Component); /* eslint-disable react/prop-types */


Slider.displayName = 'Slider';
Slider.propTypes = {
  defaultValue: _propTypes2['default'].number,
  value: _propTypes2['default'].number,
  disabled: _propTypes2['default'].bool
};
Slider.defaultProps = {};
exports['default'] = (0, _createSlider2['default'])(Slider);
module.exports = exports['default'];