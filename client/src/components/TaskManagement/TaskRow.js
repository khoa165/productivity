import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { UncontrolledTooltip, Button, Badge } from 'reactstrap';

const TaskRow = ({
  key,
  task,
  badgeColorBasedOnStage,
  setCurrentEditedTask,
  clearCurrentEditedTask,
}) => {
  return (
    <tr key={key}>
      <td className='taskStageColumn'>
        <Badge color={badgeColorBasedOnStage(task.stage)}>{task.stage}</Badge>
      </td>
      <td className={`taskNameColumn`}>
        <p>{task.name}</p>
        {task.note && <p className='text-muted taskNote'>{task.note}</p>}
      </td>
      <td className='taskDeadlineColumn'>
        <Moment format='YYYY - MM - DD'>{moment.utc(task.deadline)}</Moment>
      </td>
      <td className='editIconColumn'>
        <Button
          color='link'
          id={`editTaskTooltip${key}`}
          onClick={() => setCurrentEditedTask(task._id)}
        >
          <i className='tim-icons icon-pencil' />
        </Button>
        <UncontrolledTooltip delay={0} target={`editTaskTooltip${key}`}>
          Edit Task
        </UncontrolledTooltip>
      </td>
      <td className='confirmIconColumn'>
        <Button color='link' id={`confirmTaskTooltip${key}`}>
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

export default TaskRow;
