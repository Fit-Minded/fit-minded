import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../store'
import { MapContainer } from './index'
import { firestore, storage } from '../firebase'
import { Link } from 'react-router-dom'

const defaultProfPic =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

class SignUpPage extends Component {
  constructor(props) {
    super(props)

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
      agePrefMin: 18,
      agePrefMax: 99,
      genderOwn: 'Female',
      genderPref: 'Male',
      longitude: -74.0,
      latitude: 40.735,
      radius: 0,
      currentActivity: 'Running',
      currentActivityExperience: 'Intermediate',
      currentActivityDescription: '',
      // iconPath: `/ActivityIcons/${}.png`
      activities: []
    }

    this.setImagePreview = this.setImagePreview.bind(this)
    this.handleActivityAdd = this.handleActivityAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRadiusChange = this.handleRadiusChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const viewType = this.props.match.path
    const stateFromProps = this.props.location.state

    if (viewType === '/profile/update') {
      const { user } = this.props
      let {
        firstName,
        lastName,
        age,
        gender,
        location,
        activities,
        imageURLs,
        radius
      } = user
      this.setState({
        firstName: firstName,
        lastName: lastName,
        prevImg1: imageURLs[0],
        prevImg2: imageURLs[1],
        prevImg3: imageURLs[2],
        imageFiles: [],
        imageURLs: imageURLs,
        ageOwn: age.own,
        agePrefMin: age.preferred.min,
        agePrefMax: age.preferred.max,
        genderOwn: gender.own,
        genderPref: gender.preferred,
        radius: radius,
        currentActivity: '',
        activities: activities,
        longitude: location.coordinates[0],
        latitude: location.coordinates[1]
      })
    }

    if (stateFromProps) {
      this.setState({
        ...stateFromProps
      })
    }
  }

  setImagePreview(evt) {
    const file = evt.target.files[0]
    const state = this.state
    const number = evt.target.name
    this.setState({
      [`prevImg${number}`]: URL.createObjectURL(file)
    })

    if (file) {
      storage
        .ref()
        .child(this.state.email)
        .child(file.name)
        .put(file)
        .then(response => response.ref.getDownloadURL())
        .then(url => state.imageURLs.push({ url }))
    }
  }

  handleRadiusChange(evt) {
    const type = evt.target.name
    if (type === 'plus' && this.state.radius !== 10) {
      this.setState({
        radius: this.state.radius + 1
      })
    }
    if (type === 'minus' && this.state.radius !== 1) {
      this.setState({
        radius: this.state.radius - 1
      })
    }
  }

  handleActivityAdd(evt) {
    const {
      currentActivity,
      currentActivityExperience,
      currentActivityDescription
    } = this.state
    const newActivity = {
      name: currentActivity,
      experience: currentActivityExperience,
      description: currentActivityDescription,
      iconPath: `/ActivityIcons/${currentActivity}.png`
    }
    this.setState({
      activities: {
        ...this.state.activities,
        [currentActivity]: newActivity
      },
      currentActivity: 'Running',
      currentActivityExperience: 'Intermediate',
      currentActivityDescription: ''
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const state = this.state
    this.props.auth(state, formName)
  }

  render() {
    const viewType = this.props.match.path
    const activityKeys = Object.keys(this.state.activities)
    console.log(this.state)
    return (
      <div id="sign-up-page">
        <form name="signup" onSubmit={this.handleSubmit}>
          <div className="sign-up-header">
            <h2>My Photos</h2>
            {viewType === '/profile/update' && (
              <Link to="/profile">
                <i className="fas fa-user"></i>
              </Link>
            )}
          </div>
          <div id="sign-up-pictures">
            <label htmlFor="picture-input1">
              <img src={this.state.prevImg1} alt="userPic" />
            </label>
            <input
              onChange={this.setImagePreview}
              id="picture-input1"
              type="file"
              name="1"
              style={{ display: 'none' }}
            />
            <label htmlFor="picture-input2">
              <img src={this.state.prevImg2} alt="userPic" />
            </label>
            <input
              onChange={this.setImagePreview}
              id="picture-input2"
              type="file"
              name="2"
              style={{ display: 'none' }}
            />
            <label htmlFor="picture-input3">
              <img src={this.state.prevImg3} alt="userPic" />
            </label>
            <input
              onChange={this.setImagePreview}
              id="picture-input3"
              type="file"
              name="3"
              style={{ display: 'none' }}
            />
          </div>
          <div>
            <h2>My Info</h2>
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div className="gender-own">
            <label htmlFor="genderOwn">Gender</label>
            <select
              name="genderOwn"
              value={this.state.genderOwn}
              onChange={this.handleChange}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div>
            <label htmlFor="ageOwn">Age</label>
            <input
              type="text"
              name="ageOwn"
              value={this.state.ageOwn}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>My Location</label>
            <Link
              to={{
                pathname: `${viewType}/map`,
                state: {
                  ...this.state
                }
              }}
            >
              Update Location
            </Link>
          </div>
          <div>
            <h2>My Preferences</h2>
          </div>
          <div className="gender-own">
            <label htmlFor="genderPref">Gender Preference</label>
            <select
              name="genderPref"
              value={this.state.genderPref}
              onChange={this.handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="agePrefMin">Age Pref Min</label>
            <input
              type="text"
              name="agePrefMin"
              value={this.state.agePrefMin}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="agePrefMax">Age Pref Max</label>
            <input
              type="text"
              name="agePrefMax"
              value={this.state.agePrefMax}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="radius">Distance:</label>
            <div className="radius-increment-buttons">
              <button
                type="button"
                name="minus"
                onClick={this.handleRadiusChange}
              >
                -
              </button>
              <p>{this.state.radius} Miles</p>
              <button
                type="button"
                name="plus"
                onClick={this.handleRadiusChange}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <h2>My Activities</h2>
          </div>
          {activityKeys.map((activity, index) => {
            return (
              <div key={index} className="sign-up-activity">
                <div>
                  <img
                    className="edit-page-icon"
                    src={this.state.activities[activity].iconPath}
                  />
                  <h2>{this.state.activities[activity].name}</h2>
                  <button type="button" className="remove-activity">
                    X
                  </button>
                </div>
                <div>
                  <label htmlFor="agePrefMin">Experience</label>
                  <h3>{this.state.activities[activity].experience}</h3>
                </div>
                <div>
                  <p>{this.state.activities[activity].description}</p>
                </div>
              </div>
            )
          })}
          <div>
            <h2>Add Activity</h2>
          </div>
          <div className="add-activity-form">
            <div>
              <label htmlFor="agePrefMin">Select Activity</label>
              <select
                name="currentActivity"
                value={this.state.currentActivity}
                onChange={this.handleChange}
              >
                <option value="Running">Running</option>
                <option value="Lifting">Lifting</option>
                <option value="Yoga">Yoga</option>
                <option value="Swimming">Swimming</option>
                <option value="CrossFit">CrossFit</option>
                <option value="RockClimbing">RockClimbing</option>
                <option value="Cycling">Cycling</option>
                <option value="Gymnastics">Gymnastics</option>
              </select>
            </div>
            <div>
              <label htmlFor="agePrefMin">Experience</label>
              <select
                name="currentActivityExperience"
                value={this.state.currentActivityExperience}
                onChange={this.handleChange}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <textarea
                type="text"
                name="currentActivityDescription"
                value={this.state.currentActivityDescription}
                placeholder="Add description here..."
                onChange={this.handleChange}
                className="add-activity-input"
                rows={4}
              />
            </div>

            <button
              type="button"
              onClick={this.handleActivityAdd}
              className="add-activity-button"
            >
              Add Activity
            </button>
          </div>

          <div className="sign-up-submit">
            {viewType === '/signUpPage' && (
              <button type="submit">Create Profile</button>
            )}
            {viewType === '/profile/update' && (
              <button type="submit">Update Profile</button>
            )}
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (state, formName) => dispatch(auth(state, formName))
  }
}

export default connect(mapState, mapDispatch)(SignUpPage)
