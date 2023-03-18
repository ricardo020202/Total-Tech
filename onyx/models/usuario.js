const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    constructor(usuario) {
        this.email = usuario.email || '';
        this.nombre = usuario.nombre || '';
        this.apelido = usuario.apelido || '';
        this.contraseña = usuario.contraseña || '';
        this.telefono = usuario.telefono || '';
    }

    save() {
        return bcrypt.hash(this.password, 12)
            .then(hashedPassword => {
                this.password = hashedPassword;
                return db.execute('INSERT INTO usuario (email, nombre, apelido, contraseña, telefono) VALUES (?, ?, ?, ?, ?)',
                    [this.email, this.nombre, this.apelido, this.contraseña, this.telefono]
                );
            });
    }

    static fetchAll() {
        return db.execute('SELECT * FROM usuario');
    }
}