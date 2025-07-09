const http = require("http");
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./routes/apiRoutes");

// Шлях до фронтенду
const publicDir = path.join(__dirname, "public");

function serveStaticFile(req, res) {
    const filePath = req.url === "/" ? "/index.html" : req.url;
    const fullPath = path.join(publicDir, filePath);

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

const server = http.createServer((req, res) => {
    if (req.url.startsWith("/api")) {
        apiRoutes(req, res);
    } else {
        serveStaticFile(req, res);
    }
});

server.listen(3000, () => {
    console.log("🚀 Сервер працює: http://localhost:3000");
});
