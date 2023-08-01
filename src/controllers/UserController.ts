import type { Request, Response } from 'express';
import { ValidationError } from 'runtypes';

import { UnauthorizedError, getCredentials } from '../util/Http';
import { NewUserModel } from '../models/UserModel';
import * as UserService from '../services/UserService';

export async function get(req: Request, res: Response) {
	try {
		const data = await getCredentials(req);

		const result = await UserService.getUserData(data.username);

		res.status(result.code).send(result.data);
	} catch (e: unknown) {
		if (e instanceof UnauthorizedError) {
			return res.sendStatus(401);
		}

		res.status(500).send(e);
	}
}

export async function post(req: TypedBodyRequest<NewUserModel>, res: Response) {
	try {
		const body = NewUserModel.check(req.body);

		const response = await UserService.createOne(body);

		res.status(response.code).json(response.data);
	} catch (e: unknown) {
		if (e instanceof ValidationError) {
			return res.status(400).send(e.details);
		}

		res.status(500).send(e);
	}
}
export async function deleteAll(_: Request, res: Response) {
	try {
		const response = await UserService.deleteAll();
		res.status(response.code).send(response.data);
	} catch (e: unknown) {
		res.status(500).send(e);
	}
}
