import type { Request, Response } from 'express';
import { ValidationError } from 'runtypes';

import { NewTodoModel, UpdateTodoModel } from '../models/TodoModel';
import { getCredentials, UnauthorizedError } from '../util/Http';

import * as TodoService from '../services/TodoService';

export async function get(req: Request, res: Response) {
	try {
		const data = await getCredentials(req);

		const result = await TodoService.getAll(data.username);
		res.status(result.code).send(result.data);
	} catch (e: unknown) {
		if (e instanceof UnauthorizedError) {
			return res.sendStatus(401);
		}

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

export async function update(
	req: TypedBodyRequest<UpdateTodoModel>,
	res: Response
) {
	try {
		const body = UpdateTodoModel.check(req.body);
		const data = await getCredentials(req);

		const response = await TodoService.update(body, data.username);

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

export async function remove(
	req: TypedParamsRequest<{ id: string }>,
	res: Response
) {
	try {
		const id = Number(req.params.id) || -1;
		const data = await getCredentials(req);

		const response = await TodoService.deleteOne(id, data.username);

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
