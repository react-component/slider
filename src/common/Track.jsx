/* eslint-disable react/prop-types */
import React from 'react';

const Track = (props) => {
  const { className, included, vertical, offset, length, style, reverse } = props;
  const positonStyle = vertical ? {
    [reverse ? 'top' : 'bottom']: `${offset}%`,
    [reverse ? 'bottom' : 'top']: 'auto',
    height: `${length}%`,
  } : {
    [reverse ? 'right' : 'left']: `${offset}%`,
    [reverse ? 'left' : 'right']: 'auto',
    width: `${length}%`,
  };

  const elStyle = {
    ...style,
    ...positonStyle,
  };
  return included ? <div className={className} style={elStyle} /> : null;
};

export default Track;
