const db = require('../util/database');

module.exports = class Ejercicio {
    constructor(Ejercicio) {
        this.nombre = Ejercicio.nombre || '';
        this.descripcion = Ejercicio.descripcion || '';
        this.categoria = Ejercicio.categoria || '';
        this.nivelDeIntensidad = Ejercicio.nivelDeIntensidad || '';
        this.referenciaVisual = Ejercicio.referenciaVisual || '';
    }

    save() {
        return db.execute('INSERT INTO ejercicio (nombre, descripcion, categoria, nivelDeIntensidad, referenciaVisual) VALUES (?, ?, ?, ?, ?)',
            [this.nombre, this.descripcion, this.categoria, this.nivelDeIntensidad, this.referenciaVisual]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM ejercicio');
    }
}