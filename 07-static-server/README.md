# 🗂️ Урок 7. Сервер статичних файлів (HTML/CSS/JS)

Мета: зробити свій міні веб-сервер, який:

-   віддає index.html
-   обробляє запити на .css, .js тощо
-   сам визначає MIME-типи
-   обробляє помилку 404, якщо файл не існує

---

## Що вивчимо:

-   Модуль `fs` (читаємо файли)
-   Модуль `path` (для безпечних шляхів)
-   MIME-типи для HTML/CSS/JS

## MIME-тип Опис

MIME (Multipurpose Internet Mail Extensions) — це стандарт, який описує тип вмісту (контенту), що передається через інтернет.

-   text/html HTML-сторінка
-   text/css CSS-стилі
-   application/javascript JavaScript-файл
-   application/json JSON-дані
-   image/png PNG-зображення
-   text/plain Звичайний текст
    "Content-Type": "text/html; charset=utf-8"
