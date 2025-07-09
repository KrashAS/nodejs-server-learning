const http = require("http");
const fs = require("fs");
const path = require("path");

const messagesFile = path.join(__dirname, "messages.json");

function serveStaticFile(req, res) {
    const filePath = req.url === "/" ? "/index.html" : req.url;
    const fullPath = path.join(__dirname, "public", filePath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("Not found");
        }

        const ext = path.extname(fullPath);
        const mimeTypes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
        };
        const mime = mimeTypes[ext] || "text/plain";

        res.writeHead(200, { "Content-Type": `${mime}; charset=utf-8` });
        res.end(data);
    });
}

function handlePostMessage(req, res) {
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));

    req.on("end", () => {
        try {
            const parsed = JSON.parse(body);
            const newMessage = {
                name: parsed.name,
                message: parsed.message,
                time: new Date().toISOString(),
            };

            fs.readFile(messagesFile, "utf8", (err, data) => {
                let messages = [];
                if (!err && data) {
                    try {
                        messages = JSON.parse(data);
                    } catch {}
                }

                messages.push(newMessage);
                fs.writeFile(
                    messagesFile,
                    JSON.stringify(messages, null, 2),
                    () => {
                        res.writeHead(200, {
                            "Content-Type": "application/json; charset=utf-8",
                        });
                        res.end(
                            JSON.stringify({
                                reply: `Привіт, ${newMessage.name}! Ти написав: "${newMessage.message}"`,
                            })
                        );
                    }
                );
            });
        } catch {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
    });
}

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/api/messages") {
        fs.readFile(messagesFile, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end("Помилка читання файлу");
            }
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            res.end(data || "[]");
        });
    } else if (req.method === "POST" && req.url === "/api/message") {
        handlePostMessage(req, res);
    } else {
        serveStaticFile(req, res);
    }
});

server.listen(3000, () => {
    console.log("🚀 Сервер працює на http://localhost:3000");
});
