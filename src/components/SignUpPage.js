import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../store'

class SignUpPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      imageUrl: '',
      ageOwn: 0,
      agePrefMin: 0,
      agePrefMax: 0,
      genderOwn: '',
      genderPref: '',
      longitude: 0,
      latitude: 0,
      radius: 0.0,
      activity: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state) {
      const { email, password } = this.props.location.state
      this.setState({
        ...this.state,
        email,
        password
      })
    }
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const state = this.state
    this.props.auth(state, formName)
  }

  render() {
    return (
      <div id="sign-up-page">
        <form name="signup" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="genderOwn">Gender</label>
          <input
            type="text"
            name="genderOwn"
            value={this.state.genderOwn}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="genderPref">Gender Preference</label>
          <input
            type="text"
            name="genderPref"
            value={this.state.genderPref}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="ageOwn">Age</label>
          <input
            type="text"
            name="ageOwn"
            value={this.state.ageOwn}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="agePrefMin">Age Pref Min</label>
          <input
            type="text"
            name="agePrefMin"
            value={this.state.agePrefMin}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="agePrefMax">Age Pref Max</label>
          <input
            type="text"
            name="agePrefMax"
            value={this.state.agePrefMax}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={this.state.longitude}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={this.state.latitude}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="radius">Radius in Miles</label>
          <input
            type="text"
            name="radius"
            value={this.state.radius}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="activity">Activity</label>
          <input
            type="text"
            name="activity"
            value={this.state.activity}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Create Profile</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    auth: (state, formName) => dispatch(auth(state, formName))
  }
}

export default connect(mapState, mapDispatch)(SignUpPage)
