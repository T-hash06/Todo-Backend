import * as express from 'express';
import { config } from 'dotenv';

import router from './router';

config();

const app = express.default();

app.use(express.json());

app.use((req, res, next) => {
	const ip = req.socket.remoteAddress;

	if (ip !== process.env.FRONTEND_HOST) {
		res.status(401).send('Unauthorized');
		return;
	}

	next();
});

app.use('/', router);

export default app;
