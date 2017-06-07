import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import Handle from './Handle';

export default function createSliderWithTooltip(Component) {
  return class ComponentWrapper extends React.Component {
    static propTypes = {
      tipFormatter: PropTypes.func,
      handleStyle: PropTypes.arrayOf(PropTypes.object),
      tipProps: PropTypes.object,
    };
    static defaultProps = {
      tipFormatter(value) { return value; },
      handleStyle: [{}],
      tipProps: {},
    };
    constructor(props) {
      super(props);
      this.state = { visibles: {} };
    }
    handleTooltipVisibleChange = (index, visible) => {
      this.setState((prevState) => {
        return {
          visibles: {
            ...prevState.visibles,
            [index]: visible,
          },
        };
      });
    }
    handleWithTooltip = ({ value, dragging, index, disabled, ...restProps }) => {
      const {
        tipFormatter,
        tipProps,
        handleStyle,
      } = this.props;

      const {
        prefixCls = 'rc-slider-tooltip',
        overlay = tipFormatter(value),
        placement = 'top',
        ...restTooltipProps,
      } = tipProps;

      return (
        <Tooltip
          visible={!disabled && (this.state.visibles[index] || dragging)}
          key={index}
          prefixCls={prefixCls}
          overlay={overlay}
          placement={placement}
          {...restTooltipProps}
        >
          <Handle
            {...restProps}
            style={{
              ...handleStyle[0],
            }}
            value={value}
            onMouseEnter={() => this.handleTooltipVisibleChange(index, true)}
            onMouseLeave={() => this.handleTooltipVisibleChange(index, false)}
          />
        </Tooltip>
      );
    }
    render() {
      return <Component {...this.props} handle={this.handleWithTooltip} />;
    }
  };
}
