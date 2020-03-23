import React from 'react';
import classNames from 'classnames';
import warning from 'rc-util/lib/warning';

const calcPoints = (vertical, marks, dots, step, min, max) => {
  warning(
    dots ? step > 0 : true,
    '`Slider[step]` should be a positive number in order to make Slider[dots] work.',
  );
  const points = Object.keys(marks)
    .map(parseFloat)
    .sort((a, b) => a - b);
  if (dots && step) {
    for (let i = min; i <= max; i += step) {
      if (points.indexOf(i) === -1) {
        points.push(i);
      }
    }
  }
  return points;
};

const Steps = ({
  prefixCls,
  vertical,
  reverse,
  marks,
  dots,
  step,
  included,
  lowerBound,
  upperBound,
  max,
  min,
  dotStyle,
  activeDotStyle,
}) => {
  const range = max - min;
  const elements = calcPoints(vertical, marks, dots, step, min, max).map(point => {
    const offset = `${(Math.abs(point - min) / range) * 100}%`;

    const isActived =
      (!included && point === upperBound) ||
      (included && point <= upperBound && point >= lowerBound);
    let style = vertical
      ? { ...dotStyle, [reverse ? 'top' : 'bottom']: offset }
      : { ...dotStyle, [reverse ? 'right' : 'left']: offset };
    if (isActived) {
      style = { ...style, ...activeDotStyle };
    }

    const pointClassName = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived,
      [`${prefixCls}-dot-reverse`]: reverse,
    });

    return <span className={pointClassName} style={style} key={point} />;
  });

  return <div className={`${prefixCls}-step`}>{elements}</div>;
};

export default Steps;
