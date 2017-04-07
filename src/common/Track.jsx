import React from 'react';
import assign from 'object-assign';

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

  return <div className={className} style={assign({}, style, minimumTrackStyle)} />;
};

export default Track;
