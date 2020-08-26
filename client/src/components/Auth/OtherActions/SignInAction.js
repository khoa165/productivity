import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const SignInAction = ({ pathname }) => (
  <div className='other-account-action'>
    <p>Already have an account?</p>
    <Link
      to={{
        pathname: pathname,
        state: { form: ROUTES.SIGN_IN },
      }}
      className='action-link ml-2'
    >
      Sign in
    </Link>
  </div>
);

SignInAction.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default SignInAction;
