import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <h1>Hello {props.userName.split('@')[0]}!</h1>
      <div className="d-flex gap-2 justify-content-center">
      <Button variant='bg-dark-green' type="submit" className="btn bg-dark-green" onClick={() => navigate('/myprofile')}>
        My Profile
      </Button>
      <Button variant='bg-dark-green' type="submit" className="btn bg-dark-green" onClick={() => logout()}>
        Logout
      </Button>
      </div>
    </div>
  );
}
