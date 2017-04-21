import React from 'react';
import PropTypes from 'prop-types';

export default class Handle extends React.Component {
  render() {
    const {
      className, vertical, offset, handleStyle, ...restProps,
    } = this.props;
    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };

    const elStyle = {
      ...style,
      ...handleStyle,
    };
    return <div {...restProps} className={className} style={elStyle} />;
  }
}

Handle.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  handleStyle: PropTypes.object,
};
