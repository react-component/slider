import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

function calcPoints(marks, dots, step, min, max) {
  warning(
    dots ? step > 0 : true,
    '`Slider[step]` should be a positive number in order to make Slider[dots] work.'
  );
  const points = Object.keys(marks).map(parseFloat);
  if (dots) {
    for (let i = min; i <= max; i = i + step) {
      if (points.indexOf(i) >= 0) continue;
      points.push(i);
    }
  }
  return points;
}

const Steps = ({ prefixCls, marks, dots, step, included,
                lowerBound, upperBound, max, min }) => {
  const range = max - min;
  const elements = calcPoints(marks, dots, step, min, max).map((point) => {
    const offset = `${Math.abs(point - min) / range * 100}%`;
    const style = { left: offset };

    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const pointClassName = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived,
    });

    return <span className={`${prefixCls}-dot-wrapper`}><span className={pointClassName} key={point} /></span>;
  });

  return <div className={`${prefixCls}-step`}>{elements}</div>;
};

export default Steps;
