import * as express from 'express';
import * as cors from 'cors';
import { config } from 'dotenv';

import router from './router';

import { validateAccessToken } from './util/Middleware';

config();

const app = express.default();

app.use(express.json());
app.use(cors.default({ origin: process.env.FRONTEND_HOST.split(' ') }));

app.use('/', validateAccessToken, router);

export default app;
