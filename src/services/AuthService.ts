import {
	verify,
	sign,
	TokenExpiredError,
	JsonWebTokenError,
} from 'jsonwebtoken';
import { compare } from 'bcrypt';

import type { SessionModel } from '../models/AuthModel';
import type { ServiceResponse } from '../util/Http';

import database from '../database/db';

const JwtConfig = {
	expiresIn: '24h',
};

const startDate = new Date().getMilliseconds();

export async function checkSessionValid(
	token: string
): Promise<ServiceResponse<SessionModel | null>> {
	try {
		const payload = verify(
			token,
			process.env.JWT_SECRET + startDate.toString()
		) as SessionModel;

		return { code: 200, data: payload };
	} catch (e: unknown) {
		if (e instanceof TokenExpiredError) {
			return { code: 401, data: null };
		}

		if (e instanceof JsonWebTokenError) {
			return { code: 401, data: null };
		}

		return { code: 500, data: null };
	}
}

export async function login(
	reqUsername: string,
	reqPassword: string
): Promise<ServiceResponse<string | null>> {
	try {
		const user = await database.user.findUnique({
			where: { username: reqUsername },
		});

		if (user === null) {
			return { code: 404, data: null };
		}

		const match = await compare(reqPassword, user.password);

		if (match === false) {
			return { code: 401, data: null };
		}

		const { username, email, name } = user;

		const token = sign(
			{ username, name, email },
			process.env.JWT_SECRET + startDate.toString(),
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

		const { username, name, email } = payload;

		const newToken = sign(
			{ username, name, email },
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
