import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAction = () => {
  return (
    <div>
      <Link
        className='btn btn-lg btn-light text-uppercase text-brown'
        to='/profile/update'
      >
        <i className='fas fa-user-circle mr-1' /> Edit profile
      </Link>
    </div>
  );
};

export default DashboardAction;
