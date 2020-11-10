import React from 'react';

import { NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/store/actions';

const UserProfile = ({ username, handleExpandChange }) => {
  const dispatch = useDispatch();
  const logoutt = () => {
    dispatch(logout());
  };

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
          logoutt();
        }}
      >
        <i className='fas fa-sign-out-alt'></i> Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default UserProfile;
