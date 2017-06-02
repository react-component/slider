'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports['default'] = createSliderWithTooltip;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _Handle = require('./Handle');

var _Handle2 = _interopRequireDefault(_Handle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function createSliderWithTooltip(Component) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    (0, _inherits3['default'])(ComponentWrapper, _React$Component);

    function ComponentWrapper(props) {
      (0, _classCallCheck3['default'])(this, ComponentWrapper);

      var _this = (0, _possibleConstructorReturn3['default'])(this, (ComponentWrapper.__proto__ || Object.getPrototypeOf(ComponentWrapper)).call(this, props));

      _this.handleTooltipVisibleChange = function (index, visible) {
        _this.setState({
          visibles: (0, _extends4['default'])({}, _this.state.visibles, (0, _defineProperty3['default'])({}, index, visible))
        });
      };

      _this.handleWithTooltip = function (_ref) {
        var value = _ref.value,
            dragging = _ref.dragging,
            index = _ref.index,
            disabled = _ref.disabled,
            restProps = (0, _objectWithoutProperties3['default'])(_ref, ['value', 'dragging', 'index', 'disabled']);
        var tipFormatter = _this.props.tipFormatter;

        return _react2['default'].createElement(
          _rcTooltip2['default'],
          {
            prefixCls: 'rc-slider-tooltip',
            overlay: tipFormatter(value),
            visible: !disabled && (_this.state.visibles[index] || dragging),
            placement: 'top',
            key: index
          },
          _react2['default'].createElement(_Handle2['default'], (0, _extends4['default'])({}, restProps, {
            onMouseEnter: function onMouseEnter() {
              return _this.handleTooltipVisibleChange(index, true);
            },
            onMouseLeave: function onMouseLeave() {
              return _this.handleTooltipVisibleChange(index, false);
            }
          }))
        );
      };

      _this.state = { visibles: {} };
      return _this;
    }

    (0, _createClass3['default'])(ComponentWrapper, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(Component, (0, _extends4['default'])({}, this.props, { handle: this.handleWithTooltip }));
      }
    }]);
    return ComponentWrapper;
  }(_react2['default'].Component), _class.propTypes = {
    tipFormatter: _propTypes2['default'].func
  }, _class.defaultProps = {
    tipFormatter: function tipFormatter(value) {
      return value;
    }
  }, _temp;
}
module.exports = exports['default'];