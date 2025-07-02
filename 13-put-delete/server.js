import { createServer } from "http";
import { parse } from "url";
import handleDeleteMessage from "./utils/handleDeleteMessage.js";
import handleGetMessages from "./utils/handleGetMessages.js";
import handlePostMessage from "./utils/handlePostMessage.js";
import handlePutMessage from "./utils/handlePutMessage.js";
import serveStaticFile from "./utils/serveStaticFile.js";

const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

    if (req.method === "GET" && parsedUrl.pathname === "/api/messages") {
        handleGetMessages(req, res);
    } else if (req.method === "POST" && parsedUrl.pathname === "/api/message") {
        handlePostMessage(req, res);
    } else if (
        (req.method === "PUT" || req.method === "DELETE") &&
        pathParts[0] === "api" &&
        pathParts[1] === "message" &&
        pathParts[2]
    ) {
        const id = pathParts[2];

        if (req.method === "PUT") {
            handlePutMessage(req, res, id);
        } else if (req.method === "DELETE") {
            handleDeleteMessage(req, res, id);
        }
    } else {
        serveStaticFile(req, res);
    }
});

server.listen(3000, () => {
    console.log("💬 Сервер запущено: http://localhost:3000");
});
