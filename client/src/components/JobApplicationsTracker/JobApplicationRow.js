import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { UncontrolledTooltip, Button, Badge } from 'reactstrap';

const JobApplicationRow = ({
  unique,
  jobApplication,
  setCurrentEditedJobApplication,
  deleteJobApplication,
}) => {
  const {
    company,
    position,
    note,
    stage,
    location,
    referrer,
    companyWebsite,
    jobDescriptions,
    requiredSkills,
    deadline1,
    linkName1,
    linkUrl1,
    linkName2,
    linkUrl2,
  } = jobApplication;

  return (
    <tr>
      <td className='majorColumn companyColumn'>
        <p className='companyName'>{company}</p>
        {companyWebsite && (
          <Fragment>
            <a
              href={companyWebsite}
              target='_blank'
              rel='noopener noreferrer'
              id={`visitCompanyWebsiteTooltip${unique}`}
              className='btn btn-link'
            >
              <i className='fas fa-share' />
            </a>
            <UncontrolledTooltip
              delay={0}
              target={`visitCompanyWebsiteTooltip${unique}`}
            >
              Company website
            </UncontrolledTooltip>
          </Fragment>
        )}

        <div className='additionalLinks'>
          {(linkUrl1 || linkUrl2) && (
            <Fragment>
              <div className='line-break' />
              <p>Additional links</p>
            </Fragment>
          )}
          {linkUrl1 && (
            <Fragment>
              <a
                href={linkUrl1}
                target='_blank'
                rel='noopener noreferrer'
                id={`jobApplicationLink1Tooltip${unique}`}
                className='btn btn-link'
              >
                {`[${linkName1 ? linkName1 : 'Link 1'}]`}
              </a>
              <UncontrolledTooltip
                delay={0}
                target={`jobApplicationLink1Tooltip${unique}`}
              >
                {linkUrl1}
              </UncontrolledTooltip>
            </Fragment>
          )}
          {linkUrl2 && (
            <Fragment>
              <a
                href={linkUrl2}
                target='_blank'
                rel='noopener noreferrer'
                id={`jobApplicationLink2Tooltip${unique}`}
                className='btn btn-link'
              >
                {`[${linkName2 ? linkName2 : 'Link 2'}]`}
              </a>
              <UncontrolledTooltip
                delay={0}
                target={`jobApplicationLink2Tooltip${unique}`}
              >
                {linkUrl2}
              </UncontrolledTooltip>
            </Fragment>
          )}
        </div>
      </td>
      <td className='majorColumn positionColumn'>
        <p>{position}</p>
        {location && (
          <p className='text-muted jobApplicationDescription'>{location}</p>
        )}
        {referrer && (
          <p className='text-muted jobApplicationDescription'>({referrer})</p>
        )}
        {jobDescriptions && (
          <p className='text-muted jobApplicationDescription'>
            {jobDescriptions}
          </p>
        )}
        {requiredSkills && (
          <p className='text-muted jobApplicationRequiredSkills'>
            {requiredSkills}
          </p>
        )}
      </td>
      <td className='majorColumn stageColumn'>
        {stage && <Badge color='danger'>{stage}</Badge>}
        {note && (
          <Fragment>
            <div className='line-break' />
            <p className='jobApplicationNote'>Note: {note}</p>
          </Fragment>
        )}
      </td>
      <td className='majorColumn deadlineColumn'>
        {deadline1 ? (
          <Moment format='HH:mm | ddd, MMM Do, YYYY'>
            {moment.utc(deadline1)}
          </Moment>
        ) : (
          'N/A'
        )}
      </td>
      <td className='majorColumn editIconColumn'>
        <Button
          color='link'
          id={`editJobApplicationTooltip${unique}`}
          onClick={() => setCurrentEditedJobApplication(jobApplication._id)}
        >
          <i className='tim-icons icon-pencil' />
        </Button>
        <UncontrolledTooltip
          delay={0}
          target={`editJobApplicationTooltip${unique}`}
        >
          Edit job application
        </UncontrolledTooltip>
      </td>
      <td className='majorColumn deleteIconColumn'>
        <Button
          color='link'
          id={`deleteJobApplicationTooltip${unique}`}
          onClick={() => deleteJobApplication(jobApplication._id)}
        >
          {/* <i className='fas fa-trash' /> */}
          <i className='tim-icons icon-trash-simple' />
        </Button>
        <UncontrolledTooltip
          delay={0}
          target={`deleteJobApplicationTooltip${unique}`}
        >
          Delete job application
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default JobApplicationRow;
