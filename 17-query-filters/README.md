# 🧪 Урок 17 — Query-параметри і фільтрація

## 🔍 Що таке query-параметри?

-   Це дані, які передаються у URL після `?`, наприклад:
    http://localhost:3000/api/messages?name=Ivan&limit=3
-   `name=Ivan` — фільтрація за імʼям
-   `limit=3` — обмеження кількості відповідей

---

## 🧠 Що реалізовано

-   Обробка `GET /api/messages`
-   Фільтрація масиву повідомлень за `name`
-   Обмеження результату за `limit`
-   Все працює без Express

---

## 🧱 Структура

17-query-filters/
├── db/
│ └── db.js ← копіюємо з уроку 16
├── controllers/
│ └── messageController.js ← змінений
├── routes/
│ └── apiRoutes.js ← копіюємо з уроку 16
├── utils/
│ └── serveStaticFile.js ← копіюємо з уроку 16
├── public/
│ ├── index.html ← копіюємо з уроку 16
│ ├── styles.css ← копіюємо з уроку 16
│ └── script.js ← копіюємо з уроку 16
├── server.js ← копіюємо з уроку 16
├── db.json ← копіюємо з уроку 16 або створюємо порожній
└── README.md

---

## ✅ Приклади запитів

/api/messages
/api/messages?limit=2
/api/messages?name=Olena
/api/messages?name=Petro&limit=1
