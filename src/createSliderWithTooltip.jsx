import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';
import Handle from './Handle';

export default function createSliderWithTooltip(Component, autoDisable = false) {
  return class ComponentWrapper extends React.Component {
    static propTypes = {
      disabled: PropTypes.bool,
    }
    constructor(props) {
      super(props);
      this.state = { visibles: {} };
    }
    handleTooltipVisibleChange = (index, visible) => {
      if (this.props.disabled && autoDisable) {
        return;
      }
      this.setState({
        visibles: {
          ...this.state.visibles,
          [index]: visible,
        },
      });
    }
    handleWithTooltip = ({ value, dragging, index, ...restProps }) => {
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={this.state.visibles[index] || dragging}
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
