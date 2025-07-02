const http = require("http");
const serveStaticFile = require("./utils/serveStaticFile");
const saveMessage = require("./utils/saveMessage");

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        serveStaticFile(req, res);
    } else if (req.method === "POST" && req.url === "/api/message") {
        let body = "";

        req.on("data", (chunk) => (body += chunk.toString()));

        req.on("end", () => {
            try {
                const parsed = JSON.parse(body);

                // Зберігаємо повідомлення
                saveMessage({
                    name: parsed.name,
                    message: parsed.message,
                    time: new Date().toISOString(),
                });

                res.writeHead(200, {
                    "Content-Type": "application/json; charset=utf-8",
                });
                res.end(
                    JSON.stringify({
                        reply: `Привіт, ${parsed.name}! Ти написав: "${parsed.message}"`,
                    })
                );
            } catch {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("💬 Сервер запущено: http://localhost:3000");
});
