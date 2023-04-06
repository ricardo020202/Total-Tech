const RolUsuario = require('../models/reg_rol');
const db = require('../util/database');



exports.insertRol = async (id_rol, nombre_rol) => {
  await db.execute('INSERT INTO rol (id_rol, nombreRol, statusRol) VALUES (?, ?, ?)', [id_rol, nombre_rol, 'on']);
};

exports.insertRolPrivilegio = async (id_rol, id_cu) => {
  await db.execute('INSERT INTO rol_privilegio (id_rol, id_cu) VALUES (?, ?)', [id_rol, id_cu]);
};

exports.reg_rol = (req, res, next) => {
  const email = req.session.email;
  const tipoRol = req.body.id_rol;
  
  RolUsuario.create({
    email: email,
    id_rol: tipoRol
    
  })
    .then(resultado => {
      console.log('Registro guardado en la base de datos.');
      res.redirect('/');

    })
    .catch(error => {
      console.log('Error al guardar el registro en la base de datos:', error);
      res.redirect('/');

    });
};

exports.registrarRol = async (req, res) => {
    try {
        const { id_rol, nombre_rol, id_cu } = req.body;
        const ids_casos_uso = id_cu.split(',');

        // Insertar rol en la tabla rol
        await db.execute('INSERT INTO rol (id_rol, nombreRol, statusRol) VALUES (?, ?, ?)', [id_rol, nombre_rol, 'on']);

        // Insertar registros en la tabla rol_privilegio
        for (const id_caso_uso of ids_casos_uso) {
            await db.execute('INSERT INTO rol_privilegio (id_rol, id_cu) VALUES (?, ?)', [id_rol, id_cu.trim()]);
        }

        res.status(200).json({ message: 'Rol registrado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el rol.', error});
    }
};

exports.getreg_rol = (req, res, next) => {
  res.render("reg_rol", {
    pagetitle: "Registro de Rol",
    user: req.session.user, // o como se llame la variable en la sesión
    csrfToken: req.csrfToken()
  });
};
