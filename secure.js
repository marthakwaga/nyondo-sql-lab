const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// Secure version using ? placeholders 
function searchProductSafe(name) {
    const query = 'SELECT * FROM products WHERE name LIKE ?';
    console.log('Query:', query);
    
    // We wrap the search term in % signs here, not in the SQL string
    const rows = db.prepare(query).all(`%${name}%`); 
    return rows;
}

// Secure login using ? placeholders 
function loginSafe(username, password) {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    console.log('Query:', query);
    
    const row = db.prepare(query).get(username, password);
    return row;
}

// --- TEST CASES: These should now return [] or undefined --

console.log('Test 1 (OR Attack):', searchProductSafe("' OR 1=1--"));
console.log('Test 2 (UNION Attack):', searchProductSafe("' UNION SELECT id,username,password,role FROM users--"));
console.log('Test 3 (Bypass):', loginSafe("admin'--", 'anything'));
console.log('Test 4 (Always True):', loginSafe("' OR '1'='1", "' OR '1'='1"));