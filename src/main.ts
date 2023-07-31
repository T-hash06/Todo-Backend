import app from './app';

import prisma from './database/db';

const start = () =>
	new Promise<void>((resolve) => {
		const port = process.env.PORT || 3000;

		const server = app.listen(port, () => {
			console.log(`\nApp listening on port ${port}!`);
		});

		server.on('close', () => {
			resolve();
		});
	});

async function main() {
	await start();
}

main().then(() => {
	prisma.$disconnect();
});
