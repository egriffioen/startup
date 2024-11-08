import React from 'react';
import './about.css';

export function About() {
  return (
    <main className="container-fluid bg-success text-center mt-5 pt-5 pb-3">
      <h1>My Hiking Adventure</h1>
      <div className="container-fluid pt-4 row justify-content-center align-items-center">
        <div id="picture" className="picture-box col-md-5"><img className="img-fluid rounded" width="400px" src="https://images.pexels.com/photos/1083515/pexels-photo-1083515.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Forest Image" /></div>
            <p className="col-md-5">
                My hiking adventure is an interactive web program that allows you to connect to this beautiful world. You can
                document your adventures, just like the explorers of the past. Track your progress as you complete higher difficulty
                hikes, and never forgot the precious memories you made along the way.
            </p>
      </div>
      <div className="container-fluid pt-4 row justify-content-center align-items-center">
            <p class="col-md-4">
                You can also connect with your friends, see them progress, and chat about your most recent adventure or favorite
                hiking gear. With this app, the world is yours.
            </p>
        <div id="picture-quote" className="picture-box col-md-4"><img className="img-fluid rounded" width="300px" src="https://live.staticflickr.com/65535/49679703881_5174a61842_o.jpg" alt="Hiking quote" /></div>
      </div>
    </main>
  );
}