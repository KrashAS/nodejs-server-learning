# Урок 11 — GET /api/messages: читання й віддача всіх повідомлень із файлу messages.json

## 🎯 Мета уроку:

Реалізувати API, що повертає всі збережені повідомлення з messages.json у вигляді JSON-масиву

Покращити сервер, щоб він обробляв GET-запит /api/messages

project-root/
├── utils/
│ ├── serveStaticFile.js ← Віддача статичних файлів
│ ├── saveMessage.js ← Збереження повідомлення у файл
│ ├── getMessages.js ← Отримання всіх повідомлень з файлу
│ ├── handlePostMessage.js ← Обробка POST /api/message
│ └── handleGetMessages.js ← Обробка GET /api/messages
├── messages.json ← Файл з повідомленнями
├── server.js ← Головний файл сервера
└── public/ ← Статичні файли (html, css, js)
