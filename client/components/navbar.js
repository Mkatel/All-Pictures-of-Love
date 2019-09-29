import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="nav">
    <div className="logo-div">
      <img
        src="logo2.jpg"
        alt="All Pictures of love"
        width="300"
        height="120"
      />
      <div className="pictureoflove">All Pictures of Love</div>
    </div>
    <nav>
      <div className="nav-2">
        <Link to="/">
          <span className="nav-span">Home</span>
        </Link>
        <Link to="/authorPictures">
          <span className="nav-span">Pictures</span>
        </Link>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
