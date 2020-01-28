import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import Handle from './Handle';

export default function createSliderWithTooltip(Component) {
  return class ComponentWrapper extends React.Component {
    static propTypes = {
      tipFormatter: PropTypes.func,
      handleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
      tipProps: PropTypes.object,
      getTooltipContainer: PropTypes.func,
    };
    static defaultProps = {
      tipFormatter(value) { return value; },
      handleStyle: [{}],
      tipProps: {},
      getTooltipContainer: node => node.parentNode,
    };
    state = {
      visibles: {},
    };
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
        getTooltipContainer,
      } = this.props;

      const {
        prefixCls = 'rc-slider-tooltip',
        overlay = tipFormatter(value),
        placement = 'top',
        visible = false,
        ...restTooltipProps
      } = tipProps;

      let handleStyleWithIndex;
      if (Array.isArray(handleStyle)) {
        handleStyleWithIndex = handleStyle[index] || handleStyle[0];
      } else {
        handleStyleWithIndex = handleStyle;
      }

      return (
        <Tooltip
          {...restTooltipProps}
          getTooltipContainer={getTooltipContainer}
          prefixCls={prefixCls}
          overlay={overlay}
          placement={placement}
          visible={(!disabled && (this.state.visibles[index] || dragging)) || visible}
          key={index}
        >

          <Handle
            {...restProps}
            style={{
              ...handleStyleWithIndex,
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
