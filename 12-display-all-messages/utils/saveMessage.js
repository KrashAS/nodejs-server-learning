const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../messages.json");

function saveMessage(data) {
    fs.readFile(filePath, "utf8", (err, content) => {
        let messages = [];

        if (!err && content) {
            try {
                messages = JSON.parse(content);
            } catch {
                messages = [];
            }
        }

        messages.push(data);

        fs.writeFile(
            filePath,
            JSON.stringify(messages, null, 2),
            "utf8",
            (err) => {
                if (err) {
                    console.error("❌ Не вдалося зберегти повідомлення:", err);
                }
            }
        );
    });
}

module.exports = saveMessage;
