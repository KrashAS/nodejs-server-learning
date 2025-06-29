# 🧩 Урок 2. Модулі в Node.js

## 🔷 Що таке модулі?

У Node.js **кожен файл — це окремий модуль**.

-   Власні модулі — це просто файли, які можна імпортувати через `require` або `import`
-   Є також **вбудовані** (`fs`, `os`, `http`) та **сторонні** (`lodash`, `axios`) модулі

## 📦 CommonJS vs ES Modules

Node.js за замовчуванням використовує CommonJS:

```js
// Експорт
module.exports = { ... };

// Імпорт
const name = require('./module');
```
