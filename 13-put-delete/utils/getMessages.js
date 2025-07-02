import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default getMessages;
