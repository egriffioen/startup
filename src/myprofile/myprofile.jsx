import React from 'react';
import './myprofile.css';

export function MyProfile() {
  return (
    <main className="container-fluid bg-success mt-5 pt-5 pb-3">
      <h3>My Adventure Log (Database Placeholder)</h3>

      <div className="container examplepost mb-3 mt-2">
          <span>Example Post</span>
          <li>Hike Name: Y Mountian</li>
          <li>Difficulty: Intermediate</li>
          <li>Distance: 2 miles</li>
          <li>Date: 8/26/2024</li>
          <li>Start Time: 9:00am</li>
          <li>End Time: 11:00am</li>
          <li>Rating: 4 Stars</li>
          <li>Jounral: Good hike, felt very steep, but loved the views of BYU campus</li>
      </div>


      <form className="container hikerlogform" action="/myprofile" method="get" enctype="multipart/form-data">
        <h3>Add To Your Adventure Log:</h3>
            <label for="name-of-hike">Name Of Hike: </label>
            <input type="text" className="form-control" id="name-of-hike" name="varText" placeholder="Hike Name" />
            <fieldset>
              <legend>Difficulty</legend>
              <div className="form-check">
                <label for="easy" class="form-check-label">Easy</label>
                <input type="radio" id="easy" className="form-check-input" name="varDifficulty" value="Easy" />
              </div>
              <div className="form-check">
                <label for="intermediate" className="form-check-label">Intermediate</label>
                <input type="radio" id="intermediate" className="form-check-input" name="varDifficulty" value="Intermediate" />
              </div>
              <div className="form-check">
                <label for="advanced" className="form-check-label">Advanced</label>
                <input type="radio" id="advanced" className="form-check-input" name="varDifficulty" value="Advanced" />
              </div>
              <div className="form-check">
                <label for="expert" className="form-check-label">Expert</label>
                <input type="radio" id="expert" className="form-check-input" name="varDifficulty" value="Expert" />
              </div>
            </fieldset>
            <label for="Distance">Distance: </label>
            <input type="number" className="form-control" name="distance" id="distance" min="0" step="0.5" placeholder="Miles" />
            <label for="datetime">Date of Hike: </label>
            <input type="datetime-local" className="form-control" name="varDatetime" id="datetime" />
            <label for="start-time">Start Time: </label>
            <input type="time" className="form-control" name="start-time" id="start-time" />
            <label for="end-time">End Time: </label>
            <input type="time" className="form-control" name="end-time" id="end-time" />
            <fieldset>
              <legend>Rating</legend>
              <div className="form-check">
                <label for="rating1" className="form-check-label">1 Star</label>
                <input type="radio" id="rating1" className="form-check-input" name="varRating" value="rating1" />
              </div>
              <div className="form-check">
                <label for="rating2" className="form-check-label">2 Stars</label>
                <input type="radio" id="rating2" className="form-check-input" name="varRating" value="rating2" />
              </div>
              <div className="form-check">
                <label for="rating3" className="form-check-label">3 Stars</label>
                <input type="radio" id="rating3" className="form-check-input" name="varRating" value="rating3" />
              </div>
              <div className="form-check">
                <label for="rating4" className="form-check-label">4 Stars</label>
                <input type="radio" id="rating4" className="form-check-input" name="varRating" value="rating4" />
              </div>
              <div className="form-check">
                <label for="rating5" className="form-check-label">5 Stars</label>
                <input type="radio" id="rating5" className="form-check-input" name="varRating" value="rating5" />
              </div>
            </fieldset>
            <label for="journal-entry">Journal Entry: </label>
            <textarea id="journal-entry" className="form-control" name="journal-entry"></textarea>
            <button type="submit" className="btn bg-dark-green mt-2 mb-2">Submit</button>
      </form>
    </main>
  );
}