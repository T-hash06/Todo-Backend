import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('Database loaded!\n');

export default prisma;
