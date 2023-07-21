import type { Request, Response } from 'express';
import { ValidationError } from 'runtypes';

import * as AuthService from '../services/AuthService';
import { RequestSessionModel } from '../models/AuthModel';

export async function get(req: Request, res: Response) {
	try {
		const header = req.headers.authorization;

		if (header === undefined) {
			return res.sendStatus(401);
		}

		const token = header.split('Bearer ')[1];

		const response = await AuthService.checkSessionValid(token);

		return res.status(response.code).send(response.data);
	} catch (e: unknown) {
		return res.sendStatus(500);
	}
}

export async function post(
	req: TypedBodyRequest<RequestSessionModel>,
	res: Response
) {
	try {
		const { username, password } = RequestSessionModel.check(req.body);

		const response = await AuthService.login(username, password);

		return res.status(response.code).send(response.data);
	} catch (e: unknown) {
		if (e instanceof ValidationError) {
			return res.status(400).send(e.details);
		}

		return res.sendStatus(500);
	}
}

export async function patch(req: Request, res: Response) {
	try {
		const header = req.headers.authorization;

		if (header === undefined) {
			return res.sendStatus(400);
		}

		const token = header.split('Bearer ')[1];

		const response = await AuthService.extendSession(token);

		return res.status(response.code).send(response.data);
	} catch (e: unknown) {
		return res.sendStatus(500);
	}
}
