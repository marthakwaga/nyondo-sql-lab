const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

console.log("--- Query A: All columns for all products ---");
const queryA = db.prepare('SELECT * FROM products').all();
console.log(queryA);

console.log("\n--- Query B: Name and price only ---");
const queryB = db.prepare('SELECT name, price FROM products').all();
console.log(queryB);

console.log("\n--- Query C: Product with ID 3 ---");
const queryC = db.prepare('SELECT * FROM products WHERE id = 3').get();
console.log(queryC);

console.log("\n--- Query D: Products containing 'sheet' ---");
const queryD = db.prepare("SELECT * FROM products WHERE name LIKE '%sheet%'").all();
console.log(queryD);

console.log("\n--- Query E: Sorted by price (highest first) ---");
const queryE = db.prepare('SELECT * FROM products ORDER BY price DESC').all();
console.log(queryE);

console.log("\n--- Query F: 2 most expensive products ---");
const queryF = db.prepare('SELECT * FROM products ORDER BY price DESC LIMIT 2').all();
console.log(queryF);

console.log("\n--- Query G: Update Cement price and verify ---");
db.prepare('UPDATE products SET price = 38000 WHERE id = 1').run();
const queryG = db.prepare('SELECT * FROM products WHERE id = 1').get();
console.log(queryG);

db.close();