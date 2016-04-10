import React from 'react';
import classNames from 'classnames';

function calcPoints(vertical, marks, dots, step, min, max) {
  const points = Object.keys(marks).map(parseFloat);
  if (dots) {
    for (let i = min; i <= max; i = i + step) {
      if (points.indexOf(i) >= 0) continue;
      points.push(i);
    }
  }
  return points;
}

const Steps = ({prefixCls, vertical, marks, dots, step, included,
                lowerBound, upperBound, max, min}) => {
  const range = max - min;
  const elements = calcPoints(vertical, marks, dots, step, min, max).map((point) => {
    const offset = Math.abs(point - min) / range * 100 + '%';
    const style = vertical ? { bottom: offset } : { left: offset };

    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const pointClassName = classNames({
      [prefixCls + '-dot']: true,
      [prefixCls + '-dot-active']: isActived,
    });

    return <span className={pointClassName} style={style} key={point} />;
  });

  return <div className={prefixCls + '-step'}>{elements}</div>;
};

export default Steps;
