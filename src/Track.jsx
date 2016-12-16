import React from 'react';

const Track = ({ className, included, offset, length }) => {
  const style = {
    visibility: included ? 'visible' : 'hidden',
    left: `${offset}%`,
    width: `${length}%`,
  };
  return <div className={className} style={style} />;
};

Track.propTypes = {
  className: React.PropTypes.string,
  included: React.PropTypes.bool,
  offset: React.PropTypes.number,
  length: React.PropTypes.number,
};

export default Track;
