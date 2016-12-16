import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

function calcPoints(marks, dots, step, min, max) {
  warning(
    dots ? step > 0 : true,
    '`Slider[step]` should be a positive number in order to make Slider[dots] work.',
  );
  const points = Object.keys(marks).map(parseFloat);
  if (dots) {
    for (let i = min; i <= max; i += step) {
      if (!(points.indexOf(i) >= 0)) {
        points.push(i);
      }
    }
  }
  return points;
}

const Scale = ({ prefixCls, marks, dots, step, included, handles,
                tracks, lowerBound, upperBound, max, min }) => {
  const elements = calcPoints(marks, dots, step, min, max).map((point) => {
    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const pointClassName = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived,
    });

    return (
      <span className={`${prefixCls}-dot-wrapper`} key={point}>
        <span className={pointClassName} />
      </span>
    );
  });

  return (
    <div className={`${prefixCls}-scale`}>
      <div className={`${prefixCls}-rail`} />
      {tracks}
      {elements}
      {handles}
    </div>);
};

Scale.propTypes = {
  prefixCls: React.PropTypes.string,
  marks: React.PropTypes.objectOf(
    React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  ),
  dots: React.PropTypes.bool,
  step: React.PropTypes.number,
  included: React.PropTypes.bool,
  handles: React.PropTypes.node,
  tracks: React.PropTypes.node,
  lowerBound: React.PropTypes.number,
  upperBound: React.PropTypes.number,
  max: React.PropTypes.number,
  min: React.PropTypes.number,
};

export default Scale;
