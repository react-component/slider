import React, { PropTypes } from 'react';

export default class Handle extends React.Component {
  render() {
    const {
      className, vertical, offset, minimumTrackTintColor, disabled, ...restProps,
    } = this.props;
    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    if (minimumTrackTintColor && !disabled) {
      style.borderColor = minimumTrackTintColor;
    }
    return <div {...restProps} className={className} style={style} />;
  }
}

Handle.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  minimumTrackTintColor: PropTypes.string,
  disabled: PropTypes.bool,
};
