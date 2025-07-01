const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        const filePath = path.join(__dirname, "public", "index.html");
        fs.readFile(filePath, (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data);
        });
    } else if (req.method === "POST" && req.url === "/submit") {
        let body = "";

        req.on("data", (chunk) => (body += chunk.toString()));

        req.on("end", () => {
            const parsed = querystring.parse(body);

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(`
        <h2>Дякуємо, ${parsed.name}!</h2>
        <p>Ваше повідомлення: ${parsed.message}</p>
        <a href="/">⬅️ Назад</a>
      `);
        });
    } else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("📩 Сервер форми: http://localhost:3000/");
});
