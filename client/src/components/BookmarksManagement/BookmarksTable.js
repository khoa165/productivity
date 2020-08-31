import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SortingTable from '../Layout/SortingTable';
import BookmarkRow from './BookmarkRow';
import BookmarkRowCurrentlyEdited from './BookmarkRowCurrentlyEdited';
import { Table, UncontrolledTooltip } from 'reactstrap';

class BookmarksTable extends SortingTable {
  render() {
    const {
      thead,
      currentEditedBookmark,
      bookmarkPlaceholders,
      setCurrentEditedBookmark,
      clearCurrentEditedBookmark,
      updateBookmark,
      deleteBookmark,
      addNewBookmarkPlaceholder,
      removeBookmarkPlaceholder,
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
          {bodyData.map((bookmark, key) => {
            return currentEditedBookmark === bookmark._id ? (
              <BookmarkRowCurrentlyEdited
                bookmark={bookmark}
                key={key}
                unique={key}
                clearCurrentEditedBookmark={clearCurrentEditedBookmark}
                updateBookmark={updateBookmark}
                edit={true}
              />
            ) : (
              <BookmarkRow
                bookmark={bookmark}
                key={key}
                unique={key}
                setCurrentEditedBookmark={setCurrentEditedBookmark}
                deleteBookmark={deleteBookmark}
              />
            );
          })}
          {bookmarkPlaceholders.map((placeholderId) => {
            return (
              <BookmarkRowCurrentlyEdited
                key={placeholderId}
                bookmark={{ _id: placeholderId }}
                unique={placeholderId}
                clearCurrentEditedBookmark={removeBookmarkPlaceholder}
                updateBookmark={updateBookmark}
                edit={false}
              />
            );
          })}
          <tr className='addBookmarkIconButton'>
            <td colSpan='4'>
              <div className='line-break'></div>
              <i
                id='addBookmarkIconButton'
                className='fas fa-plus'
                onClick={() => addNewBookmarkPlaceholder()}
              />
            </td>
          </tr>
          <UncontrolledTooltip delay={0} target='addBookmarkIconButton'>
            Add new bookmark
          </UncontrolledTooltip>
        </tbody>
      </Table>
    );
  }
}

BookmarksTable.propTypes = {
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
  currentEditedBookmark: PropTypes.string,
  setCurrentEditedBookmark: PropTypes.func.isRequired,
  clearCurrentEditedBookmark: PropTypes.func.isRequired,
  updateBookmark: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
};

export default BookmarksTable;
