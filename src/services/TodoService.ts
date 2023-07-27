import database from '../database/db';
import type { ServiceResponse } from '../util/Http';
import type {
	TodoModel,
	NewTodoModel,
	UpdateTodoModel,
} from '../models/TodoModel';

export async function getAll(
	username: string
): Promise<ServiceResponse<TodoModel[] | null>> {
	const result = await database.todo.findMany({
		where: { authorUsername: username },
	});

	return { code: 200, data: result };
}

export async function createOne(
	newTodo: NewTodoModel,
	username: string
): Promise<ServiceResponse<string | null>> {
	try {
		const response = await database.todo.create({
			data: {
				...newTodo,
				done: false,
				label: newTodo.label.toLowerCase(),
				authorUsername: username,
			},
		});

		return { code: 201, data: response.id.toString() };
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

		if (updateData.label !== undefined) {
			updateData.label = updateData.label.toLowerCase();
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
