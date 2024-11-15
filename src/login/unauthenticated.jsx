import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [weather, setWeather] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.235119&longitude=-111.662193&current=temperature_2m%2Crelative_humidity_2m%2Crain%2Cweather_code');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
    
        const data = await response.json();
        console.log('Weather API Response:', data); // Log the full API response
    
        // Check if current data exists before trying to access its properties
        if (data.current) {
          const currentWeather = data.current;
          console.log('Current weather from the api:', currentWeather);
          
          setWeather({
            temperature: currentWeather.temperature_2m,
            humidity: currentWeather.relative_humidity_2m,
            rain: currentWeather.rain,
          });
          console.log('weather object to be accessed later:',weather);
        } else {
          console.error('Error: Current weather data not found in the response');
          setError('Error: Current weather data not found.');
        }
    
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error.message); // Handle errors here
      }
    };
    fetchWeatherData();
  }, []); // Empty array ensures this only runs once on component mount


  if (error) {
    return <div>Error: {error}</div>;
  }


  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

    


  return (
    <><h1>Hello World!</h1>
    <div id="picture" className="picture-box"><img className="img-fluid rounded" width="500px" src="https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=800" alt="Forest Image" /></div>
    <div className="container loginform">
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
      </div>
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
      <div>
        <h2>Current Weather</h2>
        {console.log(weather)}
        {weather ? (
          <div>
            <li>Temperature: {weather.temperature}°C</li>
            <li>Humidity: {weather.humidity}%</li>
            <li>Rainfall: {weather.rain} mm</li>
          </div>
        ) : (
          <div>Weather data not available</div>
        )}
      </div>
    </>
  );
}