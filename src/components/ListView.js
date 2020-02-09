import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMatches, getLikedMe } from '../store'
import { MatchListItem, LikedMeListItem } from './'
import { Link } from 'react-router-dom'

class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      currentView: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    const viewType = props.match.path

    if (viewType === '/likedMe') {
      if (state.currentView !== viewType) {
        props.getLikedMe()
        return {
          currentView: '/likedMe'
        }
      }
      return {
        list: props.likedMe
      }
    }

    if (viewType === '/matches') {
      if (state.currentView !== viewType) {
        props.getMatches()
        return {
          currentView: '/matches'
        }
      }
      return {
        list: props.matches
      }
    }

    return null
  }

  render() {
    const { list } = this.state
    const { me } = this.props
    const viewType = this.props.match.path

    if (list.length && list[0] !== null) {
      return (
        <div className="list-view">
          {viewType === '/matches' && (
            <div>
              <h1>Matches</h1>
              {list.map((user, index) => (
                <MatchListItem user={user} me={me} key={user._id} />
              ))}
            </div>
          )}
          {viewType === '/likedMe' && (
            <div>
              <h1>Liked Me</h1>
              {list.map((user, index) => (
                <LikedMeListItem user={user} index={index} key={user._id} />
              ))}
            </div>
          )}
        </div>
      )
    } else {
      return <div>No Matches Yet</div>
    }
  }
}

const mapState = state => {
  return {
    matches: state.pool.matches,
    likedMe: state.pool.usersWhoLikedMe,
    me: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getLikedMe: () => dispatch(getLikedMe()),
    getMatches: () => dispatch(getMatches())
  }
}

export default connect(mapState, mapDispatch)(ListView)
