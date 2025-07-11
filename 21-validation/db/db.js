const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const path = require("path");

const file = path.join(__dirname, "..", "db.json");
const adapter = new JSONFile(file);

const defaultData = { messages: [] };

const db = new Low(adapter, defaultData); // Передаємо defaultData сюди!

async function initDB() {
    await db.read();

    // Якщо база порожня, записуємо дефолтні дані
    if (!db.data) {
        db.data = defaultData;
        await db.write();
    }
}

module.exports = { db, initDB };
