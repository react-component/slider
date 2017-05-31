import React from 'react';
import PropTypes from 'prop-types';

export default class Handle extends React.Component {
  render() {
    const {
      className, vertical, offset, handleStyle, disabled, min, max, value, ...restProps,
    } = this.props;

    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const elStyle = { ...style, ...handleStyle };
    return (
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        {...restProps}
        className={className}
        style={elStyle}
      />
    );
  }
}

Handle.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  handleStyle: PropTypes.object,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
};
