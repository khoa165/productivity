// React.
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux.
import { Provider } from 'react-redux';
import store from '../../store';
import { loadUser } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';
import loadScript from '../../utils/loadScript';

// Custom components.
// Routing components.
import Routes from '../routing/Routes';

// Page components.
import Landing from '../Pages/Landing';

// Stylesheet.
import './index.scss';

import { ToastContainer } from 'react-toastify';

// Check for token and set it.
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    document.body.classList.add('white-content');
    store.dispatch(loadUser());
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`
    );
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <Switch>
            {/* Landing page does not have navbar and does not need container, all other pages require them. */}
            <Route exact path='/welcome' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
