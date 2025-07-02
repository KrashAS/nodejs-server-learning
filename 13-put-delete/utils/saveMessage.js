import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

        // додаємо унікальний id у саме повідомлення
        data.id = uuidv4();

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

export default saveMessage;
