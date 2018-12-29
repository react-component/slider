import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

export default class Handle extends React.Component {
  state = {
    clickFocused: false,
  }

  componentDidMount() {
    // mouseup won't trigger if mouse moved out of handle,
    // so we listen on document here.
    this.onMouseUpListener = addEventListener(document, 'mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    if (this.onMouseUpListener) {
      this.onMouseUpListener.remove();
    }
  }

  setHandleRef = (node) => {
    this.handle = node;
  };

  setClickFocus(focused) {
    this.setState({ clickFocused: focused });
  }

  handleMouseUp = () => {
    if (document.activeElement === this.handle) {
      this.setClickFocus(true);
    }
  }

  handleBlur = () => {
    this.setClickFocus(false);
  }

  handleKeyDown = () => {
    this.setClickFocus(false);
  }

  clickFocus() {
    this.setClickFocus(true);
    this.focus();
  }

  focus() {
    this.handle.focus();
  }

  blur() {
    this.handle.blur();
  }

  render() {
    const {
      prefixCls, vertical, offset, style, disabled, min, max, value, tabIndex, ...restProps
    } = this.props;

    const className = classNames(
      this.props.className,
      {
        [`${prefixCls}-handle-click-focused`]: this.state.clickFocused,
      }
    );

    const postionStyle = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const elStyle = {
      ...style,
      ...postionStyle,
    };

    return (
      <div
        ref={this.setHandleRef}
        tabIndex= {disabled
          ? null
          : tabIndex === null
            ? null
            : (tabIndex || 0)}
        {...restProps}
        className={className}
        style={elStyle}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}

        // aria attribute
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={!!disabled}
      />
    );
  }
}

Handle.propTypes = {
  prefixCls: PropTypes.string,
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
