import React from 'react';

const Track = ({ className, included, offset, length }) => {
  const style = {
    visibility: included ? 'visible' : 'hidden',
    left: `${offset}%`,
    width: `${length}%`,
  };
  return <div className={className} style={style} />;
};

export default Track;
