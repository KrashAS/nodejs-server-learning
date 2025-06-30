const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "text.txt");

fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Помилка при читанні:", err);
        return;
    }
    console.log("📖 Вміст файлу:");
    console.log(data);
});
