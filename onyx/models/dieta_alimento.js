const db = require('../util/database');

module.exports = class DietaAlimento {
    constructor(id_dieta, id_alimento, cantidad) {
        this.id_dieta = id_dieta;
        this.id_alimento = id_alimento;
        this.cantidad = cantidad;
    }

    save() {
        return db.execute('INSERT INTO dieta_alimento (id_dieta, id_alimento, cantidad) VALUES (?, ?, ?)',
            [this.id_dieta, this.id_alimento, this.cantidad]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM dieta_alimento');
    }

    static fetchById(id_dieta) {
        return db.execute('SELECT* FROM alimento INNER JOIN dieta_alimento ON alimento.id_alimento = dieta_alimento.id_dieta AND id_dieta = ?', [id_dieta]);
    }

    static delete(id) {
        return db.execute('DELETE FROM dieta_alimento WHERE id_alimento = ?', [id]);
    }
}
