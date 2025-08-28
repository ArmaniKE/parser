import XLSX from "xlsx";
import fs from "fs";

export function parseExcelToJson(inputPath, outputPath) {
  // Читаем книгу
  const wb = XLSX.readFile(inputPath);

  // Берём первый лист
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];

  // Конвертируем в массив объектов
  const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  // Сохраняем в JSON
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");

  console.log(`✅ Файл ${inputPath} прочитан, найдено ${data.length} строк`);
}
