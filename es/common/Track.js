import _extends from 'babel-runtime/helpers/extends';
import React from 'react';

var Track = function Track(_ref) {
  var className = _ref.className,
      included = _ref.included,
      vertical = _ref.vertical,
      offset = _ref.offset,
      length = _ref.length,
      minimumTrackStyle = _ref.minimumTrackStyle;

  var style = {
    visibility: included ? 'visible' : 'hidden'
  };
  if (vertical) {
    style.bottom = offset + '%';
    style.height = length + '%';
  } else {
    style.left = offset + '%';
    style.width = length + '%';
  }
  var elStyle = _extends({}, style, minimumTrackStyle);
  return React.createElement('div', { className: className, style: elStyle });
};

export default Track;