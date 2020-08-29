import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SortingTable from '../Layout/SortingTable';
import TaskRow from './TaskRow';
import TaskRowCurrentlyEdited from './TaskRowCurrentlyEdited';
import { Table } from 'reactstrap';

class TasksTable extends SortingTable {
  badgeColorBasedOnStage = (stage) => {
    switch (stage) {
      case 'New':
        return 'primary';
      case 'In progress':
        return 'info';
      case 'Done':
        return 'success';
      case 'Cancelled':
        return 'warning';
      case 'Postponed':
        return 'default';
      default:
        return '';
    }
  };

  render() {
    const {
      thead,
      currentEditedTask,
      setCurrentEditedTask,
      clearCurrentEditedTask,
      updateTask,
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
                  onClick={() =>
                    this.sortTable(key, columnName.text.toLowerCase())
                  }
                >
                  {columnName.text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {bodyData.map((task, key) => {
            return currentEditedTask === task._id ? (
              <TaskRowCurrentlyEdited
                task={task}
                key={key}
                unique={key}
                setCurrentEditedTask={setCurrentEditedTask}
                clearCurrentEditedTask={clearCurrentEditedTask}
                updateTask={updateTask}
              />
            ) : (
              <TaskRow
                task={task}
                key={key}
                unique={key}
                badgeColorBasedOnStage={this.badgeColorBasedOnStage}
                setCurrentEditedTask={setCurrentEditedTask}
                clearCurrentEditedTask={clearCurrentEditedTask}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

TasksTable.propTypes = {
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
      stage: PropTypes.string.isRequired,
      note: PropTypes.string,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  task: PropTypes.object,
  currentEditedTask: PropTypes.string,
  setCurrentEditedTask: PropTypes.func.isRequired,
  clearCurrentEditedTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TasksTable;
