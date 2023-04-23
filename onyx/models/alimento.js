const db = require('../util/database');

module.exports = class Alimento {
    constructor(alimento) {
        this.descripcion = alimento.descripcion;
        this.unidad = alimento.unidad;
        this.cantidad = alimento.cantidad;
    }

    save() {
        return db.execute('INSERT INTO alimento (descripcion_alimento, unidad, cantidad) VALUES (?, ?, ?)',
            [this.descripcion, this.unidad, this.cantidad]);
    }

    static delete(id) {
        return db.execute('DELETE FROM alimento WHERE id_alimento = ?', [id]);
    }

    static update(id, descripcion, unidad, cantidad) {
        return db.execute('UPDATE alimento SET descripcion_alimento = ?, unidad = ?, cantidad = ? WHERE id_alimento = ?',
            [descripcion, unidad, cantidad, id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM alimento');
    }
}