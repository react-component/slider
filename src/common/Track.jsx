import React from 'react';

const Track = ({
  className, included, vertical, offset, length, minimumTrackTintColor, disabled,
}) => {
  const style = {
    visibility: included ? 'visible' : 'hidden',
  };
  if (vertical) {
    style.bottom = `${offset}%`;
    style.height = `${length}%`;
  } else {
    style.left = `${offset}%`;
    style.width = `${length}%`;
  }
  if (minimumTrackTintColor && !disabled) {
    style.backgroundColor = minimumTrackTintColor;
  }
  return <div className={className} style={style} />;
};

export default Track;
