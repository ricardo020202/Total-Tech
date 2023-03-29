const db = require('../util/database');

module.exports = class Dieta {
    constructor(dieta) {
        this.nombre_dieta = dieta.nombre_dieta;
        this.no_calorias = dieta.no_calorias;
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
    }

    save() {
        return db.execute(`INSERT INTO dieta (nombre_dieta, no_calorias, proteinas, carbohidratos, grasas, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`,
            [this.nombre_dieta, this.no_calorias, this.proteinas, this.carbohidratos, this.grasas, this.fibra_total, this.ceniza, this.calcio, this.fosforo, this.hierro, this.tiamina, this.riboflavina, this.niacina, this.vitamina_c, this.vitamina_a, this.ac_graso_mono, this.ac_graso_poli, this.ac_graso_saturado, this.colesterol, this.potasio, this.sodio, this.zinc, this.magnesio, this.vit_b6, this.vit_b12, this.ac_folico, this.folato]
        );
    }
    
    static fetchAll(start) {
        if(start > 0)
        {
            return db.execute('SELECT * FROM dieta ORDER BY no_calorias LIMIT ?, 9', [start]);  
        }

        else
        {
            return db.execute('SELECT * FROM dieta ORDER BY no_calorias');
        }
        
    }

    static getTotal() {
        return db.execute('SELECT count(*) as total FROM dieta');

    }
    

    static fetchById(id_dieta)
    {
        return db.execute('SELECT * FROM dieta WHERE id_dieta = ?', [id_dieta]);
    }

    static fetchByCal(numcal, start)
    {
        if (numcal  == 0)
        {
    
            return db.execute('SELECT * FROM dieta ORDER BY no_calorias  LIMIT ?, 9', [start]);
        }
        else
        {
            return db.execute('SELECT * FROM dieta WHERE no_calorias BETWEEN ? AND ? + 400 ORDER BY no_calorias  LIMIT ?, 9', [numcal, numcal, start]);
        }
        
    }

    update() {
        return db.execute(
            'UPDATE dieta SET nombre_dieta = ?, no_calorias = ?, proteinas = ?, carbohidratos = ?, grasas = ?, fibra_total = ?, ceniza = ?, calcio = ?, fosforo = ?, hierro = ?, tiamina = ?, riboflavina = ?, niacina = ?, vitamina_c = ?, vitamina_a = ?, ac_graso_mono = ?, ac_graso_poli = ?, ac_graso_saturado = ?, colesterol = ?, potasio = ?, sodio = ?, zinc = ?, magnesio = ?, vit_b6 = ?, vit_b12 = ?, ac_folico = ?, folato = ?'
            [this.nombre_dieta, this.no_calorias, this.proteinas, this.carbohidratos, this.grasas, this.fibra_total, this.ceniza, this.calcio, this.fosforo, this.hierro, this.tiamina, this.riboflavina, this.niacina, this.vitamina_c, this.vitamina_a, this.ac_graso_mono, this.ac_graso_poli, this.ac_graso_saturado, this.colesterol, this.potasio, this.sodio, this.zinc, this.magnesio, this.vit_b6, this.vit_b12, this.ac_folico, this.folato]
        );
    }

    static deleteById(id_dieta) {
        return db.execute('DELETE FROM dieta WHERE id_dieta = ?', [id_dieta]);
    }
}