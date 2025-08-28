import chokidar from "chokidar";
import simpleGit from "simple-git";
import { parseExcelToJson } from "./parse.js";

console.log("🚀 Вотчер запущен — жду изменений test.xlsx...");
const git = simpleGit();

chokidar.watch("test.xlsx").on("change", async (path) => {
  console.log(`📂 Файл изменён: ${path}`);
  await parseExcelToJson(path, "parsed.json");

  await git.add(["parsed.json"]);
  await git.commit(`update products ${new Date().toISOString()}`);
  await git.push("origin", "main");

  console.log("✅ Изменения отправлены в GitHub");
});
