const http = require("http"); // для створення сервера
const fs = require("fs"); // для читання статичних файлів
const path = require("path"); // для роботи з шляхами

const server = http.createServer((req, res) => {
    // Тут буде вся логіка: обробка GET, POST, 404
    if (req.method === "GET") {
        // Статичні файли
        const filePath = req.url === "/" ? "/index.html" : req.url;
        const fullPath = path.join(__dirname, "public", filePath);

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end("Not found");
            }
            // MIME-типи: визначаємо, чи це JS або HTML
            const ext = path.extname(fullPath);
            const mime = ext === ".js" ? "application/javascript" : "text/html";

            res.writeHead(200, { "Content-Type": `${mime}; charset=utf-8` });
            res.end(data);
        });
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
