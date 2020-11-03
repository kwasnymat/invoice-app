import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import routes from '../../../routes/routes';
import logo from '../../../assets/logo.png';

import './Navigation.scss';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandChange = useCallback(() => {
    setExpanded(false);
  }, []);

  const handleNavChange = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  const { createInvoice, yourInvoices, login, signup, home, single } = routes;

  const navigationLinks = [
    { name: createInvoice.name, link: createInvoice.link },
    { name: yourInvoices.name, link: yourInvoices.link },
    { name: login.name, link: login.link },
    { name: signup.name, link: signup.link },
  ];

  const renderNavLinks = () =>
    navigationLinks.map(({ name, link }) => (
      <div className='nav__link nav-link' key={name}>
        <NavLink className='inactive' activeClassName='active' to={link}>
          {name}
        </NavLink>
      </div>
    ));

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
          <Nav onClick={handleExpandChange} className='ml-auto'>
            {renderNavLinks()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
