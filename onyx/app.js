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
app.use(csrfProtection);

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
