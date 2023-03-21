const db = require('../util/database');

module.exports = class Talla {
    constructor(talla) {
        this.extremidad = talla.extremidad;
        this.medida = talla.medida;
    }

    save() {
        return db.execute('INSERT INTO talla (extremidad, medida) VALUES (?, ?)',
            [this.extremidad, this.medida]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM talla');
    }

    static fetch(email){
        return db.execute('SELECT * FROM talla WHERE email = ?', [email]);
    }
}