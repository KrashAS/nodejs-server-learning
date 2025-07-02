const http = require("http"); // для створення сервера
const serveStaticFile = require("./utils/serveStaticFile");

const server = http.createServer((req, res) => {
    // Тут буде вся логіка: обробка GET, POST, 404
    if (req.method === "GET") {
        // Статичні файли
        serveStaticFile(req, res);
    } else if (req.method === "POST" && req.url === "/api/message") {
        let body = "";

        req.on("data", (chunk) => (body += chunk.toString()));

        req.on("end", () => {
            try {
                const parsed = JSON.parse(body); // розпарсити JSON

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
    console.log("💬 JSON API: http://localhost:3000");
});
