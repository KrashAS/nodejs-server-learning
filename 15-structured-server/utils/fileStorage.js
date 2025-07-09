const fs = require("fs");
const path = require("path");

// Асинхронне читання JSON-файлу
function readJSON(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return reject(err);

            try {
                const parsed = JSON.parse(data || "[]");
                resolve(parsed);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
}

// Асинхронний запис у JSON-файл
function writeJSON(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

module.exports = { readJSON, writeJSON };
