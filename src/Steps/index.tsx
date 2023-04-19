import * as React from 'react';
import type { InternalMarkObj } from '../Marks';
import SliderContext from '../context';
import Dot from './Dot';
import classNames from 'classnames';

export interface StepsProps {
  prefixCls: string;
  marks: InternalMarkObj[];
  dots?: boolean;
  style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
}

export default function Steps(props: StepsProps) {
  const { prefixCls, marks, dots, style, activeStyle } = props;
  const { min, max, step } = React.useContext(SliderContext);

  const marksValueRef = React.useRef<number[]>([]);

  // It defines the className for the marks dots.
  const marksDotClassName = `${prefixCls}-marks-dot`;

  const stepDots = React.useMemo(() => {
    const dotSet = new Set<number>();

    // Add marks
    marks.forEach((mark) => {
      dotSet.add(mark.value);
    });

    //Fill marksValue
    marksValueRef.current = Array.from(dotSet);

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
    <div className={`${prefixCls}-step`}>
      {stepDots.map((dotValue) => {
        // Check whether it is a marks dot
        const isMarksDot = marksValueRef.current.indexOf(dotValue) >= 0;

        return (
          <Dot
            prefixCls={prefixCls}
            className={classNames({
              [marksDotClassName]: isMarksDot,
            })}
            key={dotValue}
            value={dotValue}
            style={style}
            activeStyle={activeStyle}
          />
        );
      })}
    </div>
  );
}
