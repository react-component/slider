import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import Handle from './Handle';

export default function createSliderWithTooltip(Component) {
  return class ComponentWrapper extends React.Component {
    static propTypes = {
      tipFormatter: PropTypes.func,
    };
    static defaultProps = {
      tipFormatter(value) { return value; },
    };
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
      const { tipFormatter } = this.props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={tipFormatter(value)}
          visible={!disabled && (this.state.visibles[index] || dragging)}
          placement="top"
          key={index}
        >
          <Handle
            {...restProps}
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
