import type { Request } from 'express';

import { checkSessionValid } from '../services/AuthService';

export const SuccessCode = [200, 201, 202, 204] as const;
export const ClientErrorCode = [400, 401, 403, 404, 405, 406, 409] as const;
export const ServerErrorCode = [500, 501, 502, 503, 504, 505] as const;

export type SuccessCode = (typeof SuccessCode)[number];
export type ClientErrorCode = (typeof ClientErrorCode)[number];
export type ServerErrorCode = (typeof ServerErrorCode)[number];

export type HttpCode = SuccessCode | ClientErrorCode | ServerErrorCode;

export enum PrismaErrorCodes {
	RecordNotFound = 'P2001',
	UniqueConstraintViolation = 'P2002',
	ForeignKeyConstraintViolation = 'P2003',
	NullConstraintViolation = 'P2011',
}

export interface ServiceResponse<T> {
	code: HttpCode;
	data: T;
}

export class UnauthorizedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UnauthorizedError';
	}
}

export async function getCredentials(
	req:
		| Request
		| TypedBodyRequest<any>
		| TypedQueryRequest<any>
		| TypedParamsRequest<any>
) {
	const header = req.headers.authorization;

	if (header === undefined) {
		throw new UnauthorizedError('No authorization header provided');
	}

	const token = header.split('Bearer ')[1];

	const response = await checkSessionValid(token);

	if (response.code !== 200 || response.data === null) {
		throw new UnauthorizedError('Invalid token');
	}

	return response.data;
}
