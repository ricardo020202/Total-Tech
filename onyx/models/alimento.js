const db = require('../util/database');

module.exports = class Alimento {
    constructor(alimento) {
        this.descripcion = alimento.descripcion;
        this.unidad = alimento.unidad;
        this.cantidad = alimento.cantidad;
    }

    save() {
        return db.execute('INSERT INTO alimento (descripcion_alimento, unidad, cantidad) VALUES (?, ?, ?)',
            [this.descripcion, this.unidad, this.cantidad])
        
            .then(([result]) => {
                return db.execute('INSERT INTO dieta_alimento (id_dieta, id_alimento) VALUES (?, ?)',
                    [1, result.insertId]);
            });
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

    static fetchOne(id) {
        return db.execute('SELECT * FROM alimento WHERE id_alimento = ?', [id]);
    }

    static checkIfAlimentoExists(descripcion) {
        return db.execute('SELECT COUNT(*) as count FROM alimento WHERE descripcion_alimento = ?', [descripcion])
            .then(([rows]) => {
                const count = rows[0].count;
                return count > 0;
            });
    }
    
    static addToDietaAlimento(id_dieta, id_alimento) {
        return db.execute('INSERT INTO dieta_alimento (id_dieta, id_alimento) VALUES (?, ?)',
            [id_dieta, id_alimento]);
    }
    
}