import React from 'react';
import Tooltip from 'rc-tooltip';

export default class Handle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipVisible: false,
    };
  }

  hideTooltip() {
    this.setState({
      isTooltipVisible: false,
    });
  }

  showTooltip() {
    this.setState({
      isTooltipVisible: true,
    });
  }

  render() {
    const {
      prefixCls,
      tooltipPrefixCls,
      className,
      tipTransitionName,
      tipAlwaysVisible,
      tipFormatter,
      vertical,
      offset,
      value,
      dragging,
      noTip,
      index,
    } = this.props;

    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };

    let handleProps = {
      className,
      style,
    };

    if (!tipAlwaysVisible) {
      handleProps = {
        ...handleProps,
        onMouseUp: this.showTooltip.bind(this),
        onMouseEnter: this.showTooltip.bind(this),
        onMouseLeave: this.hideTooltip.bind(this),
      };
    }

    const handle = (
      <div {...handleProps} />
    );

    if (noTip) {
      return handle;
    }

    const isTooltipVisible = tipAlwaysVisible || dragging || this.state.isTooltipVisible;
    return (
      <Tooltip
        prefixCls={tooltipPrefixCls || `${prefixCls}-tooltip`}
        placement="top"
        visible={isTooltipVisible}
        overlay={<span>{tipFormatter(value, index)}</span>}
        delay={0}
        transitionName={tipTransitionName}
      >
        {handle}
      </Tooltip>
    );
  }
}

Handle.propTypes = {
  prefixCls: React.PropTypes.string,
  tooltipPrefixCls: React.PropTypes.string,
  className: React.PropTypes.string,
  vertical: React.PropTypes.bool,
  offset: React.PropTypes.number,
  tipTransitionName: React.PropTypes.string,
  tipAlwaysVisible: React.PropTypes.bool,
  tipFormatter: React.PropTypes.func,
  value: React.PropTypes.number,
  dragging: React.PropTypes.bool,
  noTip: React.PropTypes.bool,
  index: React.PropTypes.number,
};
