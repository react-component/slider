import React, { PropTypes } from 'react';

export default class Handle extends React.Component {
  render() {
    const {
      className, vertical, offset, maximumTrackTintColor, disabled, ...restProps,
    } = this.props;
    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    if (maximumTrackTintColor && !disabled) {
      style.borderColor = maximumTrackTintColor;
    }
    return <div {...restProps} className={className} style={style} />;
  }
}

Handle.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  maximumTrackTintColor: PropTypes.string,
  disabled: PropTypes.bool,
};
