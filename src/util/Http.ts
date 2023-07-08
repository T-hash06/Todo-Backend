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
