import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';

export default class Handle extends React.Component {
  render() {
    const {
      className, vertical, offset, handleStyle, ...restProps,
    } = this.props;
    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    return <div {...restProps} className={className} style={assign({}, style, handleStyle)} />;
  }
}

Handle.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  handleStyle: PropTypes.object,
};
