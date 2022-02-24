import * as React from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import SliderContext from '../context';
import { getDirectionStyle, getIndex } from '../util';

interface RenderProps {
  prefixCls: string;
  value: number;
  dragging: boolean;
}

export interface HandleProps {
  prefixCls: string;
  style?: React.CSSProperties;
  value: number;
  valueIndex: number;
  dragging: boolean;
  onStartMove: (e: React.MouseEvent, valueIndex: number) => void;
  onOffsetChange: (value: number | 'min' | 'max', valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  render?: (origin: React.ReactElement, props: RenderProps) => React.ReactElement;
}

const Handle = React.forwardRef((props: HandleProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    prefixCls,
    value,
    valueIndex,
    onStartMove,
    style,
    render,
    dragging,
    onOffsetChange,
    ...restProps
  } = props;
  const {
    min,
    max,
    step,
    direction,
    disabled,
    range,
    tabIndex,
    ariaLabelForHandle,
    ariaLabelledByForHandle,
    ariaValueTextFormatterForHandle,
  } = React.useContext(SliderContext);
  const handlePrefixCls = `${prefixCls}-handle`;

  // =========================== Keyboard ===========================
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!disabled) {
      e.preventDefault();

      let offset: number = 0;

      // Change the value
      switch (e.which || e.keyCode) {
        case KeyCode.LEFT:
          offset = direction === 'ltr' || direction === 'btt' ? -1 : 1;
          break;

        case KeyCode.RIGHT:
          offset = direction === 'ltr' || direction === 'btt' ? 1 : -1;
          break;

        // Up is plus
        case KeyCode.UP:
          offset = direction !== 'ttb' ? 1 : -1;
          break;

        // Down is minus
        case KeyCode.DOWN:
          offset = direction !== 'ttb' ? -1 : 1;
          break;

        case KeyCode.HOME:
          onOffsetChange('min', valueIndex);
          break;

        case KeyCode.END:
          onOffsetChange('max', valueIndex);
          break;

        case KeyCode.PAGE_UP:
          offset = 2;
          break;

        case KeyCode.PAGE_DOWN:
          offset = -2;
          break;
      }

      if (offset !== 0) {
        onOffsetChange(offset, valueIndex);
      }
    }
  };

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max);

  // ============================ Render ============================
  let handleNode = (
    <div
      ref={ref}
      className={classNames(handlePrefixCls, {
        [`${handlePrefixCls}-${valueIndex + 1}`]: range,
        [`${handlePrefixCls}-dragging`]: dragging,
      })}
      style={{
        ...positionStyle,
        ...style,
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          onStartMove(e, valueIndex);
        }
      }}
      onKeyDown={onKeyDown}
      tabIndex={disabled ? null : getIndex(tabIndex, valueIndex)}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
      aria-label={getIndex(ariaLabelForHandle, valueIndex)}
      aria-labelledby={getIndex(ariaLabelledByForHandle, valueIndex)}
      aria-valuetext={getIndex(ariaValueTextFormatterForHandle, valueIndex)?.(value)}
      {...restProps}
    />
  );

  // Customize
  if (render) {
    handleNode = render(handleNode, {
      prefixCls,
      value,
      dragging,
    });
  }

  return handleNode;
});

if (process.env.NODE_ENV !== 'production') {
  Handle.displayName = 'Handle';
}

export default Handle;
