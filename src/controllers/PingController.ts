import { Request, Response } from 'express';

export function get(_: Request, res: Response) {
	return res.status(200).send('pong');
}
