import express from 'express';

import { createServer } from 'http';
import { Server } from 'socket.io';

export const app = express();
export const httpServer = createServer(app);
const io = new Server(httpServer, {});
export const useSocket = (req, res, next) => {
  if (req) {
    req.socketIO = io;
    next();
  } else {
    res.redirect('/');
  }
};
export default io;
