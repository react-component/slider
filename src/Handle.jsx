import React from 'react';

export default class Handle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      vertical,
      offset,
    } = this.props;

    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const handle = (
      <div className={className} style={style} />
    );

    return handle;
  }
}

Handle.propTypes = {
  prefixCls: React.PropTypes.string,
  className: React.PropTypes.string,
  vertical: React.PropTypes.bool,
  offset: React.PropTypes.number,
  value: React.PropTypes.number,
  dragging: React.PropTypes.bool,
  index: React.PropTypes.number,
};
