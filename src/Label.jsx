import React from 'react';

export default class Label extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const {className, labelFormater, value, max, min} = props;

    const range = max - min;
    const markWidth = 25; // fixed at 25%

    const style = { width: markWidth + '%' };
    style.left = (value - min) / range * 100 - markWidth / 2 + '%';

    return (
      <div className={className} style={style}>
        {labelFormater(value)}
      </div>
    );
  }
}

Label.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  className: React.PropTypes.string,
  labelFormater: React.PropTypes.func,
  value: React.PropTypes.number,
};
