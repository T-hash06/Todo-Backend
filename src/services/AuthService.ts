import { verify, sign, TokenExpiredError } from 'jsonwebtoken';

import { SessionModel } from '../models/AuthModel';
import type { ServiceResponse } from '../util/Http';

import database from '../database/db';

const JwtConfig = {
	expiresIn: '2m',
};

export async function checkSessionValid(
	token: string
): Promise<ServiceResponse<SessionModel | null>> {
	try {
		const payload = verify(token, process.env.JWT_SECRET);

		return { code: 200, data: null };
	} catch (e: unknown) {
		if (e instanceof TokenExpiredError) {
			return { code: 401, data: null };
		}

		console.log(e);

		return { code: 500, data: null };
	}
}

export async function login(
	username: string,
	password: string
): Promise<ServiceResponse<string | null>> {
	try {
		const user = await database.user.findUnique({ where: { username } });

		if (user === null) {
			return { code: 404, data: null };
		}

		if (user.password !== password) {
			return { code: 401, data: null };
		}

		const token = sign(
			{ username: user.username },
			process.env.JWT_SECRET,
			JwtConfig
		);

		return { code: 201, data: token };
	} catch (e: unknown) {
		console.log(e);

		return { code: 500, data: null };
	}
}

export async function extendSession(
	token: string
): Promise<ServiceResponse<string | null>> {
	try {
		const payload = verify(token, process.env.JWT_SECRET) as JWTPayload;

		const newToken = sign(
			{ username: payload.username },
			process.env.JWT_SECRET,
			JwtConfig
		);

		return { code: 200, data: newToken };
	} catch (e: unknown) {
		if (e instanceof TokenExpiredError) {
			return { code: 401, data: null };
		}

		console.log(e);

		return { code: 500, data: null };
	}
}
