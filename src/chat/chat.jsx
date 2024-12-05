import React, { useEffect, useState, useRef } from 'react';
import './chat.css';

export function Chat() {
  const [allHikerStatus, setAllHikerStatus] = useState([]);
  const chatTextRef = useRef(null);
  const nameInputRef = useRef(null);
  const msgInputRef = useRef(null);
  const socketRef = useRef(null); // Keep track of the WebSocket instance

  // Fetch hiker status when the component mounts
  useEffect(() => {
    fetch('/api/hikerStatus')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched hiker status:', data);
        setAllHikerStatus(data);
      })
      .catch((error) => {
        console.error('Error fetching hiker status:', error);
      });
  }, []);

  // Set up WebSocket when the component mounts
  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socketRef.current = socket;

    socket.onopen = () => {
      appendMsg('system', 'websocket', 'connected');
    };

    socket.onmessage = (event) => {
      const chat = JSON.parse(event.data);
      appendMsg('hiker', chat.name, chat.msg);
    };

    socket.onclose = () => {
      appendMsg('system', 'websocket', 'disconnected');
    };

    function appendMsg(cls, from, msg) {
      if (chatTextRef.current) {
        const chatEl = document.createElement('div');
        chatEl.innerHTML = `<span class="${cls}">${from}</span>: ${msg}`;
        chatTextRef.current.prepend(chatEl);
      }
    }

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    const msg = msgInputRef.current?.value;
    const name = nameInputRef.current?.value || 'Guest';
    if (msg && socketRef.current?.readyState === WebSocket.OPEN) {
      appendMsg('me', name, msg);
      socketRef.current.send(JSON.stringify({ name, msg }));
      msgInputRef.current.value = '';
    }
  };

  const appendMsg = (cls, from, msg) => {
    if (chatTextRef.current) {
      const chatEl = document.createElement('div');
      chatEl.innerHTML = `<span class="${cls}">${from}</span>: ${msg}`;
      chatTextRef.current.prepend(chatEl);
    }
  };

  const hikerStatusRows =
    Array.isArray(allHikerStatus) && allHikerStatus.length > 0
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
      <div className="name">
        <fieldset id="name-controls">
          <legend>Hiker Name</legend>
          <input id="my-name" type="text" ref={nameInputRef} />
        </fieldset>
      </div>

      <fieldset id="chat-controls">
        <legend>Chat</legend>
        <input id="new-msg" type="text" ref={msgInputRef} />
        <button onClick={sendMessage}>Send</button>
      </fieldset>
      <div id="chat-text" ref={chatTextRef}></div>

      <h2>Explorer Hiking Status</h2>
      <table className="table table-bordered text-white container hikerscoretable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Hiker Level</th>
          </tr>
        </thead>
        <tbody id="hikerStatus">{hikerStatusRows}</tbody>
      </table>
    </main>
  );
}
