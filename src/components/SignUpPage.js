import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';
import { MapContainer } from './index';
import Slider from 'react-input-slider';
import { firestore, storage } from '../fierbase';

const defaultProfPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

var sliderStyles = {
  track: {
    backgroundColor: 'var(--medium-gray)',
    width: 130,
    padding: 0
  },
  active: {
    backgroundColor: 'var(--highlight-blue)',
    padding: 0,
    marginLeft: -10
  },
  thumb: {
    width: 10,
    height: 10
  },
  disabled: {
    opacity: 0.5
  }
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      prevImg1: defaultProfPic,
      prevImg2: defaultProfPic,
      prevImg3: defaultProfPic,
      imageFiles: [],
      imageURLs: [],
      ageOwn: 0,
      agePrefMin: 0,
      agePrefMax: 0,
      genderOwn: '',
      genderPref: '',
      longitude: -74.0,
      latitude: 40.735,
      radius: 0,
      currentActivity: '',
      activities: []
    };

    this.setImagePreview = this.setImagePreview.bind(this);
    this.handleActivityAdd = this.handleActivityAdd.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      const { email, password } = this.props.location.state;
      this.setState({
        ...this.state,
        email,
        password
      });
    }
  }

  setImagePreview(evt) {
    const file = evt.target.files[0];
    const state = this.state;
    const number = evt.target.name;
    this.setState({
      [`prevImg${number}`]: URL.createObjectURL(file)
    });

    if (file) {
      storage
        .ref()
        .child(this.state.email)
        .child(file.name)
        .put(file)
        .then(response => response.ref.getDownloadURL())
        .then(url => state.imageURLs.push({ url }));
    }
  }

  handleRadiusChange(evt) {
    let miles = evt.x / 10;
    this.setState({
      radius: miles
    });
  }

  handleActivityAdd(evt) {
    this.setState({
      activities: [...this.state.activities, this.state.currentActivity],
      currentActivity: ''
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleMapMove(longitude, latitude) {
    this.setState({
      longitude,
      latitude
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const state = this.state;
    this.props.auth(state, formName);
  }

  render() {
    console.log(this.state);
    return (
      <div id='sign-up-page'>
        <form name='signup' onSubmit={this.handleSubmit}>
          <h2>My Photos</h2>
          <div id='sign-up-pictures'>
            <label htmlFor='picture-input1'>
              <img src={this.state.prevImg1} alt='userPic' />
            </label>
            <input
              onChange={this.setImagePreview}
              id='picture-input1'
              type='file'
              name='1'
              style={{ display: 'none' }}
            />
            <label htmlFor='picture-input2'>
              <img src={this.state.prevImg2} alt='userPic' />
            </label>
            <input
              onChange={this.setImagePreview}
              id='picture-input2'
              type='file'
              name='2'
              style={{ display: 'none' }}
            />
            <label htmlFor='picture-input3'>
              <img src={this.state.prevImg3} alt='userPic' />
            </label>
            <input
              onChange={this.setImagePreview}
              id='picture-input3'
              type='file'
              name='3'
              style={{ display: 'none' }}
            />
          </div>
          <h2>My Info</h2>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              name='firstName'
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor='genderOwn'>Gender</label>
            <input
              type='text'
              name='genderOwn'
              value={this.state.genderOwn}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='ageOwn'>Age</label>
            <input
              type='text'
              name='ageOwn'
              value={this.state.ageOwn}
              onChange={this.handleChange}
            />
          </div>
          {/* <h2>My Location</h2>
          <div id="map">
            <MapContainer handleMapMove={this.handleMapMove} />
          </div> */}
          <h2>My Preferences</h2>
          <div>
            <label htmlFor='genderPref'>Gender Preference</label>
            <input
              type='text'
              name='genderPref'
              value={this.state.genderPref}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='agePrefMin'>Age Pref Min</label>
            <input
              type='text'
              name='agePrefMin'
              value={this.state.agePrefMin}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='agePrefMax'>Age Pref Max</label>
            <input
              type='text'
              name='agePrefMax'
              value={this.state.agePrefMax}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='radius'>Radius: {this.state.radius} Miles</label>
            <Slider
              axis='x'
              x={this.state.radius}
              xmin={10}
              xmax={100}
              styles={sliderStyles}
              onChange={this.handleRadiusChange}
            />
          </div>
          <h2>My Activities</h2>
          {this.state.activities.map((activity, index) => {
            return (
              <div key={index}>
                <h3>{activity}</h3>
                <h3>Experience Level: Medium</h3>
              </div>
            );
          })}
          <div>
            <label htmlFor='activity'>Activity</label>
            <input
              type='text'
              name='currentActivity'
              value={this.state.currentActivity}
              onChange={this.handleChange}
            />
            <button type='button' onClick={this.handleActivityAdd}>
              Add Activity
            </button>
          </div>
          <div className='sign-up-submit'>
            <button type='submit'>Create Profile</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (state, formName) => dispatch(auth(state, formName))
  };
};

export default connect(null, mapDispatch)(SignUpPage);
