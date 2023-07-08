import prisma from '../database/db';

import type { User } from '@prisma/client';

export async function getOne(username: string) {
	const users = await prisma.user.findUnique({ where: { username } });

	if (users === null) {
		throw new Error('User not found');
	}
	return users;
}

export async function createOne(data: User) {
	console.log(data);
}
