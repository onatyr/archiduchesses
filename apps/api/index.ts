import express, { type NextFunction } from 'express';
import cors from 'cors';
import * as http from 'http';
import { router } from './router';
import { authenticate } from './middlewares/auth.middleware';
import axios from 'axios';
import { log } from '@shared/utils/logs.util';

const app = express.Router();

export const plantBookAxiosInstance = axios.create();
export const plantNetAxiosInstance = axios.create();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(authenticate);

// Controllers
app.use(router);
app.use((req: express.Request, res: express.Response, next: NextFunction) => {
  next();
});

// Start the server
const server = http.createServer(express().use(app));
server.listen(PORT, () => {
  log('HTTP Server listening at port : ' + PORT);
});
