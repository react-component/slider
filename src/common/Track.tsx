import React from 'react';

const Track = (props) => {
  const { className, included, vertical, style } = props;
  let { length, offset, reverse } = props;

  if (length < 0) {
    reverse = !reverse;
    length = Math.abs(length);
    offset = 100 - offset;
  }

  const positonStyle = vertical
    ? {
        [reverse ? 'top' : 'bottom']: `${offset}%`,
        [reverse ? 'bottom' : 'top']: 'auto',
        height: `${length}%`,
      }
    : {
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
