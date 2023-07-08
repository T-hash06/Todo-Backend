import type { Request, Response } from 'express';
import type { User } from '@prisma/client';

import * as UserService from '../services/UserService';

export async function get(req: TypedQueryRequest<User>, res: Response) {
	try {
		const result = await UserService.getOne(req.query.username);
		res.send(result);
	} catch (e: any) {
		res.status(404).send(e.message);
	}
}

export async function post(req: Request, res: Response) {
	const result = await UserService.createOne(req.body);

	res.send();
}
