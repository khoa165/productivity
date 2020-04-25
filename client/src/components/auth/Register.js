import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import '../../styles/Form.scss';

const Register = ({ setAlert, register, isAuthenticated }) => {
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
      setAlert(
        'Password must be at least 6 characters and contain at least a number!',
        'danger'
      );
    } else if (password !== confirmedPassword) {
      setAlert('Passwords do not match!', 'danger');
    } else {
      register({ username, email, password });
    }
  };

  // Redirect if registered.
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div>
      <Row>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <Form onSubmit={onSubmit} className='authenticate-form'>
            <h3 className='text-center text-brown mb-4'>Account Register</h3>
            <FormGroup>
              <Input
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
                type='password'
                name='confirmedPassword'
                value={confirmedPassword}
                placeholder='Please confirm your password'
                onChange={onChange}
                required
              />
            </FormGroup>
            <Input
              type='submit'
              value='Register'
              className='btn btn-outline-warning btn-block submitFormButton'
            />
          </Form>
        </Col>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <div className='other-account-action'>
            <p className='text-secondary'>Already have an account?</p>
            <Link to='/login' className='hover-brown text-brown ml-2'>
              Sign in
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
