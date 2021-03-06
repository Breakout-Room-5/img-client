import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'

// import styled from 'styled-components'

// const StyledNavBar = styled(Navbar)`
// color: red
// `
const authenticatedOptions = (
  <Fragment>
    <NavLink to='/create-meme' className='nav-link'>Create Meme</NavLink>
    <NavLink to='/my-memes' className='nav-link'>My Memes</NavLink>
    {/* <NavLink to='/home' className='nav-link'>All Meme</NavLink> */}
    <NavLink to='/change-password' className='nav-link'>Change Password</NavLink>
    <NavLink to='/sign-out' className='nav-link'>Sign Out</NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <NavLink to='/home' className='nav-link'></NavLink>
    {/* <NavLink exact to='/' className='nav-link'>Home</NavLink> */}
  </Fragment>
)

const Header = ({ user }) => (
  <div className='nav'>
    <Navbar className='nav' expand='md'>
      <Navbar.Brand>
        <Link to='/home' className='nav-meme' style={{ textDecoration: 'none' }}>Meme Central</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {user && (
            <span className='navbar-text mr-2'>NiCe tO mEmE yOu, {user.email}</span>
          )}
          {alwaysOptions}
          {user ? authenticatedOptions : unauthenticatedOptions}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
)

export default Header
