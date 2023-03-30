const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    constructor(usuario) {
        this.email = usuario.email;
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.contraseña = usuario.contraseña;
        this.telefono = usuario.telefono;
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

    static getPrivilegios() {
        return db.execute(`
        SELECT u.nombre, u.email, u.telefono, r.nombreRol AS rol, GROUP_CONCAT(p.nombrecu SEPARATOR ', ') AS privileges 
        FROM usuario u 
        INNER JOIN rol_usuario ru ON u.email = ru.email 
        INNER JOIN rol r ON ru.id_rol = r.id_rol 
        INNER JOIN rol_privilegio rp ON r.id_rol = rp.id_rol 
        INNER JOIN privilegio p ON rp.id_cu = p.id_cu 
        GROUP BY u.nombre, u.email, u.telefono, r.nombreRol;`);
    }   
}