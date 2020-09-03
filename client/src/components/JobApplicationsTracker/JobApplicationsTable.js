import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SortingTable from '../Layout/SortingTable';
import JobApplicationRow from './JobApplicationRow';
import JobApplicationRowCurrentlyEdited from './JobApplicationRowCurrentlyEdited';
import { Table, UncontrolledTooltip } from 'reactstrap';

class JobApplicationsTable extends SortingTable {
  render() {
    const {
      thead,
      currentEditedJobApplication,
      jobApplicationPlaceholders,
      setCurrentEditedJobApplication,
      clearCurrentEditedJobApplication,
      updateJobApplication,
      deleteJobApplication,
      addNewJobApplicationPlaceholder,
      removeJobApplicationPlaceholder,
    } = this.props;
    const { bodyData, column } = this.state;

    return (
      <Table className='tablesorter' responsive>
        <thead className='text-primary'>
          <tr>
            {thead.map((columnName, key) => {
              return (
                <th
                  className={classnames(
                    'header',
                    {
                      headerSortDown:
                        key === column.name && column.order === 'asc',
                    },
                    {
                      headerSortUp:
                        key === column.name && column.order === 'desc',
                    },
                    {
                      [columnName.className]:
                        columnName.className !== undefined,
                    }
                  )}
                  key={key}
                  onClick={() => this.sortTable(key, columnName.field)}
                >
                  {columnName.text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {bodyData.map((jobApplication, key) => {
            return currentEditedJobApplication === jobApplication._id ? (
              <JobApplicationRowCurrentlyEdited
                jobApplication={jobApplication}
                key={key}
                unique={key}
                clearCurrentEditedJobApplication={
                  clearCurrentEditedJobApplication
                }
                updateJobApplication={updateJobApplication}
                edit={true}
              />
            ) : (
              <JobApplicationRow
                jobApplication={jobApplication}
                key={key}
                unique={key}
                setCurrentEditedJobApplication={setCurrentEditedJobApplication}
                deleteJobApplication={deleteJobApplication}
              />
            );
          })}
          {jobApplicationPlaceholders.map((placeholderId) => {
            return (
              <JobApplicationRowCurrentlyEdited
                key={placeholderId}
                jobApplication={{ _id: placeholderId }}
                unique={placeholderId}
                clearCurrentEditedJobApplication={
                  removeJobApplicationPlaceholder
                }
                updateJobApplication={updateJobApplication}
                edit={false}
              />
            );
          })}
          <tr className='addJobApplicationIconButton'>
            <td colSpan='6'>
              <div className='line-break'></div>
              <i
                id='addJobApplicationIconButton'
                className='fas fa-plus'
                onClick={() => addNewJobApplicationPlaceholder()}
              />
            </td>
          </tr>
          <UncontrolledTooltip delay={0} target='addJobApplicationIconButton'>
            Add new job application
          </UncontrolledTooltip>
        </tbody>
      </Table>
    );
  }
}

JobApplicationsTable.propTypes = {
  thead: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  tbody: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      note: PropTypes.string,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  bookmark: PropTypes.object,
  currentEditedJobApplication: PropTypes.string,
  setCurrentEditedJobApplication: PropTypes.func.isRequired,
  clearCurrentEditedJobApplication: PropTypes.func.isRequired,
  updateJobApplication: PropTypes.func.isRequired,
  deleteJobApplication: PropTypes.func.isRequired,
};

export default JobApplicationsTable;
