const db = require("../util/database");

module.exports = class Bitacora {
    constructor(bitacora) {
        this.id_bitacora = bitacora.id_bitacora;
        this.fecha = bitacora.fecha;
        this.contenido = bitacora.contenido;
        this.entreno = bitacora.entreno;
        this.email = bitacora.email;
    }

    save() {
        return db.execute(
            "INSERT INTO bitacora (fecha, contenido, entreno, email) VALUES (?, ?, ?, ?)",
            [this.fecha, this.contenido, this.entreno, this.email]
        );
    }

    static fetchAll() {
        return db.execute("SELECT * FROM bitacora");
    }

    static fetchById(id_bitacora) {
        return db.execute("SELECT * FROM bitacora WHERE id_bitacora = ?", [
            id_bitacora,
        ]);
    }

    update() {
        return db.execute(
            "UPDATE bitacora SET fecha = ?, contenido = ?, entreno = ?, email = ? WHERE id_bitacora = ?",
            [
                this.fecha,
                this.contenido,
                this.entreno,
                this.email,
                this.id_bitacora,
            ]
        );
    }

    static deleteById(id_bitacora) {
        return db.execute("DELETE FROM bitacora WHERE id_bitacora = ?", [
            id_bitacora,
        ]);
    }

    static fetchByDate(email, fecha) {
        return db.execute(
            "SELECT * FROM bitacora WHERE email = ? AND fecha = ?",
            [email, fecha]
        );
    }

    static fetch10(email) {
        return db.execute(
            "SELECT * FROM bitacora WHERE email = ? ORDER BY fecha DESC LIMIT 10",
            [email]
        );
    }
};
