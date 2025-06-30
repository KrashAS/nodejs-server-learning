const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/hello" && req.method === "GET") {
        const name = parsedUrl.query.name || "гість";

        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(`Привіт, ${name}!`);
    } else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("🔍 Сервер на http://localhost:3000/hello?name=Andrii");
});
