const { db } = require("../db/db");
const url = require("url");

// GET /api/messages?name=...&limit=...
async function getMessages(req, res) {
    try {
        await db.read();
        let messages = db.data?.messages || [];

        const parsedUrl = url.parse(req.url, true);
        const { name, limit } = parsedUrl.query;

        if (name) {
            messages = messages.filter(
                (msg) => msg.name.toLowerCase() === name.toLowerCase()
            );
        }

        if (limit) {
            const lim = parseInt(limit);
            if (!isNaN(lim)) {
                messages = messages.slice(0, lim);
            }
        }

        res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify(messages));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Помилка сервера" }));
    }
}

// POST /api/message
async function saveNewMessage(req, res) {
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));

    req.on("end", async () => {
        try {
            const { name, message } = JSON.parse(body);
            //console.log("🧪 Отримано повідомлення:", message.length);
            // 🛡️ Валідація
            if (!name || !message) {
                res.writeHead(400, {
                    "Content-Type": "application/json; charset=utf-8",
                });
                return res.end(
                    JSON.stringify({
                        error: "Ім'я та повідомлення обов'язкові!",
                    })
                );
            }

            if (message.length > 100) {
                res.writeHead(400, {
                    "Content-Type": "application/json; charset=utf-8",
                });
                return res.end(
                    JSON.stringify({
                        error: "Повідомлення занадто довге (макс. 100 символів)",
                    })
                );
            }

            await db.read();
            db.data.messages.push({
                name,
                message,
                time: new Date().toISOString(),
            });
            await db.write();

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

// PUT /api/message/:index
async function updateMessage(req, res) {
    const index = parseInt(req.url.split("/").pop());

    if (isNaN(index)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Невірний індекс" }));
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", async () => {
        try {
            const { name, message } = JSON.parse(body);

            // 🛡️ Валідація
            if (!name || !message) {
                res.writeHead(400, {
                    "Content-Type": "application/json; charset=utf-8",
                });
                return res.end(
                    JSON.stringify({
                        error: "Ім'я та повідомлення обов'язкові!",
                    })
                );
            }

            if (message.length > 300) {
                res.writeHead(400, {
                    "Content-Type": "application/json; charset=utf-8",
                });
                return res.end(
                    JSON.stringify({
                        error: "Повідомлення занадто довге (макс. 300 символів)",
                    })
                );
            }

            await db.read();
            if (!db.data.messages[index]) {
                res.writeHead(404);
                return res.end(
                    JSON.stringify({ error: "Повідомлення не знайдено" })
                );
            }

            db.data.messages[index] = {
                ...db.data.messages[index],
                name,
                message,
            };

            await db.write();
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify({ success: true }));
        } catch {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Невірний JSON" }));
        }
    });
}

// DELETE /api/message/:index
async function deleteMessage(req, res) {
    const index = parseInt(req.url.split("/").pop());

    if (isNaN(index)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Невірний індекс" }));
    }

    await db.read();
    if (!db.data.messages[index]) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Повідомлення не знайдено" }));
    }

    db.data.messages.splice(index, 1);
    await db.write();

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ success: true }));
}

module.exports = {
    getMessages,
    saveNewMessage,
    updateMessage,
    deleteMessage,
};
