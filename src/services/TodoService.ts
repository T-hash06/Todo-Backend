import database from '../database/db';
import type { ServiceResponse } from '../util/Http';
import type {
	TodoModel,
	NewTodoModel,
	UpdateTodoModel,
} from '../models/TodoModel';

export async function getAll(): Promise<ServiceResponse<TodoModel[] | null>> {
	const result = await database.todo.findMany();

	return { code: 200, data: result };
}

export async function createOne(
	newTodo: NewTodoModel,
	username: string
): Promise<ServiceResponse<null>> {
	try {
		await database.todo.create({
			data: { ...newTodo, done: false, authorUsername: username },
		});

		return { code: 201, data: null };
	} catch (e: unknown) {
		console.log(e);

		return { code: 500, data: null };
	}
}

export async function update(
	updateData: UpdateTodoModel,
	username: string
): Promise<ServiceResponse<null>> {
	try {
		const todo = await database.todo.findUnique({
			where: { id: updateData.id },
		});

		if (todo === null) {
			return { code: 404, data: null };
		}

		if (todo.authorUsername !== username) {
			return { code: 401, data: null };
		}

		const response = await database.todo.update({
			where: { id: updateData.id },
			data: { ...updateData },
		});

		return { code: 200, data: null };
	} catch (e: unknown) {
		console.log(e);

		return { code: 500, data: null };
	}
}
