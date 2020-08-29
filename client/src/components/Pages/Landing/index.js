import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';
// import PasswordForget from '../../Auth/PasswordForget';
import { SemanticUIModal } from '../../Layout/Modal';
import * as ROUTES from '../../../constants/routes';
import './index.scss';

const Landing = ({ isAuthenticated, location }) => {
  const pathname = location && location.pathname ? location.pathname : null;
  const form =
    location && location.state && location.state.form
      ? location.state.form
      : null;

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div id='landing-page'>
      <div className='overlay'>
        <div className='content'>
          <h1>Coffee Up</h1>
          <p className='brand-tagline'>
            Coffee up your day and{' '}
            <span className='d-inline-block'>
              Collaborate with others more easily!
            </span>
          </p>
          <div>
            <SemanticUIModal
              trigger={
                <Link
                  to='#'
                  className='btn btn-lg btn-success animation-on-hover'
                >
                  SIGN UP
                </Link>
              }
              modalTitle='Coffee up your day and get productive!'
            >
              {form ? (
                form === ROUTES.SIGN_IN ? (
                  <SignIn pathname={pathname} />
                ) : form === ROUTES.PASSWORD_FORGET ? (
                  // <PasswordForget pathname={pathname} />
                  <SignUp pathname={pathname} />
                ) : (
                  <SignUp pathname={pathname} />
                )
              ) : (
                <SignUp pathname={pathname} />
              )}
            </SemanticUIModal>
            <SemanticUIModal
              trigger={
                <Link to='#' className='btn btn-lg animation-on-hover'>
                  LOGIN
                </Link>
              }
              modalTitle='Coffee up your day and get productive!'
            >
              {form ? (
                form === ROUTES.SIGN_UP ? (
                  <SignUp pathname={pathname} />
                ) : form === ROUTES.PASSWORD_FORGET ? (
                  // <PasswordForget pathname={pathname} />
                  <SignIn pathname={pathname} />
                ) : (
                  <SignIn pathname={pathname} />
                )
              ) : (
                <SignIn pathname={pathname} />
              )}
            </SemanticUIModal>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
