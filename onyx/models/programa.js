const db = require('../util/database');

module.exports = class Programa {
    constructor(programa) {
        this.id_programa = programa.id_programa;
        this.frecuencia = programa.frecuencia;
        this.nombre_programa = programa.nombre_programa;
        this.descripcion_programa = programa.descripcion_programa;
        this.imagen_programa = programa.imagen_programa;
    }

    save() {
       return db.execute('INSERT INTO programa (id_programa, frecuencia, nombre_programa, descripcio_programa, imagen_programa) VALUES (?, ?, ?, ?, ?)',
            [this.id_programa, this.frecuencia, this.nombre_programa, this.descripcion_programa, this.imagen_programa]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM programa');
    }

    static fetchById(id_programa)
    {
        return db.execute('SELECT * FROM programa WHERE id_programa = ?', [id_programa]);
    }

    update() {
        return db.execute(
            'UPDATE programa SET frecuencia = ?, nombre_programa = ?, descripcion_programa = ?, imagen_programa = ?',
            [this.frecuencia, this.nombre_programa, this.descripcion_programa, this.imagen_programa]
        );
    }

    static deleteById(id_programa) {
        return db.execute('DELETE FROM programa WHERE id_programa = ?', [id_programa]);
    }
}