import React, { useEffect, useState } from 'react';
import './chat.css';

export function Chat() {
  const [allHikerStatus, setAllHikerStatus] = useState([]);

  useEffect(() => {
    fetch('/api/hikerStatus')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched hiker status:", data);
        setAllHikerStatus(data);
      })
      .catch((error) => {
        console.error("Error fetching hiker status:", error);
      });
  }, []);


  const hikerStatusRows = Array.isArray(allHikerStatus) && allHikerStatus.length > 0
  ? allHikerStatus.map((hiker, index) => (
      <tr key={index}>
        <td>
          {hiker.name && hiker.name.includes('@') 
            ? hiker.name.split('@')[0] 
            : hiker.name || 'Guest'}
        </td>
        <td>{hiker.hikerStatus} Hikes Logged</td>
      </tr>
    ))
  : (
      <tr key="0">
        <td colSpan="2">Be the first explorer!</td>
      </tr>
    );


  return (
    <main className="container-fluid bg-success text-center mt-5 pt-5 pb-3">
      <h2>Live Chat</h2>
      <div class="name">
        <fieldset id="name-controls">
          <legend>My Name</legend>
          <input id="my-name" type="text" />
        </fieldset>
      </div>

      <fieldset id="chat-controls" disabled>
        <legend>Chat</legend>
        <input id="new-msg" type="text" />
        <button onclick="sendMessage()">Send</button>
      </fieldset>
      <div id="chat-text"></div>

      <h2>Explorer Hiking Status</h2>
      <table className="table table-bordered text-white container hikerscoretable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Hiker Level</th>
          </tr>
        </thead>
        <tbody id="hikerStatus">
          {hikerStatusRows}
        </tbody>
      </table>
    </main>
  );
}
