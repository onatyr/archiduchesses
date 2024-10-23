import express, { NextFunction } from 'express';
import cors from 'cors';
import * as http from 'http';
import { router } from './router';
import { authenticate } from './middlewares/auth.middleware';
import axios from 'axios';
import { log } from '../shared/utils/logs.util';

const app = express.Router();

const baseUrl = 'https://trefle.io/';
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use((req: express.Request, res: express.Response, next: NextFunction) => {
  next();
});
app.use(authenticate);

// Controllers
app.use(router);

// Start the server
const server = http.createServer(express().use(app));
server.listen(PORT, () => {
  log('HTTP Server listening at port : ' + PORT);
});
