const db = require('../util/database');

module.exports = class Bitacora {
    constructor(bitacora) {
        this.contenido = bitacora.contenido;
        this.entreno = bitacora.entreno;
    }

    save() {
        return db.execute('INSERT INTO bitacora (contenido, entreno) VALUES (?, ?, ?)',
            [this.contenido, this.entreno]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM bitacora');
    }
}