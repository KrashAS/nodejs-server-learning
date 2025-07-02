# Урок 12 — Вивід усіх повідомлень на HTML-сторінці

## Мета

Навчитися отримувати з сервера список повідомлень через API і виводити їх на клієнтській HTML-сторінці.

---

## Функціонал

-   Відправка нового повідомлення через форму (POST `/api/message`)
-   Отримання списку всіх повідомлень (GET `/api/messages`)
-   Відображення повідомлень на сторінці

---

## Структура проєкту

project-root/
├── public/
│ ├── index.html # Головна сторінка з формою і контейнером для повідомлень
│ ├── styles.css # Стилі сторінки
│ └── script.js # Логіка роботи з API і рендеринг повідомлень
├── utils/
│ ├── serveStaticFile.js # Функція для віддачі статичних файлів
│ ├── saveMessage.js # Функція для збереження повідомлень у файл
│ ├── getMessages.js # Функція для читання повідомлень з файлу
│ ├── handleGetMessages.js# Обробник GET /api/messages
│ └── handlePostMessage.js# Обробник POST /api/message
├── messages.json # Файл для збереження повідомлень
└── server.js # Головний серверний файл

## Основні файли

### public/index.html

HTML-сторінка з формою та контейнером для повідомлень.

### public/styles.css

Стилі для сторінки.

### public/script.js

JS-код, що:

-   Відправляє POST-запит з новим повідомленням
-   Отримує і виводить список повідомлень

### utils/saveMessage.js

Функція, яка додає нове повідомлення у `messages.json`.

### utils/getMessages.js

Функція, яка зчитує всі повідомлення з `messages.json`.

### utils/handleGetMessages.js

Обробник для GET `/api/messages`.

### utils/handlePostMessage.js

Обробник для POST `/api/message`.

### utils/serveStaticFile.js

Обробка і віддача статичних файлів (HTML, CSS, JS).

### server.js

Головний серверний файл, що зв’язує всі частини.
