import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-success text-center mt-5 pt-5 pb-3">
      <h1>Hello World!</h1>
      <div id="picture" className="picture-box"><img className="img-fluid rounded"  width="500px" src="https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=800" alt="Forest Image" /></div>
      <form method="get" className="container loginform" action="/myprofile">
        <div className="mt-2 mb-3">Login to explore:</div>
          <div className="input-group mb-3">
            <span className="input-group-text">Username</span>
            <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Password</span>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <button type="submit" className="btn bg-dark-green">Login</button>
          <button type="submit" className="btn bg-dark-green">Create</button>
          <button type="submit" className="btn bg-dark-green">Forgot Password</button>
        </div>
      </form>
    <div class>
      API of Current Weather will go here
    </div>
    <div>
        <li>Temperature: 80 degrees</li>
        <li>Weather: Partly Cloudy</li>
        <li>Heat Index: 90 degrees</li>
    </div>
    </main>
  );
}