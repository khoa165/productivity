import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import DashboardAction from './DashboardAction';
import { Button } from 'reactstrap';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='text-brown display-4'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user mr-2'></i>
        <span className='font-italic'>Welcome {user && user.name}</span>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />

          <Button color='danger' onClick={() => deleteAccount()}>
            <i className='fas fa-window-close'></i> Delete my account
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <p className=''>
            You have yet to setup your profile. Please follow the link to add
            your info and let the community know who you are.
          </p>
          <Link to='/profile/update' className='btn btn-info'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
