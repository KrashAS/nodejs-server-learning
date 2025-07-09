const {
    getMessages,
    saveNewMessage,
} = require("../controllers/messageController");

module.exports = (req, res) => {
    if (req.method === "GET" && req.url === "/api/messages") {
        getMessages(req, res);
    } else if (req.method === "POST" && req.url === "/api/message") {
        saveNewMessage(req, res);
    } else {
        res.writeHead(404);
        res.end("API route not found");
    }
};
