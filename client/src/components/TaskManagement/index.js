import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getDefaultTasks,
  updateTask,
  setCurrentEditedTask,
  clearCurrentEditedTask,
} from '../../actions/task';
import Spinner from '../Layout/Spinner';
import TasksTable from './TasksTable';
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

const TasksView = ({
  getDefaultTasks,
  updateTask,
  setCurrentEditedTask,
  clearCurrentEditedTask,
  task: { defaultTasks, currentEditedTask, loading },
}) => {
  useEffect(() => {
    getDefaultTasks();
  }, []);

  return loading && defaultTasks === null ? (
    <Spinner />
  ) : (
    <div id='taskManagementPage'>
      <Card className='card-tasks'>
        <CardHeader>
          <h6 className='title d-inline'>Tasks ({defaultTasks.length})</h6>
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
          {defaultTasks && (
            <TasksTable
              thead={[
                { text: 'Stage' },
                { text: 'Name' },
                { className: 'text-center', text: 'Deadline' },
              ]}
              tbody={defaultTasks}
              setCurrentEditedTask={setCurrentEditedTask}
              clearCurrentEditedTask={clearCurrentEditedTask}
              currentEditedTask={currentEditedTask}
              updateTask={updateTask}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

TasksView.propTypes = {
  getDefaultTasks: PropTypes.func.isRequired,
  setCurrentEditedTask: PropTypes.func.isRequired,
  clearCurrentEditedTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

const mapFunctionsToProps = {
  getDefaultTasks,
  setCurrentEditedTask,
  clearCurrentEditedTask,
  updateTask,
};

export default connect(mapStateToProps, mapFunctionsToProps)(TasksView);
