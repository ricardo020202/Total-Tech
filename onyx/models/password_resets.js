const db = require('../util/database');

module.exports = class PasswordReset {
    constructor(passwordReset) {
        this.email = passwordReset.email;
        this.token = passwordReset.token;
        this.expiration = passwordReset.expiration;
    }

    save() {
        return db.execute('INSERT INTO password_resets (email, token, expires) VALUES (?, ?, ?)', 
        [this.email, this.token, this.expiration]);
    }

    static fetch(email){
        return db.execute('SELECT * FROM password_resets WHERE email = ?', [email]);
    }

    static fetchToken(token){
        return db.execute('SELECT * FROM password_resets WHERE token = ?', [token]);
    }

    static delete(email, token){
        return db.execute('DELETE FROM password_resets WHERE email = ? AND token = ?', [email, token]);
    }

    static getEmail(token, expiration){
        return db.execute('SELECT email FROM password_resets WHERE token = ? AND expires > ?', [token, expiration]);
    }
}