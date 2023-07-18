import type { Request, Response } from 'express';
import { ValidationError } from 'runtypes';

import { NewUserModel } from '../models/UserModel';
import * as UserService from '../services/UserService';

export async function get(_: Request, res: Response) {
	try {
		const result = await UserService.getAll();
		res.status(result.code).send(result.data);
	} catch (e: unknown) {
		res.status(500).send(e);
	}
}

export async function post(req: TypedBodyRequest<NewUserModel>, res: Response) {
	try {
		NewUserModel.check(req.body);

		const response = await UserService.createOne(req.body);

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
