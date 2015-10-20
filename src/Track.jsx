import React from 'react';

const Track = ({className, offset, length}) => {
  const style = {
    left: offset + '%',
    width: length + '%',
  };
  return <div className={className} style={style} />;
};

export default Track;
