const db = require('../util/database');

module.exports = class Cliente {
    constructor(cliente) {
        this.email = cliente.email;
        this.peso = cliente.peso;
        this.altura = cliente.altura;
        this.edad = cliente.edad;
        this.nivelDeActividad = cliente.nivelDeActividad;
        this.objetivo = cliente.objetivo;
        this.sexo = cliente.sexo;
        this.PRbenchPress = cliente.PRbenchPress;
        this.PRpesoMuerto = cliente.PRpesoMuerto;
        this.PRsentadilla = cliente.PRsentadilla;
    }

    save() {
        return db.execute('INSERT INTO cliente (email, peso, altura, edad, nivelDeActividad, objetivo, sexo, PRbenchPress, PRpesoMuerto, PRsentadilla) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.email, this.peso, this.altura, this.edad, this.nivelDeActividad, this.objetivo, this.sexo, this.PRbenchPress, this.PRpesoMuerto, this.PRsentadilla]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM cliente');
    }
}