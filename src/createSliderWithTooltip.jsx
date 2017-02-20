import React from 'react';
import Tooltip from 'rc-tooltip';
import Handle from './Handle';

export default function createSliderWithTooltip(Component) {
  return class ComponentWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { visibles: {} };
    }
    handleTooltipVisibleChange = (index, visible) => {
      this.setState({
        visibles: {
          ...this.state.visibles,
          [index]: visible,
        },
      });
    }
    handleWithTooltip = ({ value, dragging, index, disabled, ...restProps }) => {
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={!disabled && (this.state.visibles[index] || dragging)}
          onVisibleChange={visible => this.handleTooltipVisibleChange(index, visible)}
          placement="top"
          key={index}
        >
          <Handle {...restProps} />
        </Tooltip>
      );
    }
    render() {
      return <Component {...this.props} handle={this.handleWithTooltip} />;
    }
  };
}
