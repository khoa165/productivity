import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { UncontrolledTooltip, Button, Badge } from 'reactstrap';

const TaskRow = ({
  unique,
  task,
  badgeColorBasedOnStage,
  setCurrentEditedTask,
}) => {
  const { stage, note, name, deadline } = task;
  return (
    <tr>
      <td className='majorColumn taskStageColumn'>
        <Badge color={badgeColorBasedOnStage(stage)}>{stage}</Badge>
      </td>
      <td className='majorColumn taskNameColumn'>
        <p>{name}</p>
        {note && <p className='text-muted taskNote'>{note}</p>}
      </td>
      <td className='majorColumn taskDeadlineColumn'>
        {deadline ? (
          <Moment format='HH:mm | ddd, MMM Do, YYYY'>
            {moment.utc(deadline)}
          </Moment>
        ) : (
          'N/A'
        )}
      </td>
      <td className='majorColumn editIconColumn'>
        <Button
          color='link'
          id={`editTaskTooltip${unique}`}
          onClick={() => setCurrentEditedTask(task._id)}
        >
          <i className='tim-icons icon-pencil' />
        </Button>
        <UncontrolledTooltip delay={0} target={`editTaskTooltip${unique}`}>
          Edit task
        </UncontrolledTooltip>
      </td>
      <td className='majorColumn deleteIconColumn'>
        <Button color='link' id={`deleteTaskTooltip${unique}`}>
          <i className='fas fa-trash' />
        </Button>
        <UncontrolledTooltip delay={0} target={`deleteTaskTooltip${unique}`}>
          Delete task
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default TaskRow;
