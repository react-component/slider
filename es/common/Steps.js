import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

var calcPoints = function calcPoints(vertical, marks, dots, step, min, max) {
  warning(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
  var points = Object.keys(marks).map(parseFloat);
  if (dots) {
    for (var i = min; i <= max; i = i + step) {
      if (points.indexOf(i) >= 0) continue;
      points.push(i);
    }
  }
  return points;
};

var Steps = function Steps(_ref) {
  var prefixCls = _ref.prefixCls,
      vertical = _ref.vertical,
      marks = _ref.marks,
      dots = _ref.dots,
      step = _ref.step,
      included = _ref.included,
      lowerBound = _ref.lowerBound,
      upperBound = _ref.upperBound,
      max = _ref.max,
      min = _ref.min,
      dotStyle = _ref.dotStyle,
      activeDotStyle = _ref.activeDotStyle;

  var range = max - min;
  var elements = calcPoints(vertical, marks, dots, step, min, max).map(function (point) {
    var _classNames;

    var offset = Math.abs(point - min) / range * 100 + '%';

    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var style = vertical ? _extends({ bottom: offset }, dotStyle) : _extends({ left: offset }, dotStyle);
    if (isActived) {
      style = _extends({}, style, activeDotStyle);
    }

    var pointClassName = classNames((_classNames = {}, _classNames[prefixCls + '-dot'] = true, _classNames[prefixCls + '-dot-active'] = isActived, _classNames));

    return React.createElement('span', { className: pointClassName, style: style, key: point });
  });

  return React.createElement(
    'div',
    { className: prefixCls + '-step' },
    elements
  );
};

export default Steps;