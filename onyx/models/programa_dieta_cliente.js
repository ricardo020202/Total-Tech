const db = require('../util/database');

module.exports = class ProgramaDietaCliente {
    constructor(favorito) {
        this.id_programa = favorito.id_programa;
        this.id_dieta = favorito.id_dieta;
        this.email = favorito.email;
    }

    save() {
        return db.execute('INSERT INTO programa_dieta_cliente (id_programa, id_dieta, email) VALUES (?, ?, ?)',
            [this.id_programa, this.id_dieta, this.email]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM programa_dieta_cliente');
    }


    static deleteById(id_dieta,id_programa) {
        return db.execute('DELETE FROM programa_dieta_cliente WHERE id_dieta = ? AND id_programa = ?', [id_dieta, id_programa]);
    }
}