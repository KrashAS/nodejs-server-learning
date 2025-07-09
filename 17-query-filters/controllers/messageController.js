const { db } = require("../db/db");
const url = require("url");

// GET /api/messages?name=...&limit=...
async function getMessages(req, res) {
    try {
        await db.read();
        let messages = db.data?.messages || [];

        const parsedUrl = url.parse(req.url, true);
        const { name, limit } = parsedUrl.query;

        /* console.log("🔍 Фільтр name:", name);
        console.log("🔍 Повідомлень до фільтра:", db.data.messages.length);
        console.log(
            "🔍 Всі імена:",
            db.data.messages.map((m) => m.name)
        ); */

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

module.exports = { getMessages, saveNewMessage };
