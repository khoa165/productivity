import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getJobApplications,
  updateJobApplication,
  deleteJobApplication,
  setCurrentEditedJobApplication,
  clearCurrentEditedJobApplication,
  addNewJobApplicationPlaceholder,
  removeJobApplicationPlaceholder,
} from '../../actions/jobapplication';
import Spinner from '../Layout/Spinner';
import JobApplicationsTable from './JobApplicationsTable';
import {
  Card,
  CardHeader,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import './index.scss';

const JobApplicationsManagement = ({
  getJobApplications,
  updateJobApplication,
  deleteJobApplication,
  setCurrentEditedJobApplication,
  clearCurrentEditedJobApplication,
  addNewJobApplicationPlaceholder,
  removeJobApplicationPlaceholder,
  jobApplicationState: {
    jobApplications,
    currentEditedJobApplication,
    loading,
    jobApplicationPlaceholders,
    error,
  },
}) => {
  useEffect(() => {
    getJobApplications();

    // eslint-disable-next-line
  }, []);

  return loading && jobApplications === null ? (
    <Spinner />
  ) : (
    <div id='jobApplicationsManagementPage'>
      <Card className='card-tasks'>
        <CardHeader>
          <h6 className='title d-inline'>
            Job applications ({jobApplications.length})
          </h6>
          <p className='card-category d-inline'>All</p>
          <p className='card-category d-inline'>Today</p>
          <p className='card-category d-inline'>Tomorrow</p>
          <p className='card-category d-inline'>This week</p>
          <p className='card-category d-inline'>This month</p>
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              className='btn-icon'
              color='link'
              data-toggle='dropdown'
              type='button'
            >
              <i className='tim-icons icon-settings-gear-63' />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Action
              </DropdownItem>
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Another action
              </DropdownItem>
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Something else
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody>
          {jobApplications && (
            <JobApplicationsTable
              thead={[
                { text: 'Company', field: 'company' },
                { text: 'Position title', field: 'position' },
                { text: 'Application stage', field: 'stage' },
                { text: 'Deadline', field: 'deadline1' },
              ]}
              tbody={jobApplications}
              setCurrentEditedJobApplication={setCurrentEditedJobApplication}
              clearCurrentEditedJobApplication={
                clearCurrentEditedJobApplication
              }
              currentEditedJobApplication={currentEditedJobApplication}
              jobApplicationPlaceholders={jobApplicationPlaceholders}
              updateJobApplication={updateJobApplication}
              deleteJobApplication={deleteJobApplication}
              addNewJobApplicationPlaceholder={addNewJobApplicationPlaceholder}
              removeJobApplicationPlaceholder={removeJobApplicationPlaceholder}
              error={error}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

JobApplicationsManagement.propTypes = {
  getJobApplications: PropTypes.func.isRequired,
  updateJobApplication: PropTypes.func.isRequired,
  deleteJobApplication: PropTypes.func.isRequired,
  setCurrentEditedJobApplication: PropTypes.func.isRequired,
  clearCurrentEditedJobApplication: PropTypes.func.isRequired,
  addNewJobApplicationPlaceholder: PropTypes.func.isRequired,
  removeJobApplicationPlaceholder: PropTypes.func.isRequired,
  jobApplicationState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  jobApplicationState: state.jobapplication,
});

const mapFunctionsToProps = {
  getJobApplications,
  updateJobApplication,
  deleteJobApplication,
  setCurrentEditedJobApplication,
  clearCurrentEditedJobApplication,
  addNewJobApplicationPlaceholder,
  removeJobApplicationPlaceholder,
};

export default connect(
  mapStateToProps,
  mapFunctionsToProps
)(JobApplicationsManagement);
