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
// Profiles component.
import Profiles from '../profiles/Profiles';
// Profile form components.
import ProfileForm from '../profile_forms/ProfileForm';
import ExperienceForm from '../profile_forms/ExperienceForm';
import EducationForm from '../profile_forms/EducationForm';

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
          <Route exact path='/profiles' component={Profiles} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/profile/update' component={ProfileForm} />
          <PrivateRoute
            exact
            path='/experience/update'
            component={ExperienceForm}
          />
          <PrivateRoute
            exact
            path='/education/update'
            component={EducationForm}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default Routes;