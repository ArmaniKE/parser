import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  const raw = await fs.readFile('parsed.json', 'utf-8');
  const data = JSON.parse(raw);

  for (const item of data) {
    await prisma.product.create({
      data: {
        name: item["Название товара"],
        price: Number(item["Цена (₸)"]),
        unit: item["Ед. измерения"],
        quantity: Number(item["Остаток"])
      }
    });
  }

  console.log("✅ Импорт завершён");
}

main()
  .catch((e) => {
    console.error("❌ Ошибка при импорте:", e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
