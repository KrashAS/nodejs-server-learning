const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "log.txt");
const message = `${new Date().toISOString()} — Користувач зайшов у застосунок\n`;

fs.appendFile(logPath, message, (err) => {
    if (err) {
        console.error("Помилка логування:", err);
        return;
    }
    console.log("📝 Лог додано.");
});
