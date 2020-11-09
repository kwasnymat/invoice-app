import React from 'react';

import { logout } from '../../auth/store/actions';

import { NavDropdown } from 'react-bootstrap';

// import { logout } from '../../flux/actions/authActions';

const userProfile = ({ username, handleExpandChange }) => {
  return (
    <NavDropdown
      title={
        <div style={{ display: 'inline-block', color: 'black' }}>
          <i className='fas fa-user-circle' /> {''}
          {username}
        </div>
      }
    >
      <NavDropdown.Item onClick={handleExpandChange}>
        {' '}
        <i className='fas fa-user-cog'></i> Settings
      </NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item
        onClick={() => {
          handleExpandChange();
          logout();
        }}
      >
        <i className='fas fa-sign-out-alt'></i> Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default userProfile;
