/*global google*/
import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import { Link } from 'react-router-dom'
import SignUpPage from './SignUpPage'

const mapStyles = {
  height: '100%',
  width: '100vw'
}

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      latitude: 0,
      longitude: 0,
      places: [],
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: false
    }

    this.fetchPlaces = this.fetchPlaces.bind(this)
    this.centerMoved = this.centerMoved.bind(this)
  }

  fetchPlaces(mapProps, map) {
    const { google, activities, initialCenter } = mapProps
    const { lat, lng } = initialCenter
    const service = new google.maps.places.PlacesService(map)

    console.log(lat, lng)

    var request = {
      location: new google.maps.LatLng(lat, lng),
      radius: '4000',
      query: activities[0]
    }

    const callback = (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var places = []
        for (var i = 0; i < results.length; i++) {
          var place = results[i]
          places.push(place)
        }
        this.setState({
          places
        })
      }
    }

    service.textSearch(request, callback)
  }

  centerMoved(mapProps, map) {
    const center = map.getCenter().toJSON()
    const longitude = Number(center.lng.toFixed(3))
    const latitude = Number(center.lat.toFixed(3))
    this.setState({
      latitude,
      longitude
    })
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const { latitude, longitude } = this.props.location.state
    console.log(latitude, longitude)
    const viewType = this.props.match.path
    if (viewType === '/profile/update/map') {
      return (
        <div id="map-container">
          <i className="fas fa-map-pin"></i>
          <Map
            google={this.props.google}
            onDragend={this.centerMoved}
            zoom={14}
            style={mapStyles}
            initialCenter={{ lat: latitude, lng: longitude }}
          />
          <Link
            to={{
              pathname: '/profile/update',
              state: {
                latitude: this.state.latitude,
                longitude: this.state.longitude
              }
            }}
          >
            <button type="button">Confirm</button>
          </Link>
        </div>
      )
    }
    if (viewType === '/chat/:roomId/map') {
      const { activities } = this.props.location.state
      return (
        <div id="map-container">
          <i className="fas fa-map-pin"></i>
          <Map
            google={this.props.google}
            onReady={this.fetchPlaces}
            activities={activities}
            zoom={14}
            style={mapStyles}
            keyword={this.state.keyword}
            initialCenter={{ lat: latitude, lng: longitude }}
            onClick={this.onMapClicked}
          >
            {this.state.places.map((place, index) => {
              return (
                <Marker
                  key={index}
                  name={place.name}
                  address={place.formatted_address}
                  position={{
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  }}
                  animation={google.maps.Animation.DROP}
                  onClick={this.onMarkerClick}
                />
              )
            })}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
                <p>{this.state.selectedPlace.address}</p>
              </div>
            </InfoWindow>
          </Map>
          {/* <Link
            to={{
              pathname: '/profile/update',
              state: {
                latitude: this.state.latitude,
                longitude: this.state.longitude
              }
            }}
          >
            <button type="button">Confirm</button>
          </Link> */}
        </div>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBhfVcK2VUneew6OCc9uwRJVmmvWjly7Vw'
})(MapContainer)
