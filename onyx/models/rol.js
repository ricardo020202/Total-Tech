const db = require('../util/database');

module.exports = class Rol {
    constructor(rol) {
        this.nombre = rol.nombre;
        this.status = rol.status || 'on';
    }

    save() {
        if (!this.nombre) {
          throw new Error('Nombre de rol no definido');
        }
        return db.execute('INSERT INTO rol (nombreRol, statusRol) VALUES (?, ?)', [this.nombre, this.status]);
      }
    
    update(id) {
        return db.execute('UPDATE rol SET nombreRol = ? WHERE id_rol = ?', [this.nombre, id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM rol');
    }

    static fetch(id) {
        return db.execute('SELECT * FROM rol WHERE id_rol = ?', [id]);
    }

    static deleteById(id) {
        return db.execute(`UPDATE rol SET statusRol = 'off' WHERE id_rol = ?`, [id]);
    }

    static activateById(id) {
        return db.execute(`UPDATE rol SET statusRol = 'on' WHERE id_rol = ?`, [id]);
    }


    static fetchAllButUsers() {
        return db.execute('SELECT * FROM rol WHERE nombreRol != "cliente"');
    }

    static fetchName(){
        return db.execute('SELECT nombreRol FROM rol');
    }

    static getTotal() {
        return db.execute('SELECT COUNT(*) AS total FROM rol');
    }
}