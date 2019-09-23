import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="nav">
    {/* <img src="groceries.png" alt="Groceries" width="500" /> */}
    <div className="logo-div">
      <img src="logo2.jpg" alt="Picture of love" width="300" height="120" />
      <div className="pictureoflove">All Picture of Loves</div>
    </div>

    <nav>
      {isLoggedIn ? (
        <div className="nav-2">
          {/* The navbar will show these links after you log in */}
          <Link to="/addPictures">Add Pictures</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="nav-2">
          {/* The navbar will show these links before you log in */}
          <Link to="/authorPictures">Login</Link>
        </div>
      )}
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
