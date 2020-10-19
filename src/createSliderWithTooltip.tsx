import React from 'react';
import Tooltip from './common/SliderTooltip';
import Handle from './Handle';

export interface ComponentWrapperProps {
  tipFormatter?: (value: number) => React.ReactNode;
  tipProps?: {
    prefixCls?: string;
    overlay?: string;
    placement?: string;
    visible?: boolean;
  };
  handleStyle?: React.CSSProperties;
  getTooltipContainer?: () => HTMLElement;
}

interface ComponentWrapperState {
  visibles: Record<number, boolean>;
}

export default function createSliderWithTooltip<Props>(Component: React.ComponentClass<Props>) {
  return class ComponentWrapper extends React.Component<
    ComponentWrapperProps & React.ComponentProps<typeof Component>,
    ComponentWrapperState
  > {
    static defaultProps = {
      tipFormatter(value: number) {
        return value;
      },
      handleStyle: [{}],
      tipProps: {},
      getTooltipContainer: node => node.parentNode,
    };

    state = {
      visibles: {},
    };

    handleTooltipVisibleChange = (index, visible) => {
      this.setState(prevState => {
        return {
          visibles: {
            ...prevState.visibles,
            [index]: visible,
          },
        };
      });
    };

    handleWithTooltip = ({ value, dragging, index, disabled, ...restProps }) => {
      const { tipFormatter, tipProps, handleStyle, getTooltipContainer } = this.props;

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
    };

    render() {
      return <Component {...this.props} handle={this.handleWithTooltip} />;
    }
  };
}
