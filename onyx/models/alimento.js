const db = require('../util/database');

module.exports = class Alimento {
    constructor(alimento) {
        this.descripcion = alimento.descripcion;
        this.unidad = alimento.unidad;
        this.cantidad = alimento.cantidad;
    }

    async save() {
        const [result] = await db.execute('INSERT INTO alimento (descripcion_alimento, unidad, cantidad) VALUES (?, ?, ?)',
            [this.descripcion, this.unidad, this.cantidad]);
        await db.execute('INSERT INTO dieta_alimento (id_dieta, id_alimento) VALUES (?, ?)',
            [1, result.insertId]);
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

    static async checkIfAlimentoExists(descripcion) {
        if (typeof descripcion === 'undefined') {
          throw new Error('La descripción del alimento no está definida');
        }
        const alimentoExists = await this.alimentoExists(descripcion);
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM alimento WHERE descripcion_alimento = ?', [descripcion]);
        const count = rows[0].count;
        return count > 0;
      }

    static addToDietaAlimento(id_dieta, id_alimento) {
        if (id_dieta === undefined || id_alimento === undefined) {
            throw new Error('Los parámetros de la consulta no deben ser undefined');
        }
        return db.execute('INSERT INTO dieta_alimento (id_dieta, id_alimento) VALUES (?, ?)',
            [id_dieta, id_alimento]);
    }

    static deleteFromDietaAlimento(id_dieta, id_alimento) {
        if (id_dieta === undefined || id_alimento === undefined) {
            throw new Error('Los parámetros de la consulta no deben ser undefined');
        }
        return db.execute('DELETE FROM dieta_alimento WHERE id_dieta = ? AND id_alimento = ?',
            [id_dieta, id_alimento]);
    }

    static fetchAllFromDietaAlimento(id_dieta) {
        if (id_dieta === undefined) {
            throw new Error('Los parámetros de la consulta no deben ser undefined');
        }
        return db.execute('SELECT * FROM dieta_alimento WHERE id_dieta = ?', [id_dieta]);
    }
}


    