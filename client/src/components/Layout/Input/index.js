import React, { Fragment } from 'react';
import './index.scss';

const CustomAnimatedInput = (props) => {
  return (
    <Fragment>
      <input {...props} />
      <div className='underline'></div>
    </Fragment>
  );
};

export default CustomAnimatedInput;
