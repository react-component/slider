import React from 'react';

const Track = ({className, included, offset, length}) => {
  const style = {
    left: offset + '%',
    width: length + '%',
    visibility: included ? 'visible' : 'hidden',
  };
  return <div className={className} style={style} />;
};

export default Track;
