import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'

class ImageCarousel extends Component {
  render() {
    const { imageURLs } = this.props
    return (
      <Carousel
        showThumbs={false}
        autoPlay
        showArrows={true}
        swipeable={true}
        infiniteLoop={true}
      >
        <img src={imageURLs[0]} className="profile-carousel-image" />
        <img src={imageURLs[1]} className="profile-carousel-image" />
        <img src={imageURLs[2]} className="profile-carousel-image" />
      </Carousel>
    )
  }
}

export default ImageCarousel
