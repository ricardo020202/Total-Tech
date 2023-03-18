const db = require('../util/database');

module.exports = class Alimento {
    constructor(alimento) {
        this.descripcion = alimento.descripcion;
        this.unidad = alimento.unidad;
        this.cantidad = alimento.cantidad;
    }

    save() {
        return db.execute('INSERT INTO alimento (descripcion, unidad, cantidad) VALUES (?, ?, ?)',
            [this.descripcion, this.unidad, this.cantidad]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM alimento');
    }
}