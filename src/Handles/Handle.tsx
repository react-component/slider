import cls from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';
import SliderContext from '../context';
import type { OnStartMove } from '../interface';
import { getDirectionStyle, getIndex } from '../util';

interface RenderProps {
  index: number;
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
  onStartMove: OnStartMove;
  onOffsetChange: (value: number | 'min' | 'max', valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  render?: (origin: React.ReactElement<HandleProps>, props: RenderProps) => React.ReactElement;
  onChangeComplete?: () => void;
}

const Handle = React.forwardRef<HTMLDivElement, HandleProps>((props, ref) => {
  const {
    prefixCls,
    value,
    valueIndex,
    onStartMove,
    style,
    render,
    dragging,
    onOffsetChange,
    onChangeComplete,
    ...restProps
  } = props;
  const {
    min,
    max,
    direction,
    disabled,
    keyboard,
    range,
    tabIndex,
    ariaLabelForHandle,
    ariaLabelledByForHandle,
    ariaValueTextFormatterForHandle,
    styles,
    classNames,
  } = React.useContext(SliderContext);

  const handlePrefixCls = `${prefixCls}-handle`;

  // ============================ Events ============================
  const onInternalStartMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!disabled) {
      onStartMove(e, valueIndex);
    }
  };

  // =========================== Keyboard ===========================
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!disabled && keyboard) {
      let offset: number | 'min' | 'max' = null;

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
          offset = 'min';
          break;

        case KeyCode.END:
          offset = 'max';
          break;

        case KeyCode.PAGE_UP:
          offset = 2;
          break;

        case KeyCode.PAGE_DOWN:
          offset = -2;
          break;
      }

      if (offset !== null) {
        e.preventDefault();
        onOffsetChange(offset, valueIndex);
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.which || e.keyCode) {
      case KeyCode.LEFT:
      case KeyCode.RIGHT:
      case KeyCode.UP:
      case KeyCode.DOWN:
      case KeyCode.HOME:
      case KeyCode.END:
      case KeyCode.PAGE_UP:
      case KeyCode.PAGE_DOWN:
        onChangeComplete?.();
        break;
    }
  };

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max);

  // ============================ Render ============================
  let handleNode = (
    <div
      ref={ref}
      className={cls(
        handlePrefixCls,
        {
          [`${handlePrefixCls}-${valueIndex + 1}`]: range,
          [`${handlePrefixCls}-dragging`]: dragging,
        },
        classNames.handle,
      )}
      style={{
        ...positionStyle,
        ...style,
        ...styles.handle,
      }}
      onMouseDown={onInternalStartMove}
      onTouchStart={onInternalStartMove}
      onKeyDown={onKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={disabled ? null : getIndex(tabIndex, valueIndex)}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
      aria-label={getIndex(ariaLabelForHandle, valueIndex)}
      aria-labelledby={getIndex(ariaLabelledByForHandle, valueIndex)}
      aria-valuetext={getIndex(ariaValueTextFormatterForHandle, valueIndex)?.(value)}
      aria-orientation={direction === 'ltr' || direction === 'rtl' ? 'horizontal' : 'vertical'}
      {...restProps}
    />
  );

  // Customize
  if (render) {
    handleNode = render(handleNode, {
      index: valueIndex,
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
