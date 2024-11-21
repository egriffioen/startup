import React, { useState, useEffect } from 'react';
import './myprofile.css';


export function MyProfile() {
  const userName = localStorage.getItem('userName');
 
  // Initialize state with data from localStorage (if it exists), or an empty array if not
  const [hikeName, setHikeName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rating, setRating] = useState('');
  const [journal, setJournal] = useState('');
  const [hikeLog, setHikeLog] = useState([]);
  const [allHikerStatus, setAllHikerStatus] = useState([]);


  useEffect(() => {
    async function fetchHikeLog() {
      try {
        const response = await fetch(`/api/logs?userName=${userName}`);
        const data = await response.json();
        setHikeLog(data || []); // Update state with the fetched log
      } catch (error) {
        console.error('Error fetching hike log:', error);
      }
    }


    fetchHikeLog(); // Call the function to fetch the hike log
  }, [userName]); // Re-run the effect when userName changes




  // Function to calculate hiker status as the length of the hike log
  const calculateHikerStatus = (log) => log.length;


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    // if (!hikeName || !difficulty || !distance) {
    //   alert('Please fill in all the required fields');
    //   return;
    // }


    // Create a new hike object
    const newHike = { hikeName, difficulty, distance, date, startTime, endTime, rating, journal };


    // Update the hike log and store it in localStorage
    const updatedLog = [...hikeLog, newHike];
    setHikeLog(updatedLog);
    //localStorage.setItem(`hikeLog_${userName}`, JSON.stringify(updatedLog));


    try {
      await saveHikeLog(userName, newHike);
      const newHikerStatus = calculateHikerStatus(updatedLog);
      await saveStatus(userName, newHikerStatus);
    } catch (error) {
      console.error('Error saving data:', error);
    }






    // Calculate new hiker status and store it in localStorage
    const newHikerStatus = calculateHikerStatus(updatedLog);
    localStorage.setItem(`hikerStatus_${userName}`, newHikerStatus);


   
    async function saveHikeLog(userName, newHike) {
      const logData = {userName, hikeLog: newHike};
      await fetch('/api/hikeLog', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Hiker log saved:', data);
      })
      .catch ((error) => {
        console.error('Error saving hiker log:', error);
      });
    }


    async function saveStatus(userName, newHikerStatus) {
      const newStatus = { name: userName, hikerStatus: newHikerStatus };


      await fetch('/api/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Hiker status updated:', data);
        setAllHikerStatus(data);  // Update the hiker status in the frontend
      })
      .catch((error) => {
        console.error('Error updating hiker status:', error);
      });
    }


    // saveStatus(userName, newHikerStatus);
    // saveHikeLog(userName, updatedLog);


    // Clear the form fields
    setHikeName('');
    setDifficulty('');
    setDistance('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setRating('');
    setJournal('');
  };


  useEffect(() => {
    // Keep the hike log in sync with localStorage
    localStorage.setItem(`hikeLog_${userName}`, JSON.stringify(hikeLog));
  }, [hikeLog, userName]);


  return (
    <main className="container-fluid bg-success mt-5 pt-5 pb-3">
      <h3>My Adventure Log (Database Placeholder)</h3>


      {/* Display all the hikes in the log */}
      {hikeLog.length > 0 && (
        <div className="container">
          <h4>Adventure Log:</h4>
          {hikeLog.map((hike, index) => (
            <div key={index} className="container examplepost mb-3 mt-2">
              <span>{hike.hikeName}</span>
              <ul>
                <li>Difficulty: {hike.difficulty}</li>
                <li>Distance: {hike.distance} miles</li>
                <li>Date: {hike.date}</li>
                <li>Start Time: {hike.startTime}</li>
                <li>End Time: {hike.endTime}</li>
                <li>Rating: {hike.rating}</li>
                <li>Journal: {hike.journal}</li>
              </ul>
            </div>
          ))}
        </div>
      )}


      {/* Form for adding a new hike */}
      <form className="container hikerlogform" onSubmit={handleSubmit}>
        <h3>Add To Your Adventure Log:</h3>


        {/* Hike Name */}
        <label htmlFor="name-of-hike">Name Of Hike: </label>
        <input
          type="text"
          className="form-control"
          id="name-of-hike"
          value={hikeName}
          onChange={(e) => setHikeName(e.target.value)}
          placeholder="Hike Name"
        />


        {/* Difficulty */}
        <fieldset>
          <legend>Difficulty</legend>
          {['Easy', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
            <div className="form-check" key={level}>
              <input
                type="radio"
                id={level}
                className="form-check-input"
                name="difficulty"
                value={level}
                checked={difficulty === level}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <label htmlFor={level} className="form-check-label">
                {level}
              </label>
            </div>
          ))}
        </fieldset>


        {/* Distance */}
        <label htmlFor="distance">Distance: </label>
        <input
          type="number"
          className="form-control"
          id="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Miles"
        />


        {/* Date */}
        <label htmlFor="datetime">Date of Hike: </label>
        <input
          type="datetime-local"
          className="form-control"
          id="datetime"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />


        {/* Start Time */}
        <label htmlFor="start-time">Start Time: </label>
        <input
          type="time"
          className="form-control"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />


        {/* End Time */}
        <label htmlFor="end-time">End Time: </label>
        <input
          type="time"
          className="form-control"
          id="end-time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />


        {/* Rating */}
        <fieldset>
          <legend>Rating</legend>
          {['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'].map((rate, idx) => (
            <div className="form-check" key={idx}>
              <input
                type="radio"
                id={`rating${idx + 1}`}
                className="form-check-input"
                name="rating"
                value={rate}
                checked={rating === rate}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor={`rating${idx + 1}`} className="form-check-label">
                {rate}
              </label>
            </div>
          ))}
        </fieldset>


        {/* Journal Entry */}
        <label htmlFor="journal-entry">Journal Entry: </label>
        <textarea
          id="journal-entry"
          className="form-control"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
        ></textarea>


        {/* Submit Button */}
        <button type="submit" className="btn bg-dark-green mt-2 mb-2">
          Submit
        </button>
      </form>
    </main>
  );
}


