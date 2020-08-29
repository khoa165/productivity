import React, { Fragment, useState } from 'react';
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
  Form,
} from 'reactstrap';

const TaskRowCurrentlyEdited = ({
  unique,
  task,
  setCurrentEditedTask,
  clearCurrentEditedTask,
  updateTask,
}) => {
  const allStages = ['New', 'In progress', 'Done', 'Cancelled', 'Postponed'];

  // Set task data.
  const [data, setData] = useState({
    id: task._id,
    name: task.name,
    note: task.note,
    stage: task.stage,
    deadline: task.deadline,
    link: task.link,
  });

  // Destructuring.
  const { name, note, stage } = data;

  // Event listener for change in input fields.
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const onChangeStage = (newStage) => setData({ ...data, stage: newStage });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    updateTask(data);
  };

  return (
    <tr>
      <td className='taskStageColumn'>
        <UncontrolledDropdown direction='right' className='taskStageDropdown'>
          <DropdownToggle caret color='danger' task-toggle='dropdown'>
            {stage}
          </DropdownToggle>
          <DropdownMenu>
            {allStages.map((option) => (
              <DropdownItem
                className={option === stage ? 'active-stage' : ''}
                onClick={() => onChangeStage(option)}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
      <td className='taskNameColumn'>
        <Fragment>
          <div className='animatedInputFormGroup'>
            <CustomAnimatedInput
              type='text'
              name='name'
              value={name}
              id={`taskNameField${unique}`}
              onChange={onChange}
            />
            <Label for={`taskNameField${unique}`}>Name</Label>
          </div>
          <div className='animatedInputFormGroup'>
            <CustomAnimatedInput
              type='text'
              name='note'
              value={note}
              id={`taskNoteField${unique}`}
              onChange={onChange}
            />
            <Label for={`taskNoteField${unique}`}>Note / Description</Label>
          </div>
        </Fragment>
      </td>
      <td className='taskDeadlineColumn'>
        <Moment format='YYYY - MM - DD'>{moment.utc(task.deadline)}</Moment>
      </td>
      <td className='editIconColumn'>
        <Button
          color='link'
          id={`editTaskTooltip${unique}`}
          onClick={() => setCurrentEditedTask(task._id)}
          className='currentlyEdited'
        >
          <i className='tim-icons icon-pencil' />
        </Button>
        <UncontrolledTooltip delay={0} target={`editTaskTooltip${unique}`}>
          Edit Task
        </UncontrolledTooltip>
      </td>
      <td className='confirmIconColumn'>
        <Button
          color='link'
          id={`confirmTaskTooltip${unique}`}
          className='currentlyEdited'
          type='submit'
          onClick={onSubmit}
        >
          <i className='fas fa-check-circle' />
        </Button>
        <UncontrolledTooltip delay={0} target={`confirmTaskTooltip${unique}`}>
          Confirm change
        </UncontrolledTooltip>
      </td>
      <td className='cancelIconColumn'>
        <Button
          color='link'
          id={`cancelTaskTooltip${unique}`}
          onClick={() => clearCurrentEditedTask(task.id)}
          className='currentlyEdited'
        >
          <i className='fas fa-times-circle' />
        </Button>
        <UncontrolledTooltip delay={0} target={`cancelTaskTooltip${unique}`}>
          Cancel change
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default TaskRowCurrentlyEdited;
