const fs = require("fs");
const path = require("path");

function serveStaticFile(req, res) {
    const filePath = req.url === "/" ? "/index.html" : req.url;
    const fullPath = path.join(__dirname, "..", "public", filePath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("404 Not Found");
        }

        const ext = path.extname(fullPath);
        const mimeTypes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
        };

        const mime = mimeTypes[ext] || "text/plain";

        res.writeHead(200, {
            "Content-Type": `${mime}; charset=utf-8`,
        });
        res.end(data);
    });
}

module.exports = serveStaticFile;
