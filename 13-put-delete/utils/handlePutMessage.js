import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesFile = path.join(__dirname, "../messages.json");

function handlePutMessage(req, res, id) {
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));

    req.on("end", () => {
        try {
            const parsed = JSON.parse(body);
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

                // Оновлюємо повідомлення (наприклад, тільки текст)
                messages[index].message =
                    parsed.message || messages[index].message;

                fs.writeFile(
                    messagesFile,
                    JSON.stringify(messages, null, 2),
                    (err) => {
                        if (err) {
                            res.writeHead(500);
                            return res.end("Помилка запису файлу");
                        }

                        res.writeHead(200, {
                            "Content-Type": "application/json",
                        });
                        res.end(JSON.stringify(messages[index]));
                    }
                );
            });
        } catch {
            res.writeHead(400);
            res.end("Невірний JSON");
        }
    });
}

export default handlePutMessage;
