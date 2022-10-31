import React from 'react';
import Mark from './Mark';

export interface InternalMarkObj {
  label?: React.ReactNode;
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
  if (!marks?.length) {
    return null;
  }

  return (
    <div className={className}>
      {marks.map(({ value, label }) => (
        <Mark
          key={value}
          className={markClassName}
          activeClassName={activeMarkClassName}
          value={value}
          onClick={onClick}
        >
          {label}
        </Mark>
      ))}
    </div>
  );
}
