import React from 'react';
import rcUtil from 'rc-util';

const Marks = ({className, marks, index, included}) => {
  const marksLen = marks.length;
  const unit = 100 / (marksLen - 1);
  const markWidth = unit / 2 + '%';

  const elements = [];
  for (let i = 0; i < marksLen; i++) {
    const isActived = (included && i <= index) || (!included && i === index);
    const markClassName = rcUtil.classSet({
      [className + '-text']: true,
      [className + '-text-active']: isActived,
    });

    const style = { width: markWidth };
    const offset = unit * i;
    if (i === marksLen - 1) {
      style.right = -unit / 4 + '%';
    } else {
      style.left = (i > 0 ? offset - unit / 4 : -unit / 4) + '%';
    }

    elements.push(<span className={markClassName} style={style} key={i}>
                    {marks[i]}
                  </span>);
  }

  return (<div className={className}>
            {elements}
          </div>);
};

export default Marks;
