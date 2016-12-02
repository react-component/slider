import React from 'react';

const Track = ({ className, included, vertical, verticalReverse, offset, length }) => {
  const style = {
    visibility: included ? 'visible' : 'hidden',
  };
  if (vertical) {
    if (verticalReverse) {
      style.top = `${offset}%`;
      style.height = `${length}%`;
    } else {
      style.bottom = `${offset}%`;
      style.height = `${length}%`;
    }
  } else {
    style.left = `${offset}%`;
    style.width = `${length}%`;
  }
  return <div className={className} style={style} />;
};

export default Track;
