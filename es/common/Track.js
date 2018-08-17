import _extends from 'babel-runtime/helpers/extends';
/* eslint-disable react/prop-types */
import React from 'react';

var Track = function Track(props) {
  var className = props.className,
      included = props.included,
      vertical = props.vertical,
      offset = props.offset,
      length = props.length,
      style = props.style;


  var positonStyle = vertical ? {
    bottom: offset + '%',
    height: length + '%'
  } : {
    left: offset + '%',
    width: length + '%'
  };

  var elStyle = _extends({}, style, positonStyle);
  return included ? React.createElement('div', { className: className, style: elStyle }) : null;
};

export default Track;