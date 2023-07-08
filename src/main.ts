import app from './app';

import prisma from './database/db';

const start = () =>
	new Promise<void>((resolve) => {
		const server = app.listen(process.env.PORT, () => {
			console.log('\nApp listening on port 3000!');
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
