import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { Link } from 'react-router-dom'

const mapStyles = {
  height: '400px',
  width: '80vw',
  borderRadius: '10px',
  margin: '10vw'
}

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.centerMoved = this.centerMoved.bind(this)
  }

  centerMoved(mapProps, map) {
    const { handleMapMove } = this.props
    const center = map.getCenter().toJSON()
    const longitude = Number(center.lng.toFixed(3))
    const latitude = Number(center.lat.toFixed(3))
    handleMapMove(longitude, latitude)
  }

  render() {
    return (
      <div id="map-container">
        <h1>Set My Location</h1>
        <Map
          google={this.props.google}
          onDragend={this.centerMoved}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: 40.71, lng: -73.995 }}
        />
        <Link to="/profile/update">
          <button type="button">Confirm</button>
        </Link>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBhfVcK2VUneew6OCc9uwRJVmmvWjly7Vw'
})(MapContainer)
