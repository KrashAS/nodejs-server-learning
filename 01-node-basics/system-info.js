const os = require("os");

console.log("Операційна система:", os.type());
console.log("Платформа:", os.platform());
console.log("Архітектура:", os.arch());
console.log("Кількість ядер CPU:", os.cpus().length);
