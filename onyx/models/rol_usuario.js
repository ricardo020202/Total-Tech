const db = require('../util/database');

module.exports = class RolUsuario {
    constructor(id_rol, id_usuario) {
        this.id_rol = id_rol;
        this.email = email;
    }

    save() {
        return db.execute('INSERT INTO rol_usuario (id_rol, email) VALUES (?, ?)',
            [this.id_rol, this.email]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM rol_usuario');
    }
}