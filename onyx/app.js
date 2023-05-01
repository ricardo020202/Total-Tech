//app.js

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const session = require("express-session");
const csrf = require("csurf");
const isAuth = require("./util/is-auth");
const flash = require("connect-flash");
const multer = require("multer");
const mysql = require('mysql2/promise');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '141860110384-4rkak3dc4oehtdj46ogd2aufa9vf34le.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
//const cors = require('cors');
const Rol = require('./models/rol');
const Usuario = require('./models/usuario');
const connection = require('./util/database');

//app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
    session({
        secret: "mi string secreto que debe ser un string aleatorio muy largo, no como éste",
        resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió
        saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
    })
);

app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
}





const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "public/uploads");
    },
    filename: (request, file, callback) => {
        callback(
            null,
            //En Mac
            // new Date().toISOString()
            //En Windows
            new Date().getMilliseconds() + "-" + file.originalname
        );
    },
});

app.use(multer({ storage: fileStorage }).single("image"));

app.post('/auth/google/callback', async (req, res) => {
  const token = req.body.idtoken;
  console.log('ID Token Recibido: ' + token);

  try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];

    
    const [rolRows, rolFields] = await connection.execute('SELECT * FROM rol WHERE nombreRol = ?', ['cliente']);
    if (rolRows.length === 0) {
      throw new Error('Rol cliente no encontrado');
    }
    const rolClienteId = rolRows[0].id_rol;


    const [rows, fields] = await connection.execute('SELECT * FROM usuario WHERE google_id = ?', [userId]);
    let user = null;

    if (rows.length == 0) {
      const [insertedRow] = await connection.execute('INSERT INTO usuario (nombre, email) VALUES (?, ?)', [payload['name'], payload['email']]);
      user = insertedRow.insertId;
      await connection.execute('INSERT INTO rol_usuario (email, id_rol, fecha) VALUES (?, ?, NOW())', [payload['email'], 2]);

    } else {
      user = rows[0].id;
    }

    const [insertedRow] = await connection.execute('INSERT INTO sesiones (id_sesion, fecha) VALUES (?, NOW())', [user]);

    req.session.isLoggedIn = true;
    res.redirect('/onyx');
  } catch (error) {
    console.error(error);
    res.status(404).send('Error al iniciar sesión con Google');
  }
});
app.use(csrfProtection);

app.use(express.static(path.join(__dirname, "public")));

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const noRegRoutes = require("./routes/noRegistrados");
app.use("/onyx", noRegRoutes);

const onyxRoutes = require("./routes/onyx");
app.use("/onyx", isAuth, onyxRoutes);

const adminRoutes = require("./routes/admin");
app.use("/admin", isAuth, adminRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

