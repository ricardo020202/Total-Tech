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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    app.use(csrfProtection);

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);
app.use(express.static(path.join(__dirname, "public")));

const noRegRoutes = require("./routes/noRegistrados");
app.use("/onyx", noRegRoutes);

const onyxRoutes = require("./routes/onyx");
app.use("/onyx", isAuth, onyxRoutes);

const adminRoutes = require("./routes/admin");
app.use("/admin", isAuth, adminRoutes);

app.use((req, res, next) => {
    res.status(404);
    res.send("404 - Page not found");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.post('/auth/google/callback', async (req, res) => {
    const token = req.body.idtoken;
  
    try {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const userId = payload['sub'];
  
      // Aquí es donde se recupera la información del usuario y se inserta en las tablas de Onyx
  
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'onyx'
      });
  
      const [rows, fields] = await connection.execute('SELECT * FROM usuarios WHERE google_id = ?', [userId]);
      let user = null;
  
      if (rows.length == 0) {
        const [insertedRow] = await connection.execute('INSERT INTO usuarios (google_id, nombre, email) VALUES (?, ?, ?)', [userId, payload['name'], payload['email']]);
        user = insertedRow.insertId;
      } else {
        user = rows[0].id;
      }
  
      const [insertedRow] = await connection.execute('INSERT INTO sesiones (usuario_id, fecha) VALUES (?, NOW())', [user]);
  
      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(401).send('Unauthorized');
    }
  });