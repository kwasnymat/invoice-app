import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import routes from '../../../routes/routes';
import logo from '../../../assets/logo.png';
import UserProfile from '../userProfile/UserProfile';

import './Navigation.scss';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const { isAuth, user } = useSelector(({ auth }) => auth);

  const handleExpandChange = useCallback(() => {
    setExpanded(false);
  }, []);

  const handleNavChange = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  const { home } = routes;

  const authLinks = (
    <>
      <div className='nav__link nav-link'>
        <NavLink
          onClick={handleExpandChange}
          className='inactive'
          activeClassName='active'
          to='/create-invoice'
        >
          <i className='fas fa-folder-plus'></i> Create Invoice
        </NavLink>
      </div>
      <div className='nav__link nav-link'>
        <NavLink
          className='inactive'
          onClick={handleExpandChange}
          activeClassName='active'
          to='/invoices'
        >
          <i className='fas fa-file-invoice'></i> Your Invoices
        </NavLink>
      </div>
      <div className='nav__link nav-link'>
        <UserProfile
          username={user ? user.username : null}
          handleExpandChange={handleExpandChange}
        />
      </div>
    </>
  );

  const guestLinks = (
    <>
      <div className='nav__link nav-link' onClick={handleExpandChange}>
        <NavLink className='inactive' activeClassName='active' to='/login'>
          <i className='fas fa-user'></i> Login
        </NavLink>
      </div>
      <div className='nav__link nav-link' onClick={handleExpandChange}>
        <NavLink className='inactive' activeClassName='active' to='/sign-up'>
          <i className='fas fa-sign-in-alt'></i> Sign up
        </NavLink>
      </div>
    </>
  );

  return (
    <div className='Navigation'>
      <Navbar expanded={expanded} fixed='top' bg='light' expand='md'>
        <NavLink className='nav__brand' exact to={home.link}>
          <Navbar.Brand>
            <img className='navbar-brand' src={logo} alt='invoiceApp logo' />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          onClick={handleNavChange}
          aria-controls='basic-navbar-nav'
        />
        <Navbar.Collapse>
          <Nav className='ml-auto'>{isAuth ? authLinks : guestLinks}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
