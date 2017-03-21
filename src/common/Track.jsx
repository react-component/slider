import React from 'react';

const Track = ({
  className, included, vertical, offset, length, maximumTrackTintColor, disabled,
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
  if (maximumTrackTintColor && !disabled) {
    style.backgroundColor = maximumTrackTintColor;
  }
  return <div className={className} style={style} />;
};

export default Track;
