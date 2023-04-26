const db = require("../util/database");

module.exports = class Ejercicio {
    constructor(ejercicio) {
        this.id_ejercicio = ejercicio.id_ejercicio || null;
        this.categoria = ejercicio.categoria || null;
        this.nivel_intensidad = ejercicio.nivel_intensidad || null;
        this.referencia_visual = ejercicio.referencia_visual || null;
        this.descripcion_ejercicio = ejercicio.descripcion_ejercicio || null;
        this.nombre_ejercicio = ejercicio.nombre_ejercicio || null;
        this.imagen_ejercicio = ejercicio.imagen_ejercicio || null;
    }

    save() {
        return db.execute(
            "INSERT INTO ejercicio (categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES (?, ?, ?, ?, ?, ?)",
            [
                this.categoria,
                this.nivel_intensidad,
                this.referencia_visual,
                this.descripcion_ejercicio,
                this.nombre_ejercicio,
                this.imagen_ejercicio,
            ]
        );
    }

    static fetchAll() {
        return db.execute("SELECT * FROM ejercicio");
    }

    static fetchById(id_ejercicio) {
        return db.execute("SELECT * FROM ejercicio WHERE id_ejercicio = ?", [
            id_ejercicio,
        ]);
    }

    static update() {
        return db.execute(
            "UPDATE ejercicio SET categoria = ?, nivel_intensidad = ?, referencia_visual = ?, descripcion_ejercicio = ?, nombre_ejercicio = ?, imagen_ejercicio = ? WHERE id_ejercicio = ?",
            [
                this.categoria,
                this.nivel_intensidad,
                this.referencia_visual,
                this.descripcion_ejercicio,
                this.nombre_ejercicio,
                this.imagen_ejercicio,
                this.id_ejercicio,
            ]
        );
    }

    static deleteById(id_ejercicio) {
        return db.execute("DELETE FROM ejercicio WHERE id_ejercicio = ?", [
            id_ejercicio,
        ]);
    }

    static getTotal() {
        return db.execute("SELECT COUNT(*) as total FROM ejercicio");
    }

    updateById(id_ejercicio) {
        return db.execute(
            "UPDATE ejercicio SET categoria = ?, nivel_intensidad = ?, referencia_visual = ?, descripcion_ejercicio = ?, nombre_ejercicio = ?, imagen_ejercicio = ? WHERE id_ejercicio = ?",
            [
                this.categoria || null,
                this.nivel_intensidad || null,
                this.referencia_visual || null,
                this.descripcion_ejercicio || null,
                this.nombre_ejercicio || null,
                this.imagen_ejercicio || null,
                id_ejercicio,
            ]
        );
    }

    static getTotalHipertrofia() {
        return db.execute(
            "SELECT COUNT(*) as total FROM ejercicio WHERE categoria = 'Hipertrofia'"
        );
    }

    static getTotalFuerza() {
        return db.execute(
            "SELECT COUNT(*) as total FROM ejercicio WHERE categoria = 'Fuerza'"
        );
    }

    static getTotalResistencia() {
        return db.execute(
            "SELECT COUNT(*) as total FROM ejercicio WHERE categoria = 'Resistencia'"
        );
    }

    static getTotalPush() {
        return db.execute(
            "SELECT COUNT(*) as total FROM ejercicio WHERE categoria = 'Push'"
        );
    }

    static getTotalPull() {
        return db.execute(
            "SELECT COUNT(*) as total FROM ejercicio WHERE categoria = 'Pull'"
        );
    }

    static getTotalFullBody() {
        return db.execute(
            "SELECT COUNT(*) as total FROM ejercicio WHERE categoria = 'Full-Body'"
        );
    }
};
