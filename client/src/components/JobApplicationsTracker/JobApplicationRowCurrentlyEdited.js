import React, { useState } from 'react';
import ReactDatetime from 'react-datetime';
import { CustomInput, CustomTextarea } from '../Layout/Input';
import { UncontrolledTooltip, Button, Label } from 'reactstrap';

const JobApplicationRowCurrentlyEdited = ({
  unique,
  jobApplication,
  clearCurrentEditedJobApplication,
  updateJobApplication,
  edit,
  error,
}) => {
  // Set jobApplication data.
  const [data, setData] = useState({
    id: jobApplication._id,
    company: jobApplication.company,
    companyWebsite: jobApplication.companyWebsite,
    position: jobApplication.position,
    jobDescriptions: jobApplication.jobDescriptions,
    requiredSkills: jobApplication.requiredSkills,
    stage: jobApplication.stage,
    note: jobApplication.note,
    term: jobApplication.term,
    deadline1: jobApplication.deadline1,
    deadline2: jobApplication.deadline2,
    location: jobApplication.location,
    referrer: jobApplication.referrer,

    linkName1: jobApplication.linkName1,
    linkUrl1: jobApplication.linkUrl1,
    linkName2: jobApplication.linkName2,
    linkUrl2: jobApplication.linkUrl2,
    // linkName3: jobApplication.linkName3,
    // linkUrl3: jobApplication.linkUrl3,
  });

  // Destructuring.
  const {
    id,
    company,
    companyWebsite,
    position,
    jobDescriptions,
    requiredSkills,
    stage,
    note,
    term,
    deadline1,
    deadline2,
    location,
    referrer,

    linkName1,
    linkUrl1,
    linkName2,
    linkUrl2,
    // linkName3,
    // linkUrl3,
  } = data;

  // Event listener for change in input fields.
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const onDateChange = (date) => setData({ ...data, deadline: date });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    const submittedData = {};
    if (company) submittedData.company = company;
    if (companyWebsite) submittedData.companyWebsite = companyWebsite;
    if (position) submittedData.position = position;
    if (jobDescriptions) submittedData.jobDescriptions = jobDescriptions;
    if (requiredSkills) submittedData.requiredSkills = requiredSkills;
    if (stage) submittedData.stage = stage;
    if (note) submittedData.note = note;
    if (term) submittedData.term = term;
    if (deadline1) submittedData.deadline1 = deadline1;
    if (deadline2) submittedData.deadline2 = deadline2;
    if (location) submittedData.location = location;
    if (referrer) submittedData.referrer = referrer;

    if (linkName1) submittedData.linkName1 = linkName1;
    if (linkUrl1) submittedData.linkUrl1 = linkUrl1;
    if (linkName2) submittedData.linkName2 = linkName2;
    if (linkUrl2) submittedData.linkUrl2 = linkUrl2;
    // if (linkName3) submittedData.linkName3 = linkName3;
    // if (linkUrl3) submittedData.linkUrl3 = linkUrl3;

    console.log(submittedData);
    if (edit) {
      submittedData.id = id;
    }
    updateJobApplication(submittedData, edit);
    if (!edit && !error) {
      console.log(error);
      console.log('should clear');
      // clearCurrentEditedJobApplication(id);
    }
  };

  return (
    <tr className='currentlyEditedRow'>
      <td className='majorColumn companyColumn contentColumn'>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='company'
            value={company}
            id={`companyField${unique}`}
            onChange={onChange}
          />
          <Label for={`companyField${unique}`}>Company</Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='companyWebsite'
            value={companyWebsite}
            id={`companyWebsiteField${unique}`}
            onChange={onChange}
          />
          <Label for={`companyWebsiteField${unique}`}>
            Company website URL
          </Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='linkUrl1'
            value={linkUrl1}
            placeholder='Any link you wanna save?'
            id={`linkUrl1Field${unique}`}
            onChange={onChange}
          />
          <Label for={`linkUrl1Field${unique}`}>Link 1</Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='linkName1'
            value={linkName1}
            placeholder='What is the link about?'
            id={`linkName1Field${unique}`}
            onChange={onChange}
          />
          <Label for={`linkName1Field${unique}`}>Link name 1</Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='linkUrl2'
            value={linkUrl2}
            placeholder='Any link you wanna save?'
            id={`linkUrl2Field${unique}`}
            onChange={onChange}
          />
          <Label for={`linkUrl2Field${unique}`}>Link 2</Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='linkName2'
            value={linkName2}
            placeholder='What is the link about?'
            id={`linkName2Field${unique}`}
            onChange={onChange}
          />
          <Label for={`linkName2Field${unique}`}>Link name 2</Label>
        </div>
      </td>
      <td className='majorColumn positionColumn contentColumn'>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='position'
            value={position}
            id={`jobPositionField${unique}`}
            onChange={onChange}
          />
          <Label for={`jobPositionField${unique}`}>Position</Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='term'
            value={term}
            placeholder='e.g. Summer 2021'
            id={`jobTermField${unique}`}
            onChange={onChange}
          />
          <Label for={`jobTermField${unique}`}>Term</Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='location'
            value={location}
            id={`jobLocationField${unique}`}
            onChange={onChange}
          />
          <Label for={`jobLocationField${unique}`}>Location</Label>
        </div>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='referrer'
            value={referrer}
            id={`jobReferrerField${unique}`}
            onChange={onChange}
          />
          <Label for={`jobReferrerField${unique}`}>Referrer</Label>
        </div>
        <div className='customInputFormGroup textareaInput'>
          <CustomTextarea
            type='text'
            name='jobDescriptions'
            rows={5}
            value={jobDescriptions}
            id={`jobDescriptionsField${unique}`}
            onChange={onChange}
          />
          <Label for={`jobDescriptionsField${unique}`}>Job descriptions</Label>
        </div>
        <div className='customInputFormGroup textareaInput'>
          <CustomTextarea
            type='text'
            name='requiredSkills'
            rows={5}
            value={requiredSkills}
            id={`requiredSkillsField${unique}`}
            onChange={onChange}
          />
          <Label for={`requiredSkillsField${unique}`}>Required skills</Label>
        </div>
      </td>
      <td className='majorColumn stageColumn contentColumn'>
        <div className='customInputFormGroup'>
          <CustomInput
            type='text'
            name='stage'
            value={stage}
            placeholder='Where are you in the application process?'
            id={`jobStageField${unique}`}
            onChange={onChange}
          />
          <Label for={`jobStageField${unique}`}>Stage</Label>
        </div>
        <div className='customInputFormGroup textareaInput'>
          <CustomTextarea
            type='text'
            name='note'
            rows={5}
            value={note}
            placeholder='Anything important you need to keep in mind?'
            id={`applicationNoteField${unique}`}
            onChange={onChange}
          />
          <Label for={`applicationNoteField${unique}`}>Note</Label>
        </div>
      </td>
      <td className='majorColumn deadlineColumn contentColumn'>
        <div className='date-picker-wrapper'>
          <ReactDatetime
            inputProps={{
              className: 'form-control',
              placeholder: 'Any deadline?',
              type: 'text',
              name: 'deadline1',
            }}
            dateFormat='HH:mm | ddd, MMM Do, YYYY'
            timeFormat='HH:mm | ddd, MMM Do, YYYY'
            value={deadline1}
            onChange={onDateChange}
          />
          <i className='fas fa-chevron-down' />
        </div>
        <div className='date-picker-wrapper'>
          <ReactDatetime
            inputProps={{
              className: 'form-control',
              placeholder: 'Second deadline (if any)?',
              type: 'text',
              name: 'deadline2',
            }}
            dateFormat='HH:mm | ddd, MMM Do, YYYY'
            timeFormat='HH:mm | ddd, MMM Do, YYYY'
            value={deadline2}
            onChange={onDateChange}
          />
          <i className='fas fa-chevron-down' />
        </div>
      </td>
      <td className='majorColumn confirmIconColumn'>
        <Button
          color='link'
          id={`confirmJobApplicationTooltip${unique}`}
          type='submit'
          onClick={onSubmit}
        >
          <i className='fas fa-check-circle' />
        </Button>
        <UncontrolledTooltip
          delay={0}
          target={`confirmJobApplicationTooltip${unique}`}
        >
          Confirm change
        </UncontrolledTooltip>
      </td>
      <td className='majorColumn cancelIconColumn'>
        <Button
          color='link'
          id={`cancelJobApplicationTooltip${unique}`}
          onClick={() => clearCurrentEditedJobApplication(id)}
        >
          <i className='fas fa-times-circle' />
        </Button>
        <UncontrolledTooltip
          delay={0}
          target={`cancelJobApplicationTooltip${unique}`}
        >
          Cancel change
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default JobApplicationRowCurrentlyEdited;
