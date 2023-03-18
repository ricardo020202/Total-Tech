const db = require('../util/database');

module.exports = class Privilegio {
    constructor(privilegio) {
        this.nombre = privilegio.nombre || '';
    }

    save() {
        return db.execute('INSERT INTO privilegio (nombre) VALUES (?)',
            [this.nombre]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM privilegio');
    }
}