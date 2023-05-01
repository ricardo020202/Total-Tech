const db = require('../util/database');

module.exports = class Talla {
    constructor(talla) {
        this.email = talla.email;
        this.extremidad = talla.extremidad;
        this.medida = talla.medida;
        this.fecha = talla.fecha;
    }

    save() {
        return db.execute('INSERT INTO talla (email, extremidad, medida, fecha) VALUES (?, ?, ?, ?)', 
        [this.email, this.extremidad, this.medida, this.fecha]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM talla');
    }

    static fetch(email){
        return db.execute('SELECT * FROM talla WHERE email = ?', [email]);
    }

    static fetchExtremidad(email, extremidad){
        return db.execute('SELECT * FROM talla WHERE email = ? AND extremidad = ?', [email, extremidad]);
    }

    static getTotalMedidas(email, extremidad){
        return db.execute('SELECT COUNT(*) FROM talla WHERE email = ? AND extremidad = ?', [email, extremidad]);
    }

    static getLast(email, extremidad){
        return db.execute('SELECT medida FROM talla WHERE email = ? AND extremidad = ? ORDER BY fecha DESC LIMIT 1', [email, extremidad]);
    }
}