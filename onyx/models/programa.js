const db = require('../util/database');

module.exports = class Programa {
    constructor(programa) {
        this.frecuencia = programa.frecuencia;
        this.nombre_programa = programa.nombre_programa;
        this.descripcion_programa = programa.descripcion_programa;
        this.ref_visual = programa.ref_visual;
        this.img_programa = programa.img_programa;
    }

    save() {
        return db.execute('INSERT INTO programa (frecuencia, nombre_programa, descripcion_programa, img_programa, ref_visual) VALUES (?, ?, ?, ?, ?)',
             [this.frecuencia, this.nombre_programa, this.descripcion_programa, this.img_programa, this.ref_visual]);
     }

    static fetchAll(start) {
        if(start > 0)
        {
            return db.execute('SELECT * FROM programa ORDER BY nombre_programa LIMIT ?, 9', [start]);  
        }

        else
        {
            return db.execute('SELECT * FROM programa ORDER BY nombre_programa  LIMIT 0, 9');
        } 
    }

    static getTotal() {
        return db.execute('SELECT count(*) as total FROM programa');
    }

    static fetchById(id_programa)
    {
        return db.execute('SELECT * FROM programa WHERE id_programa = ?', [id_programa]);
    }

    //Editar programa
    update() {
        return db.execute(
            'UPDATE programa SET frecuencia = ?, nombre_programa = ?, descripcion_programa = ?, imagen_programa = ?',
            [this.frecuencia, this.nombre_programa, this.descripcion_programa, this.imagen_programa]
        );
    }

    //Eliminar programa
    static deleteById(id_programa) {
        return db.execute('DELETE FROM programa WHERE id_programa = ?', [id_programa]);
    }
}