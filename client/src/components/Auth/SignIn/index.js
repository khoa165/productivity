import React from 'react';

import SignInFormBase from './SignInFormBase';
import { ForgotPasswordAction, SignUpAction } from '../OtherActions';

import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const SignInForm = withRouter(SignInFormBase);

const SignIn = ({ pathname }) => (
  <div className='authenticate-form'>
    <SignInForm pathname={pathname} />
    <ForgotPasswordAction pathname={pathname} />
    <SignUpAction pathname={pathname} />
  </div>
);

SignIn.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default SignIn;
