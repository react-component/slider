import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

var Handle = function (_React$Component) {
  _inherits(Handle, _React$Component);

  function Handle() {
    _classCallCheck(this, Handle);

    return _possibleConstructorReturn(this, (Handle.__proto__ || Object.getPrototypeOf(Handle)).apply(this, arguments));
  }

  _createClass(Handle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          vertical = _props.vertical,
          offset = _props.offset,
          handleStyle = _props.handleStyle,
          restProps = _objectWithoutProperties(_props, ['className', 'vertical', 'offset', 'handleStyle']);

      var style = vertical ? { bottom: offset + '%' } : { left: offset + '%' };

      var elStyle = _extends({}, style, handleStyle);
      return React.createElement('div', _extends({}, restProps, { className: className, style: elStyle }));
    }
  }]);

  return Handle;
}(React.Component);

export default Handle;


Handle.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  handleStyle: PropTypes.object
};