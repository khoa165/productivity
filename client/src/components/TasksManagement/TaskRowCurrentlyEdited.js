import React, { useState } from 'react';
import { CustomInput } from '../Layout/Input';
import ReactDatetime from 'react-datetime';
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
  unique,
  task,
  clearCurrentEditedTask,
  updateTask,
  edit,
}) => {
  const allStages = ['New', 'In progress', 'Done', 'Cancelled', 'Postponed'];

  // Set task data.
  const [data, setData] = useState({
    id: task._id,
    name: task.name,
    note: task.note,
    stage: task.stage,
    deadline: task.deadline ? task.deadline : null,
    link: task.link,
  });

  // Destructuring.
  const { id, name, note, stage, deadline, link } = data;

  // Event listener for change in input fields.
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const onDateChange = (date) => setData({ ...data, deadline: date });
  const onStageChange = (newStage) => setData({ ...data, stage: newStage });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    const submittedData = {};
    if (name) submittedData.name = name;
    if (note) submittedData.note = note;
    if (stage) submittedData.stage = stage;
    if (deadline) submittedData.deadline = deadline;
    if (link) submittedData.link = link;
    if (edit) {
      submittedData.id = id;
    }
    updateTask(submittedData, edit);
  };

  return (
    <tr className='currentlyEditedRow'>
      <td className='majorColumn taskStageColumn'>
        <UncontrolledDropdown direction='right' className='taskStageDropdown'>
          <DropdownToggle caret color='danger' task-toggle='dropdown'>
            {stage}
          </DropdownToggle>
          <DropdownMenu>
            {allStages.map((option, k) => (
              <DropdownItem
                className={option === stage ? 'active-stage' : ''}
                onClick={() => onStageChange(option)}
                key={k}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
      <td className='majorColumn taskNameColumn'>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='name'
            value={name}
            id={`taskNameField${unique}`}
            onChange={onChange}
          />
          <Label for={`taskNameField${unique}`}>Name</Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='note'
            value={note}
            id={`taskNoteField${unique}`}
            onChange={onChange}
          />
          <Label for={`taskNoteField${unique}`}>Note / Description</Label>
        </div>
      </td>
      <td className='majorColumn taskDeadlineColumn'>
        <div className='date-picker-wrapper'>
          <ReactDatetime
            inputProps={{
              className: 'form-control',
              placeholder: 'Select deadline for task',
              type: 'text',
              name: 'deadline',
            }}
            dateFormat='HH:mm | ddd, MMM Do, YYYY'
            timeFormat='HH:mm | ddd, MMM Do, YYYY'
            value={deadline}
            onChange={onDateChange}
          />
          <i className='fas fa-chevron-down' />
        </div>
      </td>
      <td className='majorColumn confirmIconColumn'>
        <Button
          color='link'
          id={`confirmTaskTooltip${unique}`}
          type='submit'
          onClick={onSubmit}
        >
          <i className='fas fa-check-circle' />
        </Button>
        <UncontrolledTooltip delay={0} target={`confirmTaskTooltip${unique}`}>
          Confirm change
        </UncontrolledTooltip>
      </td>
      <td className='majorColumn cancelIconColumn'>
        <Button
          color='link'
          id={`cancelTaskTooltip${unique}`}
          onClick={() => clearCurrentEditedTask(id)}
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
