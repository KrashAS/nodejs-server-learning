const fs = require("fs");
const path = require("path");

function serveStaticFile(req, res) {
    const filePath = req.url === "/" ? "/index.html" : req.url;
    const fullPath = path.join(__dirname, "../public", filePath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("Not found");
        }
        // MIME-типи: визначаємо, чи це JS або HTML
        const ext = path.extname(fullPath);
        const mime =
            ext === ".js"
                ? "application/javascript"
                : ext === ".css"
                ? "text/css"
                : "text/html";

        res.writeHead(200, { "Content-Type": `${mime}; charset=utf-8` });
        res.end(data);
    });
}

module.exports = serveStaticFile;
