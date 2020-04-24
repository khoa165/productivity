import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UncontrolledAlert } from 'reactstrap';

const Alerts = ({ alerts }) => {
  return (
    // Map through all the alerts and display them.
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <UncontrolledAlert color={alert.alertType} key={alert.id}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </UncontrolledAlert>
    ))
  );
};

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);
