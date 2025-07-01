const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
};

const server = http.createServer((req, res) => {
    let filePath = req.url === "/" ? "/index.html" : req.url;
    const ext = path.extname(filePath);
    const mimeType = mimeTypes[ext] || "text/plain";

    const fullPath = path.join(__dirname, "public", filePath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end("❌ Файл не знайдено");
        }

        res.writeHead(200, { "Content-Type": `${mimeType}; charset=utf-8` });
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log("🗂️ Сервер статичних файлів: http://localhost:3000");
});
