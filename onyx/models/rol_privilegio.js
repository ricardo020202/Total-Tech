const db = require('../util/database');

module.exports = class RolPrivilegio {
    constructor(id_rol, id_cu) {
        this.id_rol = id_rol;
        this.id_cu = id_cu;
    }

    save() {
        return db.execute('INSERT INTO rol_privilegio (id_rol, id_cu) VALUES (?, ?)',
            [this.id_rol, this.id_cu]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM rol_privilegio');
    }

    static deleteByRol(id) {
        return db.execute('DELETE FROM rol_privilegio WHERE id_rol = ?', [id]);
      }
      
}

module.exports = RolPrivilegio;