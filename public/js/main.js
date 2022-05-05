import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

const socket = io();

const postTimes = Array.from(document.getElementsByClassName('timePosted'));

postTimes.forEach(el => (el.innerText = moment(el.dataset.time).fromNow()));

// receive from server
socket.on('update', updates => {
  console.log(updates);

  if (document.getElementById(`likes_${updates.id}`) !== null) {
    document.getElementById(updates.id).innerText = updates.likes;
  }
});

socket.on('postedTime', posts => {
  posts.forEach(post => {
    console.log(moment(post.datePosted).fromNow());
    if (document.getElementById(post._id) !== null) {
      document.getElementById(post._id).innerText = moment(
        post.datePosted
      ).fromNow();
    }
  });
});
