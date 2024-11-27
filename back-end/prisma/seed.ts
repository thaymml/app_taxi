const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.driver.createMany({
    data: [
      { name: 'Homer Simpson', vehicle: 'Plymouth Valiant 1973', rating: 2, ratePerKm: 2.5, minKm: 3 },
      { name: 'Dominic Toretto', vehicle: 'Dodge Charger R/T 1970', rating: 4, ratePerKm: 5, minKm: 5 },
      { name: 'James Bond', vehicle: 'Aston Martin DB5', rating: 5, ratePerKm: 10, minKm: 10 },
    ],
  });
  console.log('Drivers added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });