const db = require('../util/database');

module.exports = class Dieta {
    constructor(dieta) {
        this.nombre_dieta = dieta.nombre_dieta;
        this.calorias = dieta.calorias;
        this.proteinas = dieta.proteinas;
        this.carbohidratos = dieta.carbohidratos;
        this.grasas = dieta.grasas;
        this.fibra_total = dieta.fibra_total || 0;
        this.ceniza = dieta.ceniza || 0;
        this.calcio = dieta.calcio || 0;
        this.fosforo = dieta.fosforo || 0;
        this.hierro = dieta.hierro || 0;
        this.tiamina = dieta.tiamina || 0;
        this.riboflavina = dieta.riboflavina || 0;
        this.niacina = dieta.niacina || 0;
        this.vitamina_c = dieta.vitamina_c || 0;
        this.vitamina_a = dieta.vitamina_a || 0;
        this.ac_graso_mono = dieta.ac_graso_mono || 0;
        this.ac_graso_poli = dieta.ac_graso_poli || 0;
        this.ac_graso_saturado = dieta.ac_graso_saturado || 0;
        this.colesterol = dieta.colesterol || 0;
        this.potasio = dieta.potasio || 0;
        this.sodio = dieta.sodio || 0;
        this.zinc = dieta.zinc || 0;
        this.magnesio = dieta.magnesio || 0;
        this.vit_b6 = dieta.vit_b6 || 0;
        this.vit_b12 = dieta.vit_b12 || 0;
        this.ac_folico = dieta.ac_folico || 0;
        this.folato = dieta.folato || 0;
        this.alimento = dieta.alimento;
        this.foto_dieta = dieta.foto_dieta;
    }

    save() {
        return db.execute(`INSERT INTO dieta (nombre_dieta, calorias, proteinas, carbohidratos, grasas, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato, alimento, foto_dieta) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,?,?, ?)`,
            [this.nombre_dieta, this.calorias, this.proteinas, this.carbohidratos, this.grasas, this.fibra_total, this.ceniza, this.calcio, this.fosforo, this.hierro, this.tiamina, this.riboflavina, this.niacina, this.vitamina_c, this.vitamina_a, this.ac_graso_mono, this.ac_graso_poli, this.ac_graso_saturado, this.colesterol, this.potasio, this.sodio, this.zinc, this.magnesio, this.vit_b6, this.vit_b12, this.ac_folico, this.folato, this.alimento, this.foto_dieta]);
    }

    static fetchAll(start) {
        if (start > 0) {
            return db.execute('SELECT * FROM dieta ORDER BY calorias LIMIT ?, 9', [start]);
        }

        else {
            return db.execute('SELECT * FROM dieta ORDER BY calorias');
        }
    }

    static getTotal() {
        return db.execute('SELECT count(*) as total FROM dieta');

    }

    static fetchById(id_dieta) {
        return db.execute(`SELECT * FROM dieta WHERE id_dieta = ?`, [id_dieta]);
    }

    static fetchByCal(numcal, start) {
        if (start == 0) {
            return db.execute('SELECT * FROM dieta ORDER BY calorias  LIMIT 0, 9');
        }

        if (numcal == 0) {
            return db.execute('SELECT * FROM dieta ORDER BY calorias  LIMIT ?, 9', [start]);
        }

        if (numcal > 900 && numcal < 4000) {
            return db.execute('SELECT * FROM dieta WHERE calorias = ? ORDER BY calorias  LIMIT ?, 9', [numcal, start]);
        }

        if (numcal >= 4000) {
            return db.execute('SELECT * FROM dieta WHERE calorias BETWEEN ? AND ? + 1000 ORDER BY calorias  LIMIT ?, 9', [numcal, numcal, start]);
        }

        if (numcal <= 900) {
            return db.execute('SELECT * FROM dieta WHERE calorias BETWEEN ? AND ? - 500 ORDER BY calorias  LIMIT ?, 9', [numcal, numcal, start]);
        }

        else {
            return db.execute('SELECT * FROM dieta ORDER BY calorias  LIMIT ?, 9', [start]);
        }

    }

    update(id) {
        return db.execute(
            'UPDATE dieta SET nombre_dieta = ?, calorias = ?, proteinas = ?, carbohidratos = ?, grasas = ?, fibra_total = ?, ceniza = ?, calcio = ?, fosforo = ?, hierro = ?, tiamina = ?, riboflavina = ?, niacina = ?, vitamina_c = ?, vitamina_a = ?, ac_graso_mono = ?, ac_graso_poli = ?, ac_graso_saturado = ?, colesterol = ?, potasio = ?, sodio = ?, zinc = ?, magnesio = ?, vit_b6 = ?, vit_b12 = ?, ac_folico = ?, folato = ?, alimento = ?, foto_dieta = ? WHERE id_dieta = ?',
            [this.nombre_dieta, this.calorias, this.proteinas, this.carbohidratos, this.grasas, this.fibra_total, this.ceniza, this.calcio, this.fosforo, this.hierro, this.tiamina, this.riboflavina, this.niacina, this.vitamina_c, this.vitamina_a, this.ac_graso_mono, this.ac_graso_poli, this.ac_graso_saturado, this.colesterol, this.potasio, this.sodio, this.zinc, this.magnesio, this.vit_b6, this.vit_b12, this.ac_folico, this.folato, this.alimento, this.foto_dieta, id]
        );
    }

    static deleteById(id_dieta) {
        return db.execute('DELETE FROM dieta WHERE id_dieta = ?', [id_dieta]);
    }

    static deleteById(id_dieta) {
        return db.execute('DELETE FROM dieta_alimento WHERE id_dieta = ?', [id_dieta])
            .then(() => {
                return db.execute('DELETE FROM dieta WHERE id_dieta = ?', [id_dieta]);
            });
    }

    static isFavorite(email, tipo) {
        return db.execute('SELECT id_dieta FROM programa_dieta_cliente WHERE email = ? AND tipo = ?', [email, tipo]);
    }
}