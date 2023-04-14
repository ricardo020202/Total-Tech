const db = require('../util/database');

module.exports = class Rol {
    constructor(rol) {
        this.nombre = rol.nombre;
    }

    save() {
        if (!this.nombre) {
          throw new Error('Nombre de rol no definido');
        }
        return db.execute('INSERT INTO rol (nombreRol) VALUES (?)', [this.nombre]);
      }

    static fetchAll() {
        return db.execute('SELECT * FROM rol');
    }

    static fetchAllButUsers() {
        return db.execute('SELECT * FROM rol WHERE nombreRol != "cliente"');
    }

    static fetchName(){
        return db.execute('SELECT nombreRol FROM rol');
    }
}