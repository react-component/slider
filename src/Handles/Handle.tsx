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
  onChange: (value: number, valueIndex: number) => void;
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
    onChange,
    ...restProps
  } = props;
  const {
    min,
    max,
    step,
    direction,
    disabled,
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

      // Map the plus /  minus keys to the direction of the current handle
      let plusKeyCode: number;
      let minusKeyCode: number;

      switch (direction) {
        case 'btt':
          plusKeyCode = KeyCode.UP;
          minusKeyCode = KeyCode.DOWN;
          break;

        case 'ttb':
          plusKeyCode = KeyCode.DOWN;
          minusKeyCode = KeyCode.UP;
          break;

        case 'rtl':
          plusKeyCode = KeyCode.LEFT;
          minusKeyCode = KeyCode.RIGHT;
          break;

        default:
          plusKeyCode = KeyCode.RIGHT;
          minusKeyCode = KeyCode.LEFT;
          break;
      }

      // Change the value
      switch (e.which) {
        case KeyCode.HOME:
          onChange(min, valueIndex);
          break;

        case KeyCode.END:
          onChange(max, valueIndex);
          break;

        case KeyCode.PAGE_UP:
          if (step !== null) {
            onChange(value + step * 2, valueIndex);
          }
          break;

        case KeyCode.PAGE_DOWN:
          if (step !== null) {
            onChange(value - step * 2, valueIndex);
          }
          break;

        case plusKeyCode:
          if (step !== null) {
            onChange(value + step, valueIndex);
          }
          break;

        case minusKeyCode:
          if (step !== null) {
            onChange(value - step, valueIndex);
          }
          break;
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
