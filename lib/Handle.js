'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Handle = function (_React$Component) {
  (0, _inherits3['default'])(Handle, _React$Component);

  function Handle() {
    (0, _classCallCheck3['default'])(this, Handle);
    return (0, _possibleConstructorReturn3['default'])(this, (Handle.__proto__ || Object.getPrototypeOf(Handle)).apply(this, arguments));
  }

  (0, _createClass3['default'])(Handle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          vertical = _props.vertical,
          offset = _props.offset,
          handleStyle = _props.handleStyle,
          restProps = (0, _objectWithoutProperties3['default'])(_props, ['className', 'vertical', 'offset', 'handleStyle']);

      var style = vertical ? { bottom: offset + '%' } : { left: offset + '%' };

      var elStyle = (0, _extends3['default'])({}, style, handleStyle);
      return _react2['default'].createElement('div', (0, _extends3['default'])({}, restProps, { className: className, style: elStyle }));
    }
  }]);
  return Handle;
}(_react2['default'].Component);

exports['default'] = Handle;


Handle.propTypes = {
  className: _propTypes2['default'].string,
  vertical: _propTypes2['default'].bool,
  offset: _propTypes2['default'].number,
  handleStyle: _propTypes2['default'].object
};
module.exports = exports['default'];