import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesFile = path.join(__dirname, "../messages.json");

export default function handleDeleteMessage(req, res, id) {
    fs.readFile(messagesFile, "utf8", (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end("Помилка читання файлу");
        }

        let messages = JSON.parse(data);
        const index = messages.findIndex((m) => m.id === id);

        if (index === -1) {
            res.writeHead(404);
            return res.end("Повідомлення не знайдено");
        }

        messages.splice(index, 1);

        fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                res.writeHead(500);
                return res.end("Помилка запису файлу");
            }

            res.writeHead(204); // No Content
            res.end();
        });
    });
}
