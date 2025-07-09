# 🧠 Урок 15 — Структура Node.js-проєкту

## 🎯 Мета

Навчитися структурувати Node.js сервер за модулями:

-   `server.js` — створює сервер і обробляє маршрути
-   `routes/apiRoutes.js` — роутінг API
-   `controllers/messageController.js` — логіка обробки повідомлень
-   `utils/fileStorage.js` — допоміжні функції для читання/запису JSON

---

## 🗂️ Структура

15-structured-server/
├── public/ (фронт як у уроці 14)
├── routes/
│ └── apiRoutes.js
├── controllers/
│ └── messageController.js
├── utils/
│ └── fileStorage.js
├── messages.json
├── server.js
└── README.md

---

## 🚀 Як запустити

```bash
node server.js
```
