import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import 'express-async-errors';

import ExceptionHandler from './middlewares/ExceptionHandler';
import { router } from './routes';

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log(`User connected on socket ${socket.id}`);
});

app.use(express.json());

app.use(router);

app.use(ExceptionHandler);

export { serverHttp, io };
