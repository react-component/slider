import React from 'react';
import Mark from './Mark';

export interface InternalMarkObj {
  label?: React.ReactNode;
  value: number;
}

export interface MarksProps {
  marks: InternalMarkObj[];
  onClick: (value: number) => void;
  className?: string;
  markClassName?: string;
  activeMarkClassName?: string;
}

export default function Marks({
  className,
  markClassName,
  activeMarkClassName,
  marks,
  onClick,
}: MarksProps) {
  // Not render mark if empty
  if (marks.length === 0) {
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
