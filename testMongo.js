// testMongo.js
/*import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  console.log(categories);
}

main()
  .catch((e) => {
    console.error("❌ Gagal koneksi MongoDB", e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
*/

// testMongo.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const data = await prisma.category.findMany();
    console.log("✅ Data ditemukan:", data);
  } catch (err) {
    console.error("❌ Gagal koneksi MongoDB", err);
  }
}

main();
