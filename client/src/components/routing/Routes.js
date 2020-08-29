import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Routing components.
import PrivateRoute from '../routing/PrivateRoute';
// Page component.
import Products from '../Pages/Products';
import NotFound from '../Pages/NotFound';
// Layout components.
import NavigationBar from '../Layout/NavigationBar';
// Dashboard component.
import Dashboard from '../Dashboard';
// TaskManagement component.
import TasksView from '../TaskManagement';
// Profile form components.
import ProfileForm from '../Profile/ProfileForm';

import * as ROUTES from '../../constants/routes';

// Library component.
import { Container } from 'reactstrap';

const Routes = () => {
  return (
    <Fragment>
      <NavigationBar />
      <Container className='my-5'>
        <Switch>
          <PrivateRoute exact path={ROUTES.HOME} component={Products} />
          <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <PrivateRoute
            exact
            path={ROUTES.PROFILE_UPDATE}
            component={ProfileForm}
          />
          <PrivateRoute exact path={ROUTES.TASKS_VIEW} component={TasksView} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default Routes;
