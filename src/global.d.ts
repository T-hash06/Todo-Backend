import type { Request } from 'express';

declare global {
	interface TypedParamsRequest<T> extends Request<T, never, never, never> {}
	interface TypedQueryRequest<T> extends Request<never, never, never, T> {}
	interface TypedBodyRequest<T> extends Request<never, never, T, never> {}

	interface JWTPayload {
		username: string;
		email: string;
		name: string;
		iat: number;
		exp: number;
	}

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			PORT: string;
			FRONTEND_HOST: string;
			JWT_SECRET: string;
			ACCESS_TOKEN: string;
		}
	}
}
