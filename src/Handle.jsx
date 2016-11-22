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
      tipFormatter,
      vertical,
      offset,
      value,
      dragging,
      noTip,
    } = this.props;

    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const handle = (
      <div className={className} style={style}
        onMouseUp={this.showTooltip.bind(this)}
        onMouseEnter={this.showTooltip.bind(this)}
        onMouseLeave={this.hideTooltip.bind(this)}
      />
    );

    if (noTip) {
      return handle;
    }

    const isTooltipVisible = dragging || this.state.isTooltipVisible;
    return (
      <Tooltip
        prefixCls={tooltipPrefixCls || `${prefixCls}-tooltip`}
        placement="top"
        visible={isTooltipVisible}
        overlay={<span>{tipFormatter(value)}</span>}
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
  tipFormatter: React.PropTypes.func,
  value: React.PropTypes.number,
  dragging: React.PropTypes.bool,
  noTip: React.PropTypes.bool,
};
