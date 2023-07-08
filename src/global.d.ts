import type { Request } from 'express';

namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		PORT: string;
		FRONTEND_HOST: string;
	}
}

declare global {
	interface TypedQueryRequest<T> extends Request<never, never, never, T> {}
	interface TypedBodyRequest<T> extends Request<never, never, T, never> {}
}
