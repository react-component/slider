import React from 'react';
import classNames from 'classnames';

const Marks = ({className, marks, included, upperBound, lowerBound, max, min}) => {
  const marksKeys = Object.keys(marks);
  const marksCount = marksKeys.length;
  const unit = 100 / (marksCount - 1);
  const markWidth = unit * 0.9;

  const range = max - min;
  const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).map((point) => {
    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const markClassName = classNames({
      [className + '-text']: true,
      [className + '-text-active']: isActived,
    });

    const style = { width: markWidth + '%' };
    style.left = (point - min) / range * 100 - markWidth / 2 + '%';

    const markPoint = marks[point];
    const markPointIsObject = typeof markPoint === 'object';
    const markLabel = markPointIsObject ? markPoint.label : markPoint;
    const markStyle = markPointIsObject ?
            { ...style, ...markPoint.style } : style;
    return (<span className={markClassName} style={markStyle} key={point}>
             {markLabel}
            </span>);
  });

  return <div className={className}>{elements}</div>;
};

export default Marks;
