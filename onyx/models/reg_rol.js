const RolUsuario = require('../models/reg_rol');

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

