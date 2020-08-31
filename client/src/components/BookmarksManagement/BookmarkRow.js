import React from 'react';
import { UncontrolledTooltip, Button } from 'reactstrap';
import { toast } from 'react-toastify';

const BookmarkRow = ({
  unique,
  bookmark,
  setCurrentEditedBookmark,
  deleteBookmark,
}) => {
  const { note, name, link } = bookmark;
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  return (
    <tr>
      <td className='majorColumn bookmarkNameColumn'>
        <p>{name}</p>
        {note && <p className='text-muted bookmarkNote'>{note}</p>}
      </td>
      <td className='majorColumn bookmarkLinkColumn'>
        <a href={link} target='_blank'>
          {link}
        </a>
      </td>
      <td className='majorColumn copyIconColumn'>
        <Button
          color='link'
          id={`copyBookmarkTooltip${unique}`}
          onClick={copyLinkToClipboard}
        >
          <i className='fas fa-copy' />
        </Button>
        <UncontrolledTooltip delay={0} target={`copyBookmarkTooltip${unique}`}>
          Copy link to clipboard
        </UncontrolledTooltip>
      </td>
      <td className='majorColumn visitIconColumn'>
        <a
          href={link}
          target='_blank'
          id={`visitBookmarkTooltip${unique}`}
          className='btn btn-link'
        >
          <i className='fas fa-share' />
        </a>
        <UncontrolledTooltip delay={0} target={`visitBookmarkTooltip${unique}`}>
          Visit link
        </UncontrolledTooltip>
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
          {/* <i className='fas fa-trash' /> */}
          <i className='tim-icons icon-trash-simple' />
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
