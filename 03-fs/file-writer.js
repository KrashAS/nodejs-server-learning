const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "output.txt");

const content = "Це текст, який ми записали з Node.js!\n";

fs.writeFile(filePath, content, (err) => {
    if (err) {
        console.error("Помилка запису:", err);
        return;
    }
    console.log("✅ Файл успішно створено.");
});
