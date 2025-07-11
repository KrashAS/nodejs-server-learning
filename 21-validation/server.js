const http = require("http");
const apiRoutes = require("./routes/apiRoutes");
const { initDB } = require("./db/db");
const serveStaticFile = require("./utils/serveStaticFile");

async function startServer() {
    await initDB();

    const server = http.createServer((req, res) => {
        if (req.url.startsWith("/api")) {
            apiRoutes(req, res);
        } else {
            serveStaticFile(req, res);
        }
    });

    server.listen(3000, () => {
        console.log("🚀 Сервер працює на http://localhost:3000");
    });
}

startServer();
