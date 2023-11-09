import cls from 'classnames';
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

export default function Mark(props: MarkProps) {
  const { prefixCls, style, children, value, onClick } = props;
  const { min, max, direction, includedStart, includedEnd, included, styles, classNames } =
    React.useContext(SliderContext);

  const textCls = `${prefixCls}-text`;
  const active = included && includedStart <= value && value <= includedEnd;

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max);

  return (
    <span
      className={cls(
        textCls,
        {
          [`${textCls}-active`]: active,
        },
        active && classNames.markActive,
        classNames.mark,
      )}
      style={{
        ...positionStyle,
        ...style,
        ...(active ? styles.markActive : {}),
        ...styles.mark,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </span>
  );
}
