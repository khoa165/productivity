import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getDefaultBookmarks,
  updateBookmark,
  deleteBookmark,
  setCurrentEditedBookmark,
  clearCurrentEditedBookmark,
  addNewBookmarkPlaceholder,
  removeBookmarkPlaceholder,
} from '../../actions/bookmark';
import Spinner from '../Layout/Spinner';
import BookmarksTable from './BookmarksTable';
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

const BookmarksManagement = ({
  getDefaultBookmarks,
  updateBookmark,
  deleteBookmark,
  setCurrentEditedBookmark,
  clearCurrentEditedBookmark,
  addNewBookmarkPlaceholder,
  removeBookmarkPlaceholder,
  bookmark: {
    defaultBookmarks,
    currentEditedBookmark,
    loading,
    bookmarkPlaceholders,
  },
}) => {
  useEffect(() => {
    getDefaultBookmarks();

    // eslint-disable-next-line
  }, []);

  return loading && defaultBookmarks === null ? (
    <Spinner />
  ) : (
    <div id='bookmarkManagementPage'>
      <Card className='card-tasks'>
        <CardHeader>
          <h6 className='title d-inline'>
            Bookmarks ({defaultBookmarks.length})
          </h6>
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
          {defaultBookmarks && (
            <BookmarksTable
              thead={[
                { text: 'Stage' },
                { text: 'Name' },
                { className: 'text-center', text: 'Deadline' },
              ]}
              tbody={defaultBookmarks}
              setCurrentEditedBookmark={setCurrentEditedBookmark}
              clearCurrentEditedBookmark={clearCurrentEditedBookmark}
              currentEditedBookmark={currentEditedBookmark}
              bookmarkPlaceholders={bookmarkPlaceholders}
              updateBookmark={updateBookmark}
              deleteBookmark={deleteBookmark}
              addNewBookmarkPlaceholder={addNewBookmarkPlaceholder}
              removeBookmarkPlaceholder={removeBookmarkPlaceholder}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

BookmarksManagement.propTypes = {
  getDefaultBookmarks: PropTypes.func.isRequired,
  setCurrentEditedBookmark: PropTypes.func.isRequired,
  clearCurrentEditedBookmark: PropTypes.func.isRequired,
  bookmark: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bookmark: state.bookmark,
});

const mapFunctionsToProps = {
  getDefaultBookmarks,
  setCurrentEditedBookmark,
  clearCurrentEditedBookmark,
  updateBookmark,
  deleteBookmark,
  addNewBookmarkPlaceholder,
  removeBookmarkPlaceholder,
};

export default connect(
  mapStateToProps,
  mapFunctionsToProps
)(BookmarksManagement);
