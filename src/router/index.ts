import { readdirSync } from 'fs';
import { Router } from 'express';

const router = Router();

function removeExtension(file: string) {
	return file.split('.')[0];
}

readdirSync(__dirname).forEach((file) => {
	if (file.startsWith('index')) return;
	router.use(`/${removeExtension(file)}`, require(`./${file}`).default);

	console.log(`Route ${removeExtension(file)} loaded...`);
});

console.log('\nRoutes loaded!');

export default router;
