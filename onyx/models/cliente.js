const db = require('../util/database');

module.exports = class Cliente {
    constructor(cliente) {
        this.email = cliente.email;
        this.altura = cliente.altura;
        this.edad = cliente.edad;
        this.nivel_actividad = cliente.nivel_actividad;
        this.objetivo = cliente.objetivo;
        this.sexo = cliente.sexo;
        this.pr_BenchPress = cliente.pr_BenchPress;
        this.pr_PesoMuerto = cliente.pr_PesoMuerto;
        this.pr_Sentadillas = cliente.pr_Sentadillas;
    }

    save() {
        return db.execute('INSERT INTO cliente (email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.email, this.altura, this.edad, this.nivel_actividad, this.objetivo, this.sexo, this.pr_BenchPress, this.pr_PesoMuerto, this.pr_Sentadillas]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM cliente');
    }

    static fetchOne(email) {
        return db.execute('SELECT * FROM cliente WHERE email = ?', [email]);
    }

    update() {
        return db.execute('UPDATE cliente SET altura = ?, edad = ?, nivel_actividad = ?, objetivo = ?, sexo = ?, pr_BenchPress = ?, pr_PesoMuerto = ?, pr_Sentadillas = ? WHERE email = ?',
            [this.altura, this.edad, this.nivel_actividad, this.objetivo, this.sexo, this.pr_BenchPress, this.pr_PesoMuerto, this.pr_Sentadillas, this.email]
        );
    }

    static deletebyEmail(email) {
        return db.execute('DELETE FROM cliente WHERE email = ?', [email]);
    }
}