import React from 'react';
import classNames from 'classnames';

const calculatedWidths = {};

function getWidthOfText(text) {
  const textToCheck = typeof text !== 'string' ? text.props.children : text;
  if (calculatedWidths[textToCheck]) {
    return calculatedWidths[textToCheck];
  }
  const element = document.createElement('canvas');
  const context = element.getContext('2d');
  const width = context.measureText(textToCheck).width;
  calculatedWidths[textToCheck] = width;
  return width;
}

const Marks = ({
  className,
  vertical,
  marks,
  included,
  upperBound,
  lowerBound,
  max, min,
}) => {
  const marksKeys = Object.keys(marks);
  const range = max - min;
  const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).map(point => {
    const isActive = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const markClassName = classNames({
      [`${className}-text`]: true,
      [`${className}-text-active`]: isActive,
    });

    const markPoint = marks[point];
    const markPointIsObject = typeof markPoint === 'object' &&
            !React.isValidElement(markPoint);
    const markLabel = markPointIsObject ? markPoint.label : markPoint;
    const markWidth = getWidthOfText(markLabel);

    const bottomStyle = {
      marginBottom: '-50%',
      bottom: `${(point - min) / range * 100}%`,
    };

    const leftStyle = {
      width: `${markWidth}px`,
      marginLeft: `${-markWidth / 2}px`,
      left: `${(point - min) / range * 100}%`,
    };

    const style = vertical ? bottomStyle : leftStyle;
    const markStyle = markPointIsObject ?
            { ...style, ...markPoint.style } : style;

    return (
      <span
        className={markClassName}
        style={markStyle}
        key={point}
      >
        {markLabel}
      </span>
    );
  });

  return <div className={className}>{elements}</div>;
};

export default Marks;
