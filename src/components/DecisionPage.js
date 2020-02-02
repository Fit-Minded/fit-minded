import React, { Component } from 'react'
import { connect } from 'react-redux'

class DecisionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {}
    }
  }

  render() {
    return <div>Test</div>
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(DecisionPage)
