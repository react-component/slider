/**
* @Author: Surati Nikhil <nsurte>
* @Date:   03-29-2017
* @Email:  c.nikhil.surati@uptake.com
* @Filename: Handle.jsx
* @Last modified by:   nsurte
* @Last modified time: 03-29-2017
*/



import React, { PropTypes } from 'react';

export default class Handle extends React.Component {
  render() {
    const {
      className, vertical, offset, minimumTrackTintColor, disabled, ...restProps,
    } = this.props;
    const style = vertical ? { marginLeft: -7, marginTop: -17, width:63, height: 20, cursor: 'pointer', position:'absolute', bottom: `${offset}%`,backgroundColor:'red' } : { left: `${offset}%`,marginLeft: -7, marginTop: -17, width:63, height: 20, cursor: 'pointer',position:'absolute' };
    if (minimumTrackTintColor && !disabled) {
      style.borderColor = minimumTrackTintColor;
    }
    // FIXME: take image from props
    return <img {...restProps} style={style} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Icon_train.svg/2000px-Icon_train.svg.png'} />;
  }
}
Handle.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  minimumTrackTintColor: PropTypes.string,
  disabled: PropTypes.bool,
};
