import { Record, Number, String, Boolean, Optional, Static } from 'runtypes';

export const TodoModel = Record({
	id: Number,
	title: String,
	label: String,
	done: Boolean,
	priority: Number,
	authorUsername: String,
});

export const NewTodoModel = Record({
	title: String,
	label: String,
	priority: Number,
});

export const UpdateTodoModel = Record({
	id: Number,
	title: Optional(String),
	label: Optional(String),
	done: Optional(Boolean),
	priority: Optional(Number),
}).withConstraint(
	(x) =>
		x.priority !== undefined ||
		x.title !== undefined ||
		x.label !== undefined ||
		x.done !== undefined
);

export type TodoModel = Static<typeof TodoModel>;
export type NewTodoModel = Static<typeof NewTodoModel>;
export type UpdateTodoModel = Static<typeof UpdateTodoModel>;
