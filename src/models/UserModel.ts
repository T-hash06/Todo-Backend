import { Record, String, Number, Static } from 'runtypes';

export const UserModel = Record({
	id: Number,
	name: String,
	email: String,
	username: String,
	password: String,
});

export const NewUserModel = Record({
	name: String,
	email: String,
	username: String,
	password: String,
});

export type UserModel = Static<typeof UserModel>;
export type NewUserModel = Static<typeof NewUserModel>;
