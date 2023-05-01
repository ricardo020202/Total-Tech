const db = require('../util/database');

module.exports = class ProgramaEjercicio {
    constructor(idPrograma, idEjercicio) {
        this.idEjercicio = idEjercicio;
        this.idPrograma = idPrograma;
    }

    save() {
        return db.execute('INSERT INTO programa_ejercicio (idPrograma, idEjercicio) VALUES (?, ?)',
            [this.idPrograma, this.idEjercicio]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM programa_ejercicio');
    }

    static deleteById(id_ejercicio) {
        return db.execute("DELETE FROM programa_ejercicio WHERE id_ejercicio = ?", [
            id_ejercicio,
        ]);
    }
}