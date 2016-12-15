import React from 'react';
import classNames from 'classnames';

const Marks = ({ className, marks, included, upperBound, lowerBound }) => {
  const marksKeys = Object.keys(marks);

  const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).map((point) => {
    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const markClassName = classNames({
      [`${className}-text`]: true,
      [`${className}-text-active`]: isActived,
    });

    const markPoint = marks[point];
    const markPointIsObject = typeof markPoint === 'object' &&
            !React.isValidElement(markPoint);
    const markLabel = markPointIsObject ? markPoint.label : markPoint;
    return (<span className={markClassName} key={point}>
             {markLabel}
            </span>);
  });

  return <div className={className}>{elements}</div>;
};

export default Marks;
