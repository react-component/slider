import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import Handle from './Handle';

export default function createSliderWithTooltip(Component) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(ComponentWrapper, _React$Component);

    function ComponentWrapper(props) {
      _classCallCheck(this, ComponentWrapper);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.handleTooltipVisibleChange = function (index, visible) {
        _this.setState(function (prevState) {
          var _extends2;

          return {
            visibles: _extends({}, prevState.visibles, (_extends2 = {}, _extends2[index] = visible, _extends2))
          };
        });
      };

      _this.handleWithTooltip = function (_ref) {
        var value = _ref.value,
            dragging = _ref.dragging,
            index = _ref.index,
            disabled = _ref.disabled,
            restProps = _objectWithoutProperties(_ref, ['value', 'dragging', 'index', 'disabled']);

        var _this$props = _this.props,
            tipFormatter = _this$props.tipFormatter,
            tipProps = _this$props.tipProps,
            handleStyle = _this$props.handleStyle;

        var _tipProps$prefixCls = tipProps.prefixCls,
            prefixCls = _tipProps$prefixCls === undefined ? 'rc-slider-tooltip' : _tipProps$prefixCls,
            _tipProps$overlay = tipProps.overlay,
            overlay = _tipProps$overlay === undefined ? tipFormatter(value) : _tipProps$overlay,
            _tipProps$placement = tipProps.placement,
            placement = _tipProps$placement === undefined ? 'top' : _tipProps$placement,
            _tipProps$visible = tipProps.visible,
            visible = _tipProps$visible === undefined ? visible || false : _tipProps$visible,
            restTooltipProps = _objectWithoutProperties(tipProps, ['prefixCls', 'overlay', 'placement', 'visible']);

        var handleStyleWithIndex = void 0;
        if (Array.isArray(handleStyle)) {
          handleStyleWithIndex = handleStyle[index] || handleStyle[0];
        } else {
          handleStyleWithIndex = handleStyle;
        }

        return React.createElement(
          Tooltip,
          _extends({}, restTooltipProps, {
            prefixCls: prefixCls,
            overlay: overlay,
            placement: placement,
            visible: !disabled && (_this.state.visibles[index] || dragging) || visible,
            key: index
          }),
          React.createElement(Handle, _extends({}, restProps, {
            style: _extends({}, handleStyleWithIndex),
            value: value,
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

    ComponentWrapper.prototype.render = function render() {
      return React.createElement(Component, _extends({}, this.props, { handle: this.handleWithTooltip }));
    };

    return ComponentWrapper;
  }(React.Component), _class.propTypes = {
    tipFormatter: PropTypes.func,
    handleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    tipProps: PropTypes.object
  }, _class.defaultProps = {
    tipFormatter: function tipFormatter(value) {
      return value;
    },

    handleStyle: [{}],
    tipProps: {}
  }, _temp;
}