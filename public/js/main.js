import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

const socket = io();

// receive from server
socket.on('update', updates => {
  console.log(updates);

  if (document.getElementById(updates.id) !== null) {
    document.getElementById(updates.id).innerText = updates.likes;
  }
});
