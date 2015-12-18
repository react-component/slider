import React from 'react';
import Tooltip from 'rc-tooltip';

export default class Handle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipVisible: false,
    };
  }

  showTooltip() {
    this.setState({
      isTooltipVisible: true,
    });
  }

  hideTooltip() {
    this.setState({
      isTooltipVisible: false,
    });
  }

  render() {
    const props = this.props;
    const {className, tipTransitionName, tipFormatter, offset, value} = props;
    const {dragging, noTip} = props;

    const style = { left: offset + '%' };
    const handle = (<div className={className} style={style}
                      onMouseUp={this.showTooltip.bind(this)}
                      onMouseEnter={this.showTooltip.bind(this)}
                      onMouseLeave={this.hideTooltip.bind(this)}/>);

    if (noTip) {
      return handle;
    }

    const isTooltipVisible = dragging || this.state.isTooltipVisible;
    return (<Tooltip
              prefixCls={className.replace('slider-handle', 'tooltip')}
              placement="top"
              visible={isTooltipVisible}
              overlay={<span>{tipFormatter(value)}</span>}
              delay={0}
              transitionName={tipTransitionName}>
              {handle}
            </Tooltip>);
  }
}

Handle.propTypes = {
  className: React.PropTypes.string,
  offset: React.PropTypes.number,
  tipTransitionName: React.PropTypes.string,
  tipFormatter: React.PropTypes.func,
  value: React.PropTypes.number,
  dragging: React.PropTypes.bool,
  noTip: React.PropTypes.bool,
};
