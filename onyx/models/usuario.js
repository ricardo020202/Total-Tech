const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    constructor(usuario) {
        this.email = usuario.email;
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.contraseña = usuario.contraseña;
    }

    save() {
        return bcrypt.hash(this.contraseña, 12)
            .then(hashedPassword => {
                this.password = hashedPassword;
                return db.execute('INSERT INTO usuario (email, nombre, apellido, contraseña) VALUES (?, ?, ?, ?)',
                    [this.email, this.nombre, this.apellido, hashedPassword]
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
        SELECT u.nombre, u.email, r.nombreRol AS rol, GROUP_CONCAT(p.nombrecu SEPARATOR ', ') AS privileges 
        FROM usuario u 
        INNER JOIN rol_usuario ru ON u.email = ru.email 
        INNER JOIN rol r ON ru.id_rol = r.id_rol 
        INNER JOIN rol_privilegio rp ON r.id_rol = rp.id_rol 
        INNER JOIN privilegio p ON rp.id_cu = p.id_cu 
        WHERE r.nombreRol != 'cliente'
        GROUP BY u.nombre, u.email, r.nombreRol;`);
    }   

    static getRol(email) {
        return db.execute('SELECT r.nombreRol FROM usuario u INNER JOIN rol_usuario ru ON u.email = ru.email INNER JOIN rol r ON ru.id_rol = r.id_rol WHERE u.email = ?', [email]);
    }

    static fetchOne(email) {
        return db.execute('SELECT * FROM usuario WHERE email = ?', [email]);
    }

    static changePassword(email, password) {
        return bcrypt.hash(password, 12)
            .then(hashedPassword => {
                return db.execute('UPDATE usuario SET contraseña = ? WHERE email = ?', [hashedPassword, email]);
            });
    }
}