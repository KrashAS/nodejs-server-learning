const http = require("http");
const serveStaticFile = require("./utils/serveStaticFile");

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        if (
            req.url === "/" ||
            req.url.endsWith(".js") ||
            req.url.endsWith(".css")
        ) {
            return serveStaticFile(req, res);
        }

        if (req.url === "/api/get-name") {
            const cookies = req.headers.cookie || "";
            const parsed = Object.fromEntries(
                cookies.split("; ").map((c) => c.split("="))
            );
            const username = parsed.username || "Гість";

            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            return res.end(JSON.stringify({ username }));
        }
    }

    if (req.method === "POST" && req.url === "/api/set-name") {
        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", () => {
            const { name } = JSON.parse(body);
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
                "Set-Cookie": `username=${encodeURIComponent(
                    name
                )}; HttpOnly; Max-Age=3600; Path=/`,
            });
            res.end(JSON.stringify({ status: "Імʼя збережено в cookie" }));
        });
    } else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("🍪 Сервер працює на http://localhost:3000");
});
