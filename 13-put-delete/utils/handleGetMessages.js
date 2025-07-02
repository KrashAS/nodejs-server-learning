import getMessages from "./getMessages.js";

function handleGetMessages(req, res) {
    getMessages((err, messages) => {
        if (err) {
            res.writeHead(500, {
                "Content-Type": "application/json; charset=utf-8",
            });
            return res.end(
                JSON.stringify({ error: "Помилка читання повідомлень" })
            );
        }

        res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify(messages));
    });
}

export default handleGetMessages;
