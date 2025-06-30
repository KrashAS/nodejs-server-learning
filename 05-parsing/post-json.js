const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/data" && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const parsed = JSON.parse(body);

                res.writeHead(200, {
                    "Content-Type": "application/json; charset=utf-8",
                });
                res.end(JSON.stringify({ received: parsed }));
            } catch (err) {
                res.writeHead(400, {
                    "Content-Type": "text/plain; charset=utf-8",
                });
                res.end("❌ Помилка JSON");
            }
        });
    } else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("📦 Сервер приймає POST на http://localhost:3000/data");
});
