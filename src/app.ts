import * as express from 'express';
import * as cors from 'cors';
import { config } from 'dotenv';

import router from './router';

config();

const app = express.default();

app.use(express.json());
app.use(cors.default({ origin: process.env.FRONTEND_HOST }));

app.use('/', router);

export default app;
