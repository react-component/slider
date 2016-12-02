import React from 'react';

const Track = ({ className, included, vertical, reverse, offset, length }) => {
  const style = {
    visibility: included ? 'visible' : 'hidden',
  };
  if (vertical) {
    if (reverse) {
      style.top = `${offset}%`;
      style.height = `${length}%`;
    } else {
      style.bottom = `${offset}%`;
      style.height = `${length}%`;
    }
  } else {
    if (reverse) {
      style.width = `${length}%`;
      style.left = `${100 - offset - length}%`;
    } else {
      style.left = `${offset}%`;
      style.width = `${length}%`;
    }
  }
  return <div className={className} style={style} />;
};

export default Track;
