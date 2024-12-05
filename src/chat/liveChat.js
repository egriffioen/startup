// //Set up websocket protocol to match HTTP
// const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
// const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// // Display open websocket
// socket.onopen = (event) => {
//   appendMsg('system', 'websocket', 'connected');
// };

// // Display messages we receive from hikers
// socket.onmessage = async (event) => {
//   const text = await event.data.text();
//   const chat = JSON.parse(text);
//   appendMsg('hiker', chat.name, chat.msg);
// };

// // Disable when socket closes
// socket.onclose = (event) => {
//     appendMsg('system', 'websocket', 'disconnected');
//     document.querySelector('#name-controls').disabled = true;
//     document.querySelector('#chat-controls').disabled = true;
//   };
  
//   // Send a message
//   export function sendMessage() {
//     const msgEl = document.querySelector('#new-msg');
//     const msg = msgEl.value;
//     if (!!msg) {
//       appendMsg('me', 'me', msg);
//       const name = document.querySelector('#my-name').value;
//       socket.send(`{"name":"${name}", "msg":"${msg}"}`);
//       msgEl.value = '';
//     }
//   }

// // Create one long list of messages
// function appendMsg(cls, from, msg) {
//   const chatText = document.querySelector('#chat-text');
//   const chatEl = document.createElement('div');
//   chatEl.innerHTML = `<span class="${cls}">${from}</span>: ${msg}</div>`;
//   chatText.prepend(chatEl);
// }

// // Send message on enter keystroke
// const input = document.querySelector('#new-msg');
// input.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     sendMessage();
//   }
// });

// // Disable chat if no name provided
// const chatControls = document.querySelector('#chat-controls');
// const myName = document.querySelector('#my-name');
// myName.addEventListener('keyup', (e) => {
//   chatControls.disabled = myName.value === '';
// });