const {
    getMessages,
    saveNewMessage,
} = require("../controllers/messageController");

function handleApiRoutes(req, res) {
    const { method, url } = req;

    if (method === "GET" && url.startsWith("/api/messages")) {
        return getMessages(req, res);
    }

    if (method === "POST" && url === "/api/message") {
        return saveNewMessage(req, res);
    }

    return false;
}

module.exports = handleApiRoutes;
