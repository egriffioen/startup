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
      <h2>CHAT GOES HERE (WebSocket Placeholder)</h2>
      <div className="container-fluid pt-4 row d-flex justify-content-center align-items-start">
        {/* Example chats */}
        <div className="container row col-md-5 chatborder d-flex justify-content-center align-items-center pb-4">
          <span className="chatheader">Chatting with Peter</span>
          <p className="container messageborder">
            Peter: I heard about your hike to the Y! How was it?
          </p>
          <p className="container messageborder">
            You: It was awesome! Beautiful views and it was so good to do that hike with my sister.
          </p>
          <p className="container messageborder">
            Peter: That sounds fun! It's definitely a steep climb, but it's so satisfying when you get to the top
          </p>
        </div>
        <div className="container row col-md-5 chatborder d-flex justify-content-center align-items-center">
          <span className="chatheader">Chatting with Emmet</span>
          <p className="container messageborder"> 
            You: Hey Emmet! I'm new here to Provo, and I'm looking to hike more. What has been one of your most 
            memorable hikes?
          </p>
          <p className="container messageborder">
            Emmet: Welcome to Provo! Where did you move from? I love hiking here, the mountains are just breath taking.
            I think one of the most memorable hikes was when my friends and I hiked Mount Timpanogos.
          </p>
        </div>
      </div>

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
