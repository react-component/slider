import { clsx } from 'clsx';
import { KeyCode } from '@rc-component/util';
import * as React from 'react';
import SliderContext from '../context';
import type { OnStartMove } from '../interface';
import { getDirectionStyle, getIndex } from '../util';

interface RenderProps {
  index: number;
  prefixCls: string;
  value: number;
  dragging: boolean;
  draggingDelete: boolean;
}

export interface HandleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onFocus' | 'onMouseEnter'> {
  prefixCls: string;
  style?: React.CSSProperties;
  value: number;
  valueIndex: number;
  dragging: boolean;
  draggingDelete: boolean;
  onStartMove: OnStartMove;
  onDelete?: (index: number) => void;
  onOffsetChange: (value: number | 'min' | 'max', valueIndex: number) => void;
  onFocus: (e: React.FocusEvent<HTMLDivElement>, index: number) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  render?: (
    origin: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>,
    props: RenderProps,
  ) => React.ReactElement;
  onChangeComplete?: () => void;
  mock?: boolean;
}

const Handle = React.forwardRef<HTMLDivElement, HandleProps>((props, ref) => {
  const {
    prefixCls,
    value,
    valueIndex,
    onStartMove,
    onDelete,
    style,
    render,
    dragging,
    draggingDelete,
    onOffsetChange,
    onChangeComplete,
    onFocus,
    onMouseEnter,
    ...restProps
  } = props;
  const {
    min,
    max,
    direction,
    keyboard,
    range,
    tabIndex,
    ariaLabelForHandle,
    ariaLabelledByForHandle,
    ariaRequired,
    ariaValueTextFormatterForHandle,
    styles,
    classNames,
    isHandleDisabled,
  } = React.useContext(SliderContext);

  const mergedDisabled = isHandleDisabled(valueIndex);

  const handlePrefixCls = `${prefixCls}-handle`;

  // ============================ Events ============================
  const onInternalStartMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (mergedDisabled) {
      e.stopPropagation();
      return;
    }
    onStartMove(e, valueIndex);
  };

  const onInternalFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(e, valueIndex);
  };

  const onInternalMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter(e, valueIndex);
  };

  // =========================== Keyboard ===========================
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!mergedDisabled && keyboard) {
      let offset: number | 'min' | 'max' | undefined;

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

        case KeyCode.BACKSPACE:
        case KeyCode.DELETE:
          onDelete?.(valueIndex);
          break;
      }

      if (offset !== undefined) {
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
  let divProps: React.HtmlHTMLAttributes<HTMLDivElement> = {};

  if (valueIndex !== null) {
    divProps = {
      tabIndex: mergedDisabled ? undefined : getIndex(tabIndex, valueIndex) ?? undefined,
      role: 'slider',
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
      'aria-disabled': mergedDisabled,
      'aria-label': getIndex(ariaLabelForHandle, valueIndex),
      'aria-labelledby': getIndex(ariaLabelledByForHandle, valueIndex),
      'aria-required': getIndex(ariaRequired, valueIndex),
      'aria-valuetext': getIndex(ariaValueTextFormatterForHandle, valueIndex)?.(value),
      'aria-orientation': direction === 'ltr' || direction === 'rtl' ? 'horizontal' : 'vertical',
      onMouseDown: onInternalStartMove,
      onTouchStart: onInternalStartMove,
      onFocus: onInternalFocus,
      onMouseEnter: onInternalMouseEnter,
      onKeyDown,
      onKeyUp: handleKeyUp,
    };
  }

  let handleNode = (
    <div
      ref={ref}
      className={clsx(
        handlePrefixCls,
        {
          [`${handlePrefixCls}-${valueIndex + 1}`]: valueIndex !== null && range,
          [`${handlePrefixCls}-dragging`]: dragging,
          [`${handlePrefixCls}-dragging-delete`]: draggingDelete,
          [`${handlePrefixCls}-disabled`]: mergedDisabled,
        },
        classNames.handle,
      )}
      style={{ ...positionStyle, ...style, ...styles.handle }}
      {...divProps}
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
      draggingDelete,
    });
  }

  return handleNode;
});

if (process.env.NODE_ENV !== 'production') {
  Handle.displayName = 'Handle';
}

export default Handle;
