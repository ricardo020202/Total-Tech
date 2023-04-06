const db = require('../util/database');

class Rol {
    constructor(rol) {
        this.nombre = rol.nombre;
    }

    save() {
        return db.execute('INSERT INTO rol (nombreRol) VALUES (?)',
            [this.nombre]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM rol');
    }
}

module.exports = Rol;