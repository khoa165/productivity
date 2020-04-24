import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Routing components.
import PrivateRoute from '../routing/PrivateRoute';
// Authentication components.
import Register from '../auth/Register';
import Login from '../auth/Login';
// Page component.
import NotFound from '../pages/NotFound';
// Layout components.
import NavigationBar from '../layout/NavigationBar';
import Alerts from '../layout/Alerts';
// Dashboard component.
import Dashboard from '../dashboard/Dashboard';
// Profile form components.
import ProfileForm from '../profile_forms/ProfileForm';

// Library component.
import { Container } from 'reactstrap';

const Routes = () => {
  return (
    <Fragment>
      <NavigationBar />
      <Container className='my-5'>
        <Alerts />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/profile/update' component={ProfileForm} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default Routes;
