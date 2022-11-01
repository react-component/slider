import React from 'react';
import { InternalMarkObj } from '../Marks';
import SliderContext from '../context';
import Dot from './Dot';

export interface StepsProps {
  marks: InternalMarkObj[];
  dots?: boolean;
  className?: string;
  dotClassName?: string;
  activeClassName?: string;
}

export default function Steps(props: StepsProps) {
  const { marks, dots, className, dotClassName, activeClassName } = props;
  const { min, max, step } = React.useContext(SliderContext);

  const stepDots = React.useMemo(() => {
    const dotSet = new Set<number>();

    // Add marks
    marks.forEach((mark) => {
      dotSet.add(mark.value);
    });

    // Fill dots
    if (dots && step !== null) {
      let current = min;
      while (current <= max) {
        dotSet.add(current);
        current += step;
      }
    }

    return Array.from(dotSet);
  }, [min, max, step, dots, marks]);

  return (
    <div className={className}>
      {stepDots.map((dotValue) => (
        <Dot
          key={dotValue}
          value={dotValue}
          className={dotClassName}
          activeClassName={activeClassName}
        />
      ))}
    </div>
  );
}
