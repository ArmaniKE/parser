import * as XLSX from "xlsx";
import fs from "fs";

// Читаем книгу
const wb = XLSX.readFile("test.xlsx");

// Берём первый лист
const sheetName = wb.SheetNames[0];
const sheet = wb.Sheets[sheetName];

// Конвертируем в массив объектов
const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

// Сохраняем в JSON
fs.writeFileSync("parsed.json", JSON.stringify(data, null, 2), "utf-8");

console.log(`✅ Файл test.xlsx прочитан, найдено ${data.length} строк`);
