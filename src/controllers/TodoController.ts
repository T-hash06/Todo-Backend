import type { Request, Response } from 'express';
import { ValidationError } from 'runtypes';

import { NewTodoModel, UpdateTodoModel } from '../models/TodoModel';
import { getCredentials, UnauthorizedError } from '../util/Http';

import * as TodoService from '../services/TodoService';

export async function get(_: Request, res: Response) {
	try {
		const result = await TodoService.getAll();
		res.status(result.code).send(result.data);
	} catch (e: unknown) {
		res.status(500).send(e);
	}
}

export async function post(req: TypedBodyRequest<NewTodoModel>, res: Response) {
	try {
		const body = NewTodoModel.check(req.body);

		const data = await getCredentials(req);

		const response = await TodoService.createOne(body, data.username);

		res.status(response.code).send(response.data);
	} catch (e: unknown) {
		if (e instanceof ValidationError) {
			return res.status(400).send(e.details);
		}

		if (e instanceof UnauthorizedError) {
			return res.sendStatus(401);
		}

		res.status(500).send(e);
	}
}

export async function update(req: TypedBodyRequest<any>, res: Response) {
	try {
		// const data = await getCredentials(req);
		const body = UpdateTodoModel.check(req.body);
		const data = await getCredentials(req);

		const response = await TodoService.update(req.body, data.username);

		res.status(response.code).send(response.data);
	} catch (e: unknown) {
		if (e instanceof ValidationError) {
			return res.status(400).send(e.details);
		}

		if (e instanceof UnauthorizedError) {
			return res.sendStatus(401);
		}

		res.status(500).send(e);
	}
}
