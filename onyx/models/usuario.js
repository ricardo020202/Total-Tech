const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    constructor(usuario) {
        this.email = usuario.email || '';
        this.nombre = usuario.nombre || '';
        this.apellido = usuario.apellido || '';
        this.contraseña = usuario.contraseña || '';
        this.telefono = usuario.telefono || '';
    }

    save() {
        return bcrypt.hash(this.contraseña, 12)
            .then(hashedPassword => {
                this.password = hashedPassword;
                return db.execute('INSERT INTO usuario (email, nombre, apellido, contraseña, telefono) VALUES (?, ?, ?, ?, ?)',
                    [this.email, this.nombre, this.apellido, hashedPassword, this.telefono]
                );
            });
    }

    static fetchAll() {
        return db.execute('SELECT * FROM usuario');
    }

    static fetch(email){
        return db.execute('SELECT * FROM usuario WHERE email = ?', [email]);
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM usuario WHERE email = ?', [email]);
    }

    static getPrivilegios(email) {
        return db.execute(`
            SELECT p.nombrecu
            FROM privilegio p, rol_privilegio rp, rol r, rol_usuario ru, usuario u
            WHERE u.email = ? AND u.email = ru.email AND ru.id_rol = r.id_rol
            AND rp.id_rol = r.id_rol AND rp.id_cu = p.id_cu
        `, [email]);
    }   
}