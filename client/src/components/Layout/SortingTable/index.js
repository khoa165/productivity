/*!

=========================================================
* Black Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// reactstrap components
import { Table } from 'reactstrap';

class SortingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyData: props.tbody,
      column: {
        name: -1,
        order: '',
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tbody !== this.props.tbody) {
      this.setState({ ...this.state, bodyData: this.props.tbody });
    }
  }

  sortTable = (key, columnName) => {
    let { bodyData, column } = this.state;
    let order = '';
    if (
      (column.name === key && column.order === 'desc') ||
      column.name !== key
    ) {
      order = 'asc';
      bodyData.sort((a, b) =>
        a[columnName] > b[columnName]
          ? 1
          : a[columnName] < b[columnName]
          ? -1
          : 0
      );
    } else if (column.name === key && column.order === 'asc') {
      order = 'desc';
      bodyData.sort((a, b) =>
        a[columnName] > b[columnName]
          ? -1
          : a[columnName] < b[columnName]
          ? 1
          : 0
      );
    }
    this.setState({
      bodyData: bodyData,
      column: {
        name: key,
        order: order,
      },
    });
  };
  render() {
    const { bodyData, column } = this.state;
    return (
      <Table className='tablesorter' responsive>
        <thead className='text-primary'>
          <tr>
            {this.props.thead.map((columnName, key) => {
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
          {bodyData.map((data, key) => {
            return (
              <tr
                className={classnames({
                  [data.className]: data.className !== undefined,
                })}
                key={key}
              >
                {this.props.thead.map((columnName, k) => {
                  return (
                    <Fragment>
                      <td
                        className={classnames({
                          [columnName.className]:
                            columnName.className !== undefined,
                        })}
                        key={k}
                      >
                        {data[columnName.text.toLowerCase()]}
                      </td>
                    </Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

SortingTable.propTypes = {
  thead: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  tbody: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          className: PropTypes.string,
          text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default SortingTable;
