namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		PORT: string;
		FRONTEND_HOST: string;
	}
}
