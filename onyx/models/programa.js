const db = require('../util/database');

module.exports = class Programa {
    constructor(programa) {
        this.frecuencia = programa.frecuencia;
        this.nombre = programa.nombre;
        this.descripcion = programa.descripcion;
    }

    save() {
       return db.execute('INSERT INTO programa (frecuencia, nombre, descripcion) VALUES (?, ?, ?)',
            [this.frecuencia, this.nombre, this.descripcion]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM programa');
    }
}