const fs = require("fs");
const path = require("path");

const fileName = process.argv[2];

const encoding = process.argv[3] || "utf8";

if (!fileName) {
    console.log(
        "❗ Вкажіть ім’я файлу як аргумент: node read-from-argv.js file.txt"
    );
    process.exit();
}

const filePath = path.join(__dirname, fileName);

fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
        console.error("❌ Помилка:", err.message);
        return;
    }
    console.log("📄 Вміст файлу:");
    console.log(data);
});
