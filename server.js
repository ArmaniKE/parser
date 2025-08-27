import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));

// Читаем JSON при каждом запросе (данные всегда свежие)
app.get("/api/products", (req, res) => {
  try {
    const dataPath = path.join(process.cwd(), "parsed.json");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const json = JSON.parse(raw);

    const transformed = json.map((item, index) => ({
      id: index + 1,
      name: item["Название товара"],
      price: item["Цена (₸)"],
      unit: item["Ед. измерения"],
      quantity: item["Остаток"],
    }));

    res.json(transformed);
    // res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка чтения данных" });
  }
});

app.get("/", (req, res) => {
  res.send("API работает. Иди на /api/products, чтобы увидеть данные.");
});

app.listen(PORT, () => {
  console.log(`API сервер запущен на http://localhost:${PORT}`);
});
