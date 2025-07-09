const { readJSON, writeJSON } = require("../utils/fileStorage");
const path = require("path");

const messagesPath = path.join(__dirname, "..", "messages.json");

// GET /api/messages
function getMessages(req, res) {
    readJSON(messagesPath)
        .then((messages) => {
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(messages));
        })
        .catch(() => {
            res.writeHead(500);
            res.end(
                JSON.stringify({ error: "Не вдалося прочитати повідомлення" })
            );
        });
}

// POST /api/message
function saveNewMessage(req, res) {
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", async () => {
        try {
            const { name, message } = JSON.parse(body);

            const newMsg = {
                name,
                message,
                time: new Date().toISOString(),
            };

            const messages = await readJSON(messagesPath).catch(() => []);
            messages.push(newMsg);

            await writeJSON(messagesPath, messages);

            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            res.end(
                JSON.stringify({
                    reply: `Привіт, ${name}! Ти написав: "${message}"`,
                })
            );
        } catch {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Невірний JSON" }));
        }
    });
}

module.exports = { getMessages, saveNewMessage };
