import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
  height: '150px',
  borderRadius: '10px',
  left: '-5vw',
  top: '-25px',
  width: '80vw'
  // position: 'realtive'
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
      <Map
        google={this.props.google}
        onDragend={this.centerMoved}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 40.71, lng: -73.995 }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBhfVcK2VUneew6OCc9uwRJVmmvWjly7Vw'
})(MapContainer)
