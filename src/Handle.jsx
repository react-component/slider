import React from 'react';
import Tooltip from 'rc-tooltip';

export default class Handle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipVisible: false,
    };
  }

  render() {
    const props = this.props;
    const {className, tipTransitionName, offset, value} = props;
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
              prefixCls={className.replace('handle', 'tooltip')}
              placement={{points: ['bc', 'tc']}}
              visible={isTooltipVisible}
              overlay={<span>{value}</span>}
              delay={0}
              transitionName={tipTransitionName}>
              {handle}
            </Tooltip>);
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
}

Handle.propTypes = {
  className: React.PropTypes.string,
  offset: React.PropTypes.number,
  tipTransitionName: React.PropTypes.string,
  value: React.PropTypes.number,
  dragging: React.PropTypes.bool,
  noTip: React.PropTypes.bool,
};
