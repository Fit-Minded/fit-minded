import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';
import { MapContainer } from './index';
import Slider from 'react-input-slider';
import { firestore, storage } from '../fierbase';

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
      imageInput: null,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      imageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      pictures: [],
      ageOwn: 0,
      agePrefMin: 0,
      agePrefMax: 0,
      genderOwn: '',
      genderPref: '',
      longitude: 0,
      latitude: 0,
      radius: 0.0,
      activity: ''
    };
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImagePreview = this.setImagePreview.bind(this);
  }
  get file() {
    return this.state.imageInput && this.state.imageInput.files[0];
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
    var file = evt.target.files[0];
    this.setState({
      imageUrl: URL.createObjectURL(file)
    });
  }

  handleRadiusChange(evt) {
    console.log(evt);
    this.setState({
      radius: evt.x
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const state = this.state;
    const pictures = this.imageInput.files;
    if (this.imageInput.files) {
      storage
        .ref()
        .child(this.state.email)
        .child(pictures[0].name)
        .put(pictures[0])
        .then(response => response.ref.getDownloadURL());
    }
    this.props.auth(state, formName);
  }
  handleMapMove(longitude, latitude) {
    this.setState({
      longitude,
      latitude
    });
  }

  render() {
    return (
      <div id='sign-up-page'>
        <form name='signup' onSubmit={this.handleSubmit}>
          <h2>My Photos</h2>
          <div id='sign-up-pictures'>
            <label htmlFor='picture-input1'>
              <img src={this.state.imageUrl} alt='userPic' />
            </label>
            <input
              onChange={this.setImagePreview}
              id='picture-input1'
              type='file'
              ref={ref => (this.imageInput = ref)}
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
          <h2>My Location</h2>
          <div id='map'>
            <MapContainer handleMapMove={this.handleMapMove} />
          </div>
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
            <label htmlFor='radius'>Radius in Miles</label>
            <Slider
              axis='x'
              x={this.state.radius}
              styles={sliderStyles}
              onChange={this.handleRadiusChange}
            />
          </div>
          <h2>My Activities</h2>
          <div>
            <label htmlFor='activity'>Activity</label>
            <input
              type='text'
              name='activity'
              value={this.state.activity}
              onChange={this.handleChange}
            />
          </div>
          <button type='submit'>Create Profile</button>
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
