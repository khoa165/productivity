import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import '../../styles/Form.scss';

const Login = ({ login, isAuthenticated }) => {
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

  // Redirect if logged in.
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
            <h3 className='text-center text-info mb-4'>Account Login</h3>
            <FormGroup>
              <Input
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
                type='password'
                name='password'
                value={password}
                placeholder='Please enter your password'
                onChange={onChange}
                required
              />
            </FormGroup>
            <Input
              type='submit'
              value='Login'
              className='btn-outline-info btn-block submitFormButton'
            />
          </Form>
        </Col>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <div className='other-account-action'>
            <p className='text-secondary'>New to Coffee Up?</p>
            <Link to='/register' className='text-info ml-2'>
              Sign up
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
