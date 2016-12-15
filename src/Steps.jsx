import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

function calcPoints(vertical, marks, dots, step, min, max) {
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

const Steps = ({ prefixCls, vertical, reverse, marks, dots, step, included,
                lowerBound, upperBound, max, min }) => {
  const range = max - min;
  const elements = calcPoints(vertical, marks, dots, step, min, max).map((point) => {
    const offset = `${Math.abs(point - min) / range * 100}%`;
    let style = { left: offset };
    if (vertical) {
      if (reverse) {
        style = { top: offset };
      } else {
        style = { bottom: offset };
      }
    } else {
      if (reverse) {
        style = { right: offset };
      }
    }

    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const pointClassName = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived,
    });

    return <span className={pointClassName} style={style} key={point} />;
  });

  return <div className={`${prefixCls}-step`}>{elements}</div>;
};

export default Steps;
