const calculator = require("./calculator");

console.log("Додавання:", calculator.add(2, 3)); // 5
console.log("Множення:", calculator.multiply(4, 5)); // 20
console.log("Віднімання:", calculator.subtract(4, 5)); // -1
console.log("Ділення:", calculator.divide(4, 5)); // 0.8
console.log("Ділення:", calculator.divide(4, 0)); // error
