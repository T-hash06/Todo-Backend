import type { Response } from 'express';

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
		res.status(500).send(e);
	}
}
