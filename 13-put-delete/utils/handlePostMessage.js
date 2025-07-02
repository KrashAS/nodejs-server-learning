import saveMessage from "./saveMessage.js";

function handlePostMessage(req, res) {
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));

    req.on("end", () => {
        try {
            const parsed = JSON.parse(body);

            saveMessage({
                name: parsed.name,
                message: parsed.message,
                time: new Date().toISOString(),
            });

            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            res.end(
                JSON.stringify({
                    reply: `Привіт, ${parsed.name}! Ти написав: "${parsed.message}"`,
                })
            );
        } catch {
            res.writeHead(400, {
                "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
    });
}

export default handlePostMessage;
