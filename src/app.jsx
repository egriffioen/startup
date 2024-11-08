import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './app.css';

export default function App() {
  return (
  <div  className="body bg-dark-green text-light varela-round-regular">
    <header className="container-fluid">
      <nav className="navbar navbar-expand-sm bg-dark-green navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">My Hiking Adventure<sup>&reg;</sup></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <menu className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active text-white" href="index.html">Home</a>
             </li>
              <li className="nav-item">
                <a  className="nav-link text-white" href="myprofile.html">My Profile</a>
              </li>
              <li className="nav-item">
                <a  className="nav-link text-white" href="chat.html">Chat</a>
              </li>
              <li className="nav-item">
                <a  className="nav-link text-white" href="about.html">About</a>
              </li>
            </menu>
          </div>
        </div>
      </nav>
    </header>

    <main className="bg-success">App components go here</main>

    <footer className="footer">
      <div className="container-fluid mt-1 mb-2">
        <span className="text-reset">Author: Ella Griffioen</span>
        <a className="text-reset hikinglinks" href="https://github.com/egriffioen/startup">GitHub</a>
        <br/>
        <div className="hikinglinks">
          Find local hikes using <a class="text-reset" href="https://www.alltrails.com/">All Trails</a>
        </div>
        <br/>
        <div className="hikinglinks">
          Find the best gear using <a class="text-reset" href="https://www.thehikinglife.com/">The Hiking Life</a>
        </div>
      </div>
    </footer>
    {/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>*/}
  </div>
  );
}