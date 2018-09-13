/* eslint-disable react/prop-types */
import React from 'react';

const Track = (props) => {
  const { className, included, vertical, offset, length, style, inverted } = props;
  const positonStyle = vertical ? {
    [inverted ? 'top' : 'bottom']: `${offset}%`,
    [inverted ? 'bottom' : 'top']: 'auto',
    height: `${length}%`,
  } : {
    [inverted ? 'right' : 'left']: `${offset}%`,
    [inverted ? 'left' : 'right']: 'auto',
    width: `${length}%`,
  };

  const elStyle = {
    ...style,
    ...positonStyle,
  };
  return included ? <div className={className} style={elStyle} /> : null;
};

export default Track;
