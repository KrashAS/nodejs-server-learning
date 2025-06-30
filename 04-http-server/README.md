# 🌐 Урок 4. HTTP-сервер без Express

## 🔷 Що таке `http`?

`http` — це вбудований модуль Node.js для створення веб-серверів.

Ми можемо:

-   слухати порти
-   обробляти HTTP-запити
-   повертати відповіді з текстом, HTML, JSON

## 🔧 Основне API:

```js
const http = require("http");

const server = http.createServer((req, res) => {
    // логіка тут
});

server.listen(3000, () => {
    console.log("Сервер запущено на порту 3000");
});
```

## 🔁 Основні поля:

-   req.url — шлях запиту (/, /about)
-   req.method — HTTP метод (GET, POST)
-   res.write(), res.end() — відповідь
-   res.setHeader() — заголовки

## 📄 MIME-типи (Content-Type):

-   text/plain — звичайний текст
-   text/html — HTML-розмітка
-   application/json — JSON-дані
