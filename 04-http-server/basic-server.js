const http = require("http");

function getCurrentTimeFormatted() {
    const now = new Date();
    return now.toLocaleTimeString();
}

const server = http.createServer((req, res) => {
    console.log("🌐 Запит:", req.method, req.url);

    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Привіт з Node.js сервера!");
    } else if (req.url === "/html" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<h1>👋 Hello HTML</h1>`);
    } else if (req.url === "/json" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({ message: "Це JSON відповідь", time: new Date() })
        );
    } else if (req.url === "/time" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(
            `Привіт з Node.js сервера! Зараз: ${getCurrentTimeFormatted()}`
        );
    } else {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Сторінку не знайдено");
    }
});

server.listen(3000, () => {
    console.log("🚀 Сервер запущено на http://localhost:3000");
});
