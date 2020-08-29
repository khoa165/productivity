import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import CustomAnimatedInput from '../Layout/Input';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  Button,
  Label,
} from 'reactstrap';

const TaskRowCurrentlyEdited = ({
  key,
  task,
  setCurrentEditedTask,
  clearCurrentEditedTask,
}) => {
  const stages = ['New', 'In progress', 'Done', 'Cancelled', 'Postponsed'];

  return (
    <tr key={key}>
      <td className='taskStageColumn'>
        <UncontrolledDropdown direction='right' className='taskStageDropdown'>
          <DropdownToggle caret color='danger' task-toggle='dropdown'>
            {task.stage}
          </DropdownToggle>
          <DropdownMenu>
            {stages.map((stage) => (
              <DropdownItem
                className={stage === task.stage ? 'active-stage' : ''}
              >
                {stage}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
      <td className='taskNameColumn'>
        <Fragment>
          <div className='animatedInputFormGroup'>
            <CustomAnimatedInput type='text' name='name' value={task.name} />
            <Label for={`taskNoteField${key}`}>Name</Label>
          </div>
          <div className='animatedInputFormGroup'>
            <CustomAnimatedInput
              type='text'
              name='note'
              value={task.note}
              id={`taskNoteField${key}`}
            />
            <Label for={`taskNoteField${key}`}>Note/ Description</Label>
          </div>
        </Fragment>
      </td>
      <td className='taskDeadlineColumn'>
        <Moment format='YYYY - MM - DD'>{moment.utc(task.deadline)}</Moment>
      </td>
      <td className='editIconColumn'>
        <Button
          color='link'
          id={`editTaskTooltip${key}`}
          onClick={() => setCurrentEditedTask(task._id)}
          className='currentlyEdited'
        >
          <i className='tim-icons icon-pencil' />
        </Button>
        <UncontrolledTooltip delay={0} target={`editTaskTooltip${key}`}>
          Edit Task
        </UncontrolledTooltip>
      </td>
      <td className='confirmIconColumn'>
        <Button
          color='link'
          id={`confirmTaskTooltip${key}`}
          className='currentlyEdited'
        >
          <i className='fas fa-check-circle' />
        </Button>
        <UncontrolledTooltip delay={0} target={`confirmTaskTooltip${key}`}>
          Confirm change
        </UncontrolledTooltip>
      </td>
      <td className='cancelIconColumn'>
        <Button
          color='link'
          id={`cancelTaskTooltip${key}`}
          onClick={() => clearCurrentEditedTask(task.id)}
          className='currentlyEdited'
        >
          <i className='fas fa-times-circle' />
        </Button>
        <UncontrolledTooltip delay={0} target={`cancelTaskTooltip${key}`}>
          Cancel change
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default TaskRowCurrentlyEdited;
