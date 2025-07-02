# Урок 10: Збереження повідомлень у JSON

## Мета

Створити API, яке обробляє POST-запит з імінем та повідомленням, і зберігає це у файл `messages.json`.

---

## Структура проєкту

```
10-json-storage/
├── public/
│   └── index.html
├── utils/
│   ├── serveStaticFile.js
│   └── saveMessage.js
├── messages.json       ← Файл для зберігання
├── json-api-server.js  ← Головний файл сервера
```

---

## saveMessage.js

```js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../messages.json");

function saveMessage(data) {
    fs.readFile(filePath, "utf8", (err, content) => {
        let messages = [];

        if (!err && content) {
            try {
                messages = JSON.parse(content);
            } catch {
                messages = [];
            }
        }

        messages.push(data);

        fs.writeFile(
            filePath,
            JSON.stringify(messages, null, 2),
            "utf8",
            (err) => {
                if (err) console.error("❌ Помилка запису повідомлення:", err);
            }
        );
    });
}

module.exports = saveMessage;
```

---

## json-api-server.js (витяг з POST обробки)

```js
const saveMessage = require("./utils/saveMessage");

...

if (req.method === "POST" && req.url === "/api/message") {
  let body = "";

  req.on("data", chunk => (body += chunk.toString()));

  req.on("end", () => {
    try {
      const parsed = JSON.parse(body);

      saveMessage({
        name: parsed.name,
        message: parsed.message,
        time: new Date().toISOString(),
      });

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({
          reply: `Привіт, ${parsed.name}! Ти написав: \"${parsed.message}\"`
        })
      );
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
}
```

---

## Приклад POST-запиту

```json
{
    "name": "Andrii",
    "message": "Привіт з Node!"
}
```

### messages.json після запиту:

```json
[
    {
        "name": "Andrii",
        "message": "Привіт з Node!",
        "time": "2025-06-30T18:01:00.000Z"
    }
]
```

---

## ✅ Результат

-   Повідомлення зберігаються у файл `messages.json`
-   Кожен POST додає новий запис у масив
-   Формат збереження: `name`, `message`, `time`

---

> Готово! Тепер твій сервер не лише відповідає — він ще й пам’ятає 🧠
