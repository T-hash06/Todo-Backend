import type { NextFunction, Request, Response } from 'express';

export function validateAccessToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers['x-api-key'];

	if (token === undefined) {
		return res.status(401).send('No token provided');
	}

	if (token !== process.env.ACCESS_TOKEN) {
		return res.status(401).send('Invalid token');
	}

	next();
}
