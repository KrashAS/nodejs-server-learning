const { db } = require("../db/db");

// GET /api/messages
async function getMessages(req, res) {
    try {
        await db.read();
        const messages = db.data?.messages || [];

        res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify(messages));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Не вдалося прочитати повідомлення" }));
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
