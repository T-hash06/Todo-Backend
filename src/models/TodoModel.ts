import { Record, Number, String, Boolean, Optional, Static } from 'runtypes';

export const TodoModel = Record({
	id: Number,
	title: String,
	description: String,
	done: Boolean,
	priority: Number,
	authorUsername: String,
});

export const NewTodoModel = Record({
	title: String,
	description: String,
	priority: Number,
});

export const UpdateTodoModel = Record({
	id: Number,
	title: Optional(String),
	description: Optional(String),
	done: Optional(Boolean),
	priority: Optional(Number),
}).withConstraint(
	(x) =>
		x.description !== undefined ||
		x.priority !== undefined ||
		x.title !== undefined ||
		x.done !== undefined
);

export type TodoModel = Static<typeof TodoModel>;
export type NewTodoModel = Static<typeof NewTodoModel>;
export type UpdateTodoModel = Static<typeof UpdateTodoModel>;
