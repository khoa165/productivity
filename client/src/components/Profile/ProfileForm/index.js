import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../Layout/Spinner';
import { createProfile, getCurrentProfile } from '../../../actions/profile';
import { Row, Col, Form, FormGroup, FormText, Input, Button } from 'reactstrap';
import * as ROUTES from '../../../constants/routes';
import './index.scss';

let autoComplete;

// Handle when the script is loaded, assign autoCompleteRef with google maps place autocomplete
const handleScriptLoad = (updateQuery, autoCompleteRef) => {
  if (window.google) {
    // Assign autoComplete with Google maps place one time.
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ['(cities)'] }
    );

    // Specify what properties received from API.
    autoComplete.setFields(['address_components', 'formatted_address']);
    // Add a listener to handle when the place is selected.
    autoComplete.addListener('place_changed', () =>
      handlePlaceSelect(updateQuery)
    );
  }
};

const handlePlaceSelect = (updateQuery) => {
  const addressObject = autoComplete.getPlace(); // get place from google api
  const query = addressObject.formatted_address;
  if (query !== null && query !== '') {
    console.log(query);
    updateQuery(query);
  }
};

const initialState = {
  first_name: '',
  last_name: '',
  company: '',
  bio: '',
  skills: '',
  linkedin: '',
  github: '',
  portfolio: '',
  blog: '',
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
  const [displaySocialInputs, toggleSocialInputs] = useState(true);

  // Destructuring.
  const {
    first_name,
    last_name,
    company,
    bio,
    skills,
    linkedin,
    github,
    portfolio,
    blog,
    facebook,
    youtube,
    twitter,
    instagram,
  } = formData;

  // Set location query.
  const [location, setLocation] = useState('');
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    handleScriptLoad(setLocation, autoCompleteRef);

    // eslint-disable-next-line
  }, []);

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
      if (Array.isArray(profileData.skills)) {
        profileData.skills = profileData.skills.join(', ');
      }

      setFormData(profileData);

      setLocation(profile.location);
    }
  }, [loading, getCurrentProfile, profile]);

  // Event listener for change in input fields.
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    formData.location = location;
    createProfile(formData, history, profile ? true : false);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div id='profileForm'>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <div className='my-4'>
            <h1 className='text-uppercase'>Create Your Profile</h1>
            <p className='text-muted'>
              <i className='fas fa-user mx-1' /> Let's color your profile with
              cool coffee flavor
            </p>
          </div>

          <Form
            autoComplete='off'
            className='py-3'
            onSubmit={(e) => onSubmit(e)}
          >
            <div className='main-form'>
              <Row form>
                <Col xs={6}>
                  <FormGroup className='inline-form-input'>
                    <Input
                      type='text'
                      placeholder='First name'
                      name='first_name'
                      value={first_name}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup className='inline-form-input'>
                    <Input
                      type='text'
                      placeholder='Last name'
                      name='last_name'
                      value={last_name}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <input
                  type='text'
                  placeholder='Location'
                  name='location'
                  ref={autoCompleteRef}
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className='form-control'
                />
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
                  type='textarea'
                  rows='5'
                  placeholder='Tell others about yourself'
                  name='bio'
                  value={bio}
                  onChange={(e) => onChange(e)}
                />
                <FormText color='muted'>
                  E.g, share your cool coffee flavors
                </FormText>
              </FormGroup>
            </div>

            <div className='mb-4'>
              <Button
                block
                color='info'
                className='btn-simple'
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
              >
                {displaySocialInputs
                  ? 'Collapse media links'
                  : 'Add other social media links'}
              </Button>
            </div>

            {displaySocialInputs && (
              <Fragment>
                <div className='media-link-input'>
                  <div className='social-media-icon-wrapper'>
                    <i className='fab fa-linkedin fa-2x' />
                  </div>

                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='LinkedIn URL'
                      name='linkedin'
                      value={linkedin}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </div>
                <div className='media-link-input'>
                  <div className='social-media-icon-wrapper'>
                    <i className='fab fa-github fa-2x' />
                  </div>

                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='GitHub URL'
                      name='github'
                      value={github}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </div>
                <div className='media-link-input'>
                  <div className='social-media-icon-wrapper'>
                    <i className='fas fa-address-book fa-2x' />
                  </div>

                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Portfolio URL'
                      name='portfolio'
                      value={portfolio}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </div>
                <div className='media-link-input'>
                  <div className='social-media-icon-wrapper'>
                    <i className='fab fa-blogger-b fa-2x' />
                  </div>

                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Blog URL'
                      name='blog'
                      value={blog}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </div>
                <div className='media-link-input'>
                  <div className='social-media-icon-wrapper'>
                    <i className='fab fa-twitter fa-2x' />
                  </div>

                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Twitter URL'
                      name='twitter'
                      value={twitter}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </div>
                <div className='media-link-input'>
                  <div className='social-media-icon-wrapper'>
                    <i className='fab fa-facebook fa-2x' />
                  </div>

                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Facebook URL'
                      name='facebook'
                      value={facebook}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </div>

                <div className='media-link-input'>
                  <div className='social-media-icon-wrapper'>
                    <i className='fab fa-youtube fa-2x' />
                  </div>

                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='YouTube URL'
                      name='youtube'
                      value={youtube}
                      onChange={(e) => onChange(e)}
                    />
                  </FormGroup>
                </div>

                <div className='media-link-input'>
                  <div className='social-media-icon-wrapper'>
                    <i className='fab fa-instagram fa-2x' />
                  </div>

                  <FormGroup>
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
              <Link
                className='btn btn-lg btn-light text-uppercase'
                to={ROUTES.DASHBOARD}
              >
                Cancel
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
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
