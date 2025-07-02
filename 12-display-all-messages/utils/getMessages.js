const fs = require("fs");
const path = require("path");

const messagesFile = path.join(__dirname, "../messages.json");

function getMessages(callback) {
    fs.readFile(messagesFile, "utf8", (err, data) => {
        if (err) return callback(err);

        try {
            const messages = JSON.parse(data);
            callback(null, messages);
        } catch (parseErr) {
            callback(parseErr);
        }
    });
}

module.exports = getMessages;
