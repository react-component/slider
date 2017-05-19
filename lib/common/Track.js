'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Track = function Track(_ref) {
  var className = _ref.className,
      included = _ref.included,
      vertical = _ref.vertical,
      offset = _ref.offset,
      length = _ref.length,
      minimumTrackStyle = _ref.minimumTrackStyle;

  var style = {
    visibility: included ? 'visible' : 'hidden'
  };
  if (vertical) {
    style.bottom = offset + '%';
    style.height = length + '%';
  } else {
    style.left = offset + '%';
    style.width = length + '%';
  }
  var elStyle = (0, _extends3['default'])({}, style, minimumTrackStyle);
  return _react2['default'].createElement('div', { className: className, style: elStyle });
};

exports['default'] = Track;
module.exports = exports['default'];