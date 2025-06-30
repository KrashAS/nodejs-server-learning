const http = require("http");
const url = require("url");

function calculate(a, b, op) {
    switch (op) {
        case "add":
            return a + b;
        case "sub":
            return a - b;
        case "mul":
            return a * b;
        case "div":
            return b !== 0 ? a / b : "❌ На нуль ділити не можна!";
        default:
            return "❌ Невідома операція";
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/calc") {
        if (req.method === "GET") {
            const { a, b, op } = parsedUrl.query;

            const numA = parseFloat(a);
            const numB = parseFloat(b);
            const result = calculate(numA, numB, op);

            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify({ result }));
        } else if (req.method === "POST") {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                try {
                    const data = JSON.parse(body);
                    const { a, b, op } = data;

                    const result = calculate(Number(a), Number(b), op);

                    res.writeHead(200, {
                        "Content-Type": "application/json; charset=utf-8",
                    });
                    res.end(JSON.stringify({ result }));
                } catch (err) {
                    res.writeHead(400, {
                        "Content-Type": "text/plain; charset=utf-8",
                    });
                    res.end("❌ Помилка в JSON");
                }
            });
        } else {
            res.writeHead(405);
            res.end("Метод не підтримується");
        }
    } else {
        res.writeHead(404);
        res.end("Маршрут не знайдено");
    }
});

server.listen(3000, () => {
    console.log("➗ Міні-калькулятор на http://localhost:3000/calc");
});
