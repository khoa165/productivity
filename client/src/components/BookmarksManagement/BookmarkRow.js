import React from 'react';
import { UncontrolledTooltip, Button } from 'reactstrap';

const BookmarkRow = ({
  unique,
  bookmark,
  setCurrentEditedBookmark,
  deleteBookmark,
}) => {
  const { note, name, link } = bookmark;
  return (
    <tr>
      <td className='majorColumn bookmarkNameColumn'>
        <p>{name}</p>
        {note && <p className='text-muted bookmarkNote'>{note}</p>}
      </td>
      <td className='majorColumn bookmarkLinkColumn'>
        <p>{link}</p>
      </td>
      <td className='majorColumn editIconColumn'>
        <Button
          color='link'
          id={`editBookmarkTooltip${unique}`}
          onClick={() => setCurrentEditedBookmark(bookmark._id)}
        >
          <i className='tim-icons icon-pencil' />
        </Button>
        <UncontrolledTooltip delay={0} target={`editBookmarkTooltip${unique}`}>
          Edit bookmark
        </UncontrolledTooltip>
      </td>
      <td className='majorColumn deleteIconColumn'>
        <Button
          color='link'
          id={`deleteBookmarkTooltip${unique}`}
          onClick={() => deleteBookmark(bookmark._id)}
        >
          <i className='fas fa-trash' />
        </Button>
        <UncontrolledTooltip
          delay={0}
          target={`deleteBookmarkTooltip${unique}`}
        >
          Delete bookmark
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default BookmarkRow;
