import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link className="nav-link" to="/trips">My Trips</Link>
    <Link className="nav-link" to="/trips-create">Log Trip</Link>
    <Link className="nav-link" to="/change-password">Change Password</Link>
    <Link className="nav-link" to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link className="nav-link" to="/sign-up">Sign Up</Link>
    <Link className="nav-link" to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link className="nav-link" to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1 className="brand">Go There, Do This!</h1>
    <nav>
      {/* { user && <span>Welcome, {user.email}</span>} */}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
