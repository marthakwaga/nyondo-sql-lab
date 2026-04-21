const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

function searchProductSafe(name) {
    // Validation: Must be a string, at least 2 characters, no < > or ; characters
    if (typeof name !== 'string' || name.length < 2 || /[<>;]/.test(name)) {
        console.error("Rejected: Invalid search input.");
        return null;
    }

    const query = 'SELECT * FROM products WHERE name LIKE ?';
    return db.prepare(query).all(`%${name}%`);
}

function loginSafe(username, password) {
    // Validation: Username no spaces, not empty. Password at least 6 characters. 
    if (!username || typeof username !== 'string' || username.includes(' ')) {
        console.error("Rejected: Invalid username format.");
        return null;
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        console.error("Rejected: Password too short.");
        return null;
    }

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    return db.prepare(query).get(username, password);
}

// --- TEST CASES  ---
console.log('Test 1 (cement):', searchProductSafe('cement'));       // Works
console.log('Test 2 (empty):', searchProductSafe(''));              // Rejected
console.log('Test 3 (script):', searchProductSafe('<script>'));    // Rejected
console.log('Test 4 (valid login):', loginSafe('admin', 'admin123')); // Works
console.log('Test 5 (short pass):', loginSafe('admin', 'ab'));      // Rejected
console.log('Test 6 (space in user):', loginSafe('ad min', 'pass123')); // Rejected