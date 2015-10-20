import React from 'react';
import rcUtil from 'rc-util';

const Steps = ({className, stepNum, isIncluded, index}) => {
  const dotClassName = className.replace('step', 'dot');
  const unit = 100 / (stepNum - 1);

  const elements = [];
  for (let i = 0; i < stepNum; i++) {
    const offset = unit * i + '%';
    const style = { left: offset };

    const isActived = (isIncluded && i <= index) || (!isIncluded && i === index);
    const stepClassName = rcUtil.classSet({
      [dotClassName]: true,
      [dotClassName + '-active']: isActived,
    });

    elements.push(<span className={stepClassName} style={style} key={i} />);
  }

  return (<div className={className}>
            {elements}
          </div>);
};

export default Steps;
