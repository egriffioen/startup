import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MyProfile } from './myprofile/myprofile';
import { Chat } from './chat/chat';
import { About } from './about/about';
import { AuthState } from './login/authState';
import {Button} from 'react-bootstrap';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
  <BrowserRouter>
  <div  className="body bg-dark-green text-light varela-round-regular">
    <header className="container-fluid">
      <nav className="navbar fixed-top navbar-expand-sm bg-dark-green navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">My Hiking Adventure<sup>&reg;</sup></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <menu className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link active text-white" to=''>Login</NavLink>
             </li>
             {authState === AuthState.Authenticated && (
              <li className="nav-item">
                <NavLink  className="nav-link text-white" to='myprofile'>My Profile</NavLink>
              </li>
             )}
             {authState === AuthState.Authenticated && (
              <li className="nav-item">
                <NavLink  className="nav-link text-white" to='chat'>Chat</NavLink>
              </li>
             )}
              <li className="nav-item">
                <NavLink  className="nav-link text-white" to='about'>About</NavLink>
              </li>
            </menu>
          </div>
        </div>
      </nav>
    </header>

    <Routes>
        <Route path='/' element={
          <Login
          userName={userName}
          authState={authState}
          onAuthChange={(userName, authState) => {
            setAuthState(authState);
            setUserName(userName);
          }}
          />
          }
          exact
        />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
    </Routes>

    <footer className="footer bg-dark-green text-light">
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-success text-center'>404: Return to sender. Address unknown.</main>;
  }