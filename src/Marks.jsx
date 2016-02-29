import React from 'react';
import classNames from 'classnames';

const Marks = ({className, marks, included, upperBound, lowerBound, max, min, markStyler}) => {
  const marksKeys = Object.keys(marks);
  const marksCount = marksKeys.length;
  const unit = 100 / (marksCount - 1);
  const markWidth = unit * 0.9;

  const range = max - min;
  const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).map((point, index) => {
    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const markClassName = classNames({
      [className + '-text']: true,
      [className + '-text-active']: isActived,
    });

    const defaultStyle = {
      width: markWidth + '%',
      left: (point - min) / range * 100 - markWidth / 2 + '%',
    };
    const style = markStyler ? markStyler(index, marksCount, point, defaultStyle) : defaultStyle;
    return (<span className={markClassName} style={style || defaultStyle} key={point}>
             {marks[point]}
            </span>);
  });

  return <div className={className}>{elements}</div>;
};

export default Marks;
