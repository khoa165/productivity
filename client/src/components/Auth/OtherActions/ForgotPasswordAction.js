import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const ForgotPasswordAction = ({ pathname }) => (
  <div className='other-account-action'>
    <p>Forgot your password?</p>
    <Link
      to={{
        pathname: pathname,
        state: { form: ROUTES.PASSWORD_FORGET },
      }}
      className='action-link ml-2'
    >
      Reset here
    </Link>
  </div>
);

ForgotPasswordAction.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default ForgotPasswordAction;
