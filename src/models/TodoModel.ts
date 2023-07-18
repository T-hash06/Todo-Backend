import { Record, Number, String, Boolean, Static } from 'runtypes';

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

export type TodoModel = Static<typeof TodoModel>;
export type NewTodoModel = Static<typeof NewTodoModel>;
