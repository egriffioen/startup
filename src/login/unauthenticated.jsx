import React from 'react';

import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <><h1>Hello World!</h1>
    <div id="picture" className="picture-box"><img className="img-fluid rounded" width="500px" src="https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=800" alt="Forest Image" /></div>
    <form method="get" className="container loginform" action="/">
          <div className="mt-2 mb-3">Login to explore:</div>
          <div className="input-group mb-3">
              <span className="input-group-text">Username</span>
              <input type="text" className="form-control" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter username" name="username" />
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text">Password</span>
              <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </div>
          <div className="d-flex gap-2 justify-content-center">
              <Button variant="bg-dark-green" type="submit" className="btn bg-dark-green" onClick={() => loginUser()} disabled={!userName || !password}>
                  Login
              </Button>
              <Button variant="bg-dark-green" type="submit" className="btn bg-dark-green" onClick={() => createUser()} disabled={!userName || !password}>
                  Create
              </Button>
          </div>
      </form>
      <div>
      API of Current Weather will go here
    </div>
    <div>
        <li>Temperature: 80 degrees</li>
        <li>Weather: Partly Cloudy</li>
        <li>Heat Index: 90 degrees</li>
    </div></>
  );
}