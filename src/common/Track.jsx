import React from 'react';

const Track = ({
  className, included, vertical, offset, length, minimumTrackStyle,
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
  const elStyle = {
    ...style,
    ...minimumTrackStyle,
  };
  return <div className={className} style={elStyle} />;
};

export default Track;
