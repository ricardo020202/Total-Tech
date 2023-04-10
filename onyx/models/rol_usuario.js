const db = require('../util/database');

module.exports = class RolUsuario {
    constructor(id_rol, email) {
        this.id_rol = id_rol;
        this.email = email;
    }
    

    save() {
        return db.execute('INSERT INTO rol_usuario (id_rol, email,fecha) VALUES (?, ?, ?)',
            [this.id_rol, this.email, new Date().toISOString().slice(0, 10)]);
    }

    static delete(emailA){
        return db.execute('DELETE FROM rol_usuario WHERE email = ?',
            [emailA]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM rol_usuario');
    }

    static deleteById(email) {
        return db.execute(`UPDATE rol_usuario SET id_rol = 2 WHERE rol_usuario.email = ?`, [email]);
    }
}