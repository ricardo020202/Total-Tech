const db = require('../util/database');

module.exports = class DietaAlimento {
    constructor(id_dieta, id_alimento, cantidad) {
        this.id_dieta = id_dieta;
        this.id_alimento = id_alimento;
    }

    save() {
        return db.execute('INSERT INTO dieta_alimento (id_dieta, id_alimento) VALUES (?, ?)',
            [this.id_dieta, this.id_alimento]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM dieta_alimento');
    }
}