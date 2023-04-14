const db = require('../util/database');

module.exports = class Administrador {
    constructor(administrador) {
        this.email = administrador.email;
    }

    save() {
        return db.execute('INSERT INTO administrador (email) VALUES (?)',
            [this.email]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM administrador');
    }
}