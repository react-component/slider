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
  marks?: InternalMarkObj[];
  onClick: (value: number) => void;
  className?: string;
  markClassName?: string;
  activeMarkClassName?: string;
}

export default function Marks(props: MarksProps) {
  const { className, markClassName, activeMarkClassName, marks, onClick } = props;

  // Not render mark if empty
  if (!marks.length) {
    return null;
  }

  return (
    <div className={className}>
      {marks.map(({ value, style, label }) => (
        <Mark
          key={value}
          className={markClassName}
          activeClassName={activeMarkClassName}
          style={style}
          value={value}
          onClick={onClick}
        >
          {label}
        </Mark>
      ))}
    </div>
  );
}
