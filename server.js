import express from 'express';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import methodOverride from 'method-override';
import logger from 'morgan';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
import passportConfig from './config/passport.js';
// TODO: stretch goal - include flash messages
// import flash from 'express-flash';
import { httpServer, app } from './middleware/socket-io.js';
// !Routes
import mainRoutes from './routes/main.js';
import postRoutes from './routes/posts.js';

dotenv.config({ path: './config/.env' });

connectDB();

// Passport config
passportConfig(passport);

//Static Folder
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger('dev'));

//Use forms for put / delete
app.use(methodOverride('_method'));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
// app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/post', postRoutes);

// app.listen( () => {
//   console.log('Server is running.');
// });

import formatMessage from './utils/messages.js';
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from './utils/users.js';
import io from './middleware/socket-io.js';

const botName = 'TGN Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

httpServer.listen(process.env.PORT);
