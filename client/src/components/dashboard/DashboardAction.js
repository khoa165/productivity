import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAction = () => {
  return (
    <div className=''>
      <Link
        className='btn btn-lg btn-light text-uppercase text-info'
        to='/profile/update'
      >
        <i className='fas fa-user-circle text-info mr-1' /> Edit profile
      </Link>
    </div>
  );
};

export default DashboardAction;
