import React from 'react';

const Track = ({ className, included, vertical, offset, length, gradient }) => {
  const style = {
    visibility: included ? 'visible' : 'hidden',
  };
  let gradientDirection = '';
  if (vertical) {
    style.bottom = `${offset}%`;
    style.height = `${length}%`;
    gradientDirection = 'top';
  } else {
    style.left = `${offset}%`;
    style.width = `${length}%`;
    gradientDirection = 'right';
  }

  if (gradient.length > 0) {
    const startColor = gradient[0];
    const endColor = (gradient.length > 1) ? gradient[1] : gradient[0];
    style.background = [
      `linear-gradient(to ${gradientDirection}, ${startColor} , ${endColor})`,
      `${endColor}`,
    ];
  }

  return <div className={className} style={style} />;
};

export default Track;
