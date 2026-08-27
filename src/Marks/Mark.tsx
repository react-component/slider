import { clsx } from 'clsx';
import { KeyCode } from '@rc-component/util';
import * as React from 'react';
import SliderContext from '../context';
import { getDirectionStyle } from '../util';

export interface MarkProps {
  prefixCls: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  value: number;
  onClick: (value: number) => void;
}

const Mark: React.FC<MarkProps> = (props) => {
  const { prefixCls, style, children, value, onClick } = props;
  const { min, max, direction, disabled, includedStart, includedEnd, included } =
    React.useContext(SliderContext);

  const textCls = `${prefixCls}-text`;

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max);

  return (
    <span
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      className={clsx(textCls, {
        [`${textCls}-active`]: included && includedStart <= value && value <= includedEnd,
      })}
      style={{ ...positionStyle, ...style }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        if (!disabled) {
          onClick(value);
        }
      }}
      onKeyDown={(event) => {
        if (!disabled && (event.which === KeyCode.ENTER || event.which === KeyCode.SPACE)) {
          event.preventDefault();
          onClick(value);
        }
      }}
    >
      {children}
    </span>
  );
};

export default Mark;
