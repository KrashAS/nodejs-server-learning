# 🔍 Урок 5. Парсинг URL і тіла запиту

У цьому уроці ти навчишся:

-   розбирати URL (`req.url`)
-   працювати з query-параметрами (наприклад, `?name=Andrii`)
-   читати тіло запиту (body) — особливо для `POST`-запитів
-   обробляти JSON тіло без Express

---

## 1. Як витягти query-параметри?

```js
const url = require("url");

const parsedUrl = url.parse(req.url, true);
const query = parsedUrl.query;

console.log(query.name); // якщо ?name=Andrii
```

## 2. Як отримати тіло запиту (JSON)?

```js
let body = "";

req.on("data", (chunk) => {
    body += chunk.toString();
});

req.on("end", () => {
    const data = JSON.parse(body);
    console.log(data);
});
```
