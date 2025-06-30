# 📁 Урок 3. Робота з файловою системою у Node.js

## 🔧 Що таке `fs`?

`fs` — вбудований модуль Node.js для роботи з файлами:

-   читання та запис файлів
-   створення, перейменування, видалення
-   синхронні та асинхронні методи

---

## 🔄 Основні методи

### Читання файлу:

```js
fs.readFile(path, options, callback);
```

### Запис файлу:

```js
fs.writeFile(path, data, options, callback);
```

### Додавання в кінець:

```js
fs.appendFile(path, data, callback);
```

### Синхронні аналоги:

```js
fs.readFileSync(path);
fs.writeFileSync(path, data);
```

## 📌 Важливо

Використовуй path.join() замість ручного складання шляхів — це кросплатформенно.

В Node.js немає \_\_dirname у ES-модулях — використовуй import.meta.url.
