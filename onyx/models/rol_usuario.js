const db = require('../util/database');

module.exports = class RolUsuario {
  constructor(id_rol, email) {
    this.id_rol = id_rol;
    this.email = email;
  }

  save() {
    return db.execute('INSERT INTO rol_usuario (id_rol, email, fecha_registro) VALUES (?, ?, ?)',
      [this.id_rol, this.email, new Date()]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM rol_usuario');
  }
}

