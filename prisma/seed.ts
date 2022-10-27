import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const csv = require('csvtojson');

const SALT_PASSWORD = 12;

async function main() {
  await csv()
    .fromFile(__dirname + '/data/manga.csv')
    .then(async (mangas) => {
      for (const manga of mangas) {
        manga.id = parseInt(manga.id);
        await prisma.manga.upsert({
          where: { id: manga.id },
          update: manga,
          create: manga,
        });
      }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(0);
  });
