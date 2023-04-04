import * as React from 'react';
import Mark from './Mark';

export interface MarkObj {
  style?: React.CSSProperties;
  label?: React.ReactNode;
}

export interface InternalMarkObj extends MarkObj {
  value: number;
}

export interface MarksProps {
  prefixCls: string;
  marks?: InternalMarkObj[];
}

export default function Marks(props: MarksProps) {
  const { prefixCls, marks } = props;

  const markPrefixCls = `${prefixCls}-mark`;

  // Not render mark if empty
  if (!marks.length) {
    return null;
  }

  return (
    <div className={markPrefixCls}>
      {marks.map(({ value, style, label }) => (
        <Mark key={value} prefixCls={markPrefixCls} style={style} value={value}>
          {label}
        </Mark>
      ))}
    </div>
  );
}
