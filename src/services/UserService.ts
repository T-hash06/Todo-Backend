import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { genSalt, hash } from 'bcrypt';

import { PrismaErrorCodes, ServiceResponse } from '../util/Http';
import type { NewUserModel, UserModel } from '../models/UserModel';

import database from '../database/db';

export async function getAll(): Promise<ServiceResponse<UserModel[] | null>> {
	const user = await database.user.findMany();

	if (user === null) {
		return { code: 404, data: null };
	}

	return { code: 200, data: user };
}

export async function createOne(
	data: NewUserModel
): Promise<ServiceResponse<null | string[]>> {
	try {
		const salt = await genSalt(10);
		const cryptedPassword = await hash(data.password, salt);

		await database.user.create({
			data: { ...data, password: cryptedPassword },
		});

		return { code: 201, data: null };
	} catch (e: unknown) {
		if (e instanceof PrismaClientKnownRequestError) {
			switch (e.code) {
				case PrismaErrorCodes.UniqueConstraintViolation:
					return { code: 409, data: e.meta!.target as string[] };
			}
		}

		console.log(e);

		return { code: 500, data: null };
	}
}
