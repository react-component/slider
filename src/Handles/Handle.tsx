import * as React from 'react';
import clsx from 'clsx';
import SliderContext from '../context';
import { getDirectionStyle, getIndex } from '../util';
import type { OnStartMove } from '../interface';

interface RenderProps {
  index: number;
  value: number;
  dragging: boolean;
}

export interface HandleProps {
  className?: string;
  draggingClassName?: string;
  value: number;
  valueIndex: number;
  dragging: boolean;
  onStartMove: OnStartMove;
  onOffsetChange: (value: number | 'min' | 'max', valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  render?: (origin: React.ReactElement<HandleProps>, props: RenderProps) => React.ReactElement;
}

const Handle = React.forwardRef<HTMLDivElement, HandleProps>(
  (
    {
      className,
      draggingClassName,
      value,
      valueIndex,
      onStartMove,
      render,
      dragging,
      onOffsetChange,
      ...restProps
    },
    ref,
  ) => {
    const {
      min,
      max,
      direction,
      disabled,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaValueTextFormatterForHandle,
    } = React.useContext(SliderContext);

    // ============================ Events ============================
    const onInternalStartMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!disabled) {
        onStartMove(e, valueIndex);
      }
    };

    // =========================== Keyboard ===========================
    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (!disabled) {
        let offset: number | 'min' | 'max' | null = null;

        // Change the value
        switch (e.key) {
          case 'ArrowLeft':
            offset = direction === 'ltr' || direction === 'btt' ? -1 : 1;
            break;

          case 'ArrowRight':
            offset = direction === 'ltr' || direction === 'btt' ? 1 : -1;
            break;

          // Up is plus
          case 'ArrowUp':
            offset = direction !== 'ttb' ? 1 : -1;
            break;

          // Down is minus
          case 'ArrowDown':
            offset = direction !== 'ttb' ? -1 : 1;
            break;

          case 'Home':
            offset = 'min';
            break;

          case 'End':
            offset = 'max';
            break;

          case 'PageUp':
            offset = 2;
            break;

          case 'PageDown':
            offset = -2;
            break;
        }

        if (offset !== null) {
          e.preventDefault();
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
        className={clsx(className, dragging && draggingClassName)}
        style={positionStyle}
        onMouseDown={onInternalStartMove}
        onTouchStart={onInternalStartMove}
        onKeyDown={onKeyDown}
        tabIndex={disabled ? undefined : getIndex(tabIndex, valueIndex) ?? undefined}
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
        index: valueIndex,
        value,
        dragging,
      });
    }

    return handleNode;
  },
);

if (process.env.NODE_ENV !== 'production') {
  Handle.displayName = 'Handle';
}

export default Handle;
