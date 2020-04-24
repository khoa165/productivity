import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import {
  Form,
  FormGroup,
  FormText,
  Input,
  CustomInput,
  Button,
} from 'reactstrap';

const initialState = {
  bio: '',
  company: '',
  website: '',
  github_username: '',
  location: '',
  status: '',
  skills: '',
  linkedin: '',
  facebook: '',
  youtube: '',
  twitter: '',
  instagram: '',
};

const ProfileForm = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  // Set profile data.
  const [formData, setFormData] = useState(initialState);

  // Set whether to display social media inputs.
  const [displaySocialInputs, toggleSocialInputs] = useState(initialState);

  // Destructuring.
  const {
    bio,
    company,
    website,
    github_username,
    location,
    status,
    skills,
    linkedin,
    facebook,
    youtube,
    twitter,
    instagram,
  } = formData;

  // Event listener for change in input fields.
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='my-4'>
        <h1 className='text-info text-uppercase'>Create Your Profile</h1>
        <p className='text-muted'>
          <i className='fas fa-user' /> Let's get some information to make your
          profile stand out
        </p>
      </div>

      <Form className='py-3' onSubmit={(e) => onSubmit(e)}>
        <FormGroup>
          <CustomInput
            type='select'
            name='status'
            id='status-select'
            value={status}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>Select Professional Status</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Senior Developer'>Lead Developer</option>
            <option value='Manager'>Product Manager</option>
            <option value='Student or Learning'>College student</option>
            <option value='Student or Learning'>Bootcamp graduate</option>
            <option value='Instructor'>Professor/Instructor/Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </CustomInput>
          <FormText color='muted'>
            Give us an idea of where you are at in your career
          </FormText>
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <FormText color='muted'>
            Please separate skills by commas (eg.Java, Ruby, React)
          </FormText>
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={github_username}
            onChange={(e) => onChange(e)}
          />
          <FormText color='muted'>Showcase your amazing work</FormText>
        </FormGroup>
        <FormGroup>
          <Input
            type='textarea'
            rows='5'
            placeholder='Tell others about yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <FormText color='muted'>Share your cool flavors</FormText>
        </FormGroup>

        <div className='mb-4'>
          <Button
            outline
            color='info'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            {displaySocialInputs
              ? 'Collapse media links'
              : 'Add other social media links'}
          </Button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='d-flex'>
              <i className='fab fa-linkedin fa-2x' />

              <FormGroup className='ml-3 width100'>
                <Input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </FormGroup>
            </div>
            <div className='d-flex'>
              <i className='fab fa-twitter fa-2x' />
              <FormGroup className='ml-3 width100'>
                <Input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </FormGroup>
            </div>
            <div className='d-flex'>
              <i className='fab fa-facebook fa-2x' />
              <FormGroup className='ml-3 width100'>
                <Input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </FormGroup>
            </div>

            <div className='d-flex'>
              <i className='fab fa-youtube fa-2x' />
              <FormGroup className='ml-3 width100'>
                <Input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </FormGroup>
            </div>

            <div className='d-flex'>
              <i className='fab fa-instagram fa-2x' />
              <FormGroup className='ml-3 width100'>
                <Input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </FormGroup>
            </div>
          </Fragment>
        )}

        <div className='text-center'>
          <input
            type='submit'
            className='btn btn-lg btn-danger text-uppercase mr-1'
          />
          <Link className='btn btn-lg btn-light text-uppercase' to='/dashboard'>
            Cancel
          </Link>
        </div>
      </Form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  // withRouter enables the use of history.
  withRouter(ProfileForm)
);
