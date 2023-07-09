import { Record, Number, String, Static } from 'runtypes';

export const SessionModel = Record({
	userId: Number,
	timestamp: Number,
});

export const RequestSessionModel = Record({
	username: String,
	password: String,
});

export type SessionModel = Static<typeof SessionModel>;
export type RequestSessionModel = Static<typeof RequestSessionModel>;
