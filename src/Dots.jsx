import React from 'react';
import classNames from 'classnames';

function calcPoints(marks, dots, step, min, max) {
  const points = Object.keys(marks).map(parseFloat);
  if (dots && step) {
    for (let i = min; i <= max; i = i + step) {
      if (points.indexOf(i) >= 0) continue;
      points.push(i);
    }
  }
  return points;
}

const Dots = ({prefixCls, marks, dots, step, included, lowerBound, upperBound, max, min}) => {
  if (!dots) return <div></div>;
  const range = max - min;
  const elements = calcPoints(marks, dots, step, min, max).map((point) => {
    const offset = (point - min) / range * 100 + '%';
    const style = { left: offset };

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

export default Dots;
