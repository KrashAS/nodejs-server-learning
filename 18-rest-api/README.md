# Урок 18 — PUT та DELETE в Node.js REST API

## 🔧 Реалізовано:

-   PUT `/api/message/:index` — оновлення повідомлення
-   DELETE `/api/message/:index` — видалення повідомлення

## 🧪 Приклади

```bash
curl -X PUT http://localhost:3000/api/message/1 -d '{"name":"Olena","message":"Hi"}'
curl -X DELETE http://localhost:3000/api/message/1
```
