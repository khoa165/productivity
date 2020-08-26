import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../actions/auth';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import * as ROUTES from '../../../constants/routes';

const SignInForm = ({ login }) => {
  // Set user data.
  const [user, setUser] = useState({
    credential: '',
    password: '',
  });

  // Destructuring.
  const { credential, password } = user;

  // Event listener for change in input fields.
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    login({ credential, password });
  };

  return (
    <Form onSubmit={onSubmit} autoComplete='off'>
      <h3 className='form-heading mb-4'>Account Login</h3>
      <FormGroup>
        <Input
          bsSize='lg'
          type='text'
          name='credential'
          value={credential}
          placeholder='Please enter your email or username'
          onChange={onChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          bsSize='lg'
          type='password'
          name='password'
          value={password}
          placeholder='Please enter your password'
          onChange={onChange}
          required
        />
      </FormGroup>
      <Button color='default' size='lg' block className='animation-on-hover'>
        Login
      </Button>
    </Form>
  );
};

SignInForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  pathname: PropTypes.string.isRequired,
};

SignInForm.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default connect(null, { login })(SignInForm);
