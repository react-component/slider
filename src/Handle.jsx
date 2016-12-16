import React from 'react';

export default class Handle extends React.Component {
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
  className: React.PropTypes.string,
  vertical: React.PropTypes.bool,
  offset: React.PropTypes.number,
};
