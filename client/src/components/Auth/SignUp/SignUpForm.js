import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../actions/auth';
import { SignInAction } from '../OtherActions';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import * as ROUTES from '../../../constants/routes';
import { toast } from 'react-toastify';

const SignUpForm = ({ register, pathname }) => {
  // Set user data.
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });

  // Destructuring.
  const { username, email, password, confirmedPassword } = user;

  // Event listener for change in input fields.
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6 || !/\d/.test(password)) {
      toast.error(
        'Password must be at least 6 characters and contain at least a number!'
      );
    } else if (password !== confirmedPassword) {
      toast.error('Passwords do not match!');
    } else {
      register({ username, email, password, confirmedPassword });
    }
  };

  return (
    <div className='authenticate-form'>
      <Form onSubmit={onSubmit} autoComplete='off'>
        <h3 className='form-heading mb-4'>Account Register</h3>
        <FormGroup>
          <Input
            bsSize='lg'
            type='text'
            name='username'
            value={username}
            placeholder='Please enter your username'
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            bsSize='lg'
            type='email'
            name='email'
            value={email}
            placeholder='Please enter a valid email'
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
            placeholder='Please enter a secure password'
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            bsSize='lg'
            type='password'
            name='confirmedPassword'
            value={confirmedPassword}
            placeholder='Please confirm your password'
            onChange={onChange}
            required
          />
        </FormGroup>
        <Button color='success' size='lg' block className='animation-on-hover'>
          Register
        </Button>
      </Form>
      <SignInAction pathname={pathname} />
    </div>
  );
};

SignUpForm.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  pathname: PropTypes.string.isRequired,
};

SignUpForm.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default connect(null, { register })(SignUpForm);
