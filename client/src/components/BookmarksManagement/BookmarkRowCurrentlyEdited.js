import React, { Fragment, useState } from 'react';
import CustomAnimatedInput from '../Layout/Input';
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

const BookmarkRowCurrentlyEdited = ({
  unique,
  bookmark,
  clearCurrentEditedBookmark,
  updateBookmark,
  edit,
}) => {
  // Set bookmark data.
  const [data, setData] = useState({
    id: bookmark._id,
    name: bookmark.name,
    note: bookmark.note,
    link: bookmark.link,
  });

  // Destructuring.
  const { id, name, note, link } = data;

  // Event listener for change in input fields.
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    const submittedData = {};
    if (name) submittedData.name = name;
    if (note) submittedData.note = note;
    if (link) submittedData.link = link;
    submittedData.id = id;
    updateBookmark(submittedData, edit);
  };

  return (
    <tr className='currentlyEditedRow'>
      <td className='majorColumn bookmarkStageColumn'>ABC</td>
      <td className='majorColumn bookmarkNameColumn'>
        <Fragment>
          <div className='animatedInputFormGroup'>
            <CustomAnimatedInput
              type='text'
              name='name'
              value={name}
              id={`bookmarkNameField${unique}`}
              onChange={onChange}
            />
            <Label for={`bookmarkNameField${unique}`}>Name</Label>
          </div>
          <div className='animatedInputFormGroup'>
            <CustomAnimatedInput
              type='text'
              name='note'
              value={note}
              id={`bookmarkNoteField${unique}`}
              onChange={onChange}
            />
            <Label for={`bookmarkNoteField${unique}`}>Note / Description</Label>
          </div>
        </Fragment>
      </td>
      <td className='majorColumn bookmarkDeadlineColumn'>abc</td>
      <td className='majorColumn confirmIconColumn'>
        <Button
          color='link'
          id={`confirmBookmarkTooltip${unique}`}
          type='submit'
          onClick={onSubmit}
        >
          <i className='fas fa-check-circle' />
        </Button>
        <UncontrolledTooltip
          delay={0}
          target={`confirmBookmarkTooltip${unique}`}
        >
          Confirm change
        </UncontrolledTooltip>
      </td>
      <td className='majorColumn cancelIconColumn'>
        <Button
          color='link'
          id={`cancelBookmarkTooltip${unique}`}
          onClick={() => clearCurrentEditedBookmark(id)}
        >
          <i className='fas fa-times-circle' />
        </Button>
        <UncontrolledTooltip
          delay={0}
          target={`cancelBookmarkTooltip${unique}`}
        >
          Cancel change
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default BookmarkRowCurrentlyEdited;
