import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';

const calcPoints = (vertical, marks, dots, step, min, max) => {
  warning(
    dots ? step > 0 : true,
    '`Slider[step]` should be a positive number in order to make Slider[dots] work.'
  );
  const points = Object.keys(marks).map(parseFloat).sort((a, b) => a - b);
  if (dots) {
    for (let i = min; i <= max; i += step) {
      if (points.indexOf(i) === -1) {
        points.push(i);
      }
    }
  }
  return points;
};

const Steps = ({ prefixCls, vertical, marks, dots, step, included,
  lowerBound, upperBound, max, min, dotStyle, activeDotStyle }) => {
  const range = max - min;
  const elements = calcPoints(vertical, marks, dots, step, min, max).map((point) => {
    const offset = `${Math.abs(point - min) / range * 100}%`;
    const mark = marks[point];

    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    let style = vertical ? { bottom: offset, ...dotStyle } : { left: offset, ...dotStyle };

    if (mark && mark.dotStyle) {
      style = { ...style, ...mark.dotStyle };
    }

    if (isActived) {
      style = { ...style, ...activeDotStyle };

      if (mark && mark.activeDotStyle) {
        style = { ...style, ...mark.activeDotStyle };
      }
    }

    const pointClassName = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived,
    });

    return <span className={pointClassName} style={style} key={point} />;
  });

  return <div className={`${prefixCls}-step`}>{elements}</div>;
};

Steps.propTypes = {
  prefixCls: PropTypes.string,
  activeDotStyle: PropTypes.object,
  dotStyle: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  upperBound: PropTypes.number,
  lowerBound: PropTypes.number,
  included: PropTypes.bool,
  dots: PropTypes.bool,
  step: PropTypes.number,
  marks: PropTypes.object,
  vertical: PropTypes.bool,
};

export default Steps;
