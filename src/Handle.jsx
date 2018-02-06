import React from 'react';
import PropTypes from 'prop-types';

export default class Handle extends React.Component {
  focus() {
    this.handle.focus();
  }

  blur() {
    this.handle.blur();
  }

  render() {
    const {
      className, vertical, offset, style, disabled, min, max, value, tabIndex, ...restProps,
    } = this.props;

    const postionStyle = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const elStyle = {
      ...style,
      ...postionStyle,
    };
    let ariaProps = {};
    if (value !== undefined) {
      ariaProps = {
        ...ariaProps,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': value,
        'aria-disabled': !!disabled,
      };
    }
    return (
      <div
        ref={node => (this.handle = node)}
        role="slider"
        tabIndex= {tabIndex || 0}
        {...ariaProps}
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
  style: PropTypes.object,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  tabIndex: PropTypes.number,
};
