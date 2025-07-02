const http = require("http");
const serveStaticFile = require("./utils/serveStaticFile");
const handleGetMessages = require("./utils/handleGetMessages");
const handlePostMessage = require("./utils/handlePostMessage");

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        if (req.url === "/api/messages") {
            handleGetMessages(req, res);
        } else {
            serveStaticFile(req, res);
        }
    } else if (req.method === "POST" && req.url === "/api/message") {
        handlePostMessage(req, res);
    } else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("💬 Сервер запущено: http://localhost:3000");
});
