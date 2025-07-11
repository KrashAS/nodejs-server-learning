const {
    getMessages,
    saveNewMessage,
    updateMessage,
    deleteMessage,
} = require("../controllers/messageController");

function handleApiRoutes(req, res) {
    const { method, url } = req;

    if (method === "GET" && url.startsWith("/api/messages")) {
        return getMessages(req, res);
    }

    if (method === "POST" && url === "/api/message") {
        return saveNewMessage(req, res);
    }

    if (method === "PUT" && url.startsWith("/api/message/")) {
        return updateMessage(req, res);
    }

    if (method === "DELETE" && url.startsWith("/api/message/")) {
        return deleteMessage(req, res);
    }

    return false;
}

module.exports = handleApiRoutes;
