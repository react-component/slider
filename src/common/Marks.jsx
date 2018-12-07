import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Marks = ({
  className,
  vertical,
  marks,
  included,
  upperBound,
  lowerBound,
  max,
  min,
  onClickLabel,
}) => {
  const marksKeys = Object.keys(marks);

  const range = max - min;
  const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).map(point => {
    const markPoint = marks[point];
    const markPointIsObject = typeof markPoint === 'object' &&
            !React.isValidElement(markPoint);
    const markLabel = markPointIsObject ? markPoint.label : markPoint;
    if (!markLabel && markLabel !== 0) {
      return null;
    }

    const isActive = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound);
    const markClassName = classNames({
      [`${className}-text`]: true,
      [`${className}-text-active`]: isActive,
    });

    const bottomStyle = {
      marginBottom: '-50%',
      bottom: `${(point - min) / range * 100}%`,
    };

    const leftStyle = {
      left: `${(point - min) / range * 100}%`,
      transform: `translateX(-50%)`,
      msTransform: `translateX(-50%)`,
    };

    const style = vertical ? bottomStyle : leftStyle;
    const markStyle = markPointIsObject ?
      { ...style, ...markPoint.style } : style;
    return (
      <span
        className={markClassName}
        style={markStyle}
        key={point}
        onMouseDown={(e) => onClickLabel(e, point)}
        onTouchStart={(e) => onClickLabel(e, point)}
      >
        {markLabel}
      </span>
    );
  });

  return <div className={className}>{elements}</div>;
};

Marks.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  marks: PropTypes.object,
  included: PropTypes.bool,
  upperBound: PropTypes.number,
  lowerBound: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  onClickLabel: PropTypes.func,
};

export default Marks;
