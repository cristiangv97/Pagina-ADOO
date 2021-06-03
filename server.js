const express = require("express");
const app = express();

const { Pool } = require("pg");
const config = {
  user: "postgres",
  host: "localhost",
  password: "1234",
  database: "postgres",
};

const pool = new Pool(config);

const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { entradaCorreo: "" });
});

app.get("/iniciar-sesion.html", (req, res) => {
  res.render("iniciar-sesion");
});

app.get("/crear-cuenta.html", (req, res) => {
  res.render("crear-cuenta");
});

app.get("/index.html", (req, res) => {
  res.render("index", {entradaCorreo:""});
});

app.post("/iniciar-sesion.html", async (req, res) => {
  let { entradaCorreo, entradaContrasena } = req.body;
  console.log({ entradaCorreo, entradaContrasena });

  let errors = [];

  //let hashedPassword = await bcrypt.hash(password, 10);
  //console.log(hashedPassword);
  const result = await pool.query("select * from usuario where correo=$1", [
    "{" + [entradaCorreo] + "}",
  ]);

  var myJSON = JSON.stringify(result.rows[0]["clave"]);

  console.log("Clave: " + JSON.parse(myJSON));
  if (JSON.parse(myJSON) == entradaContrasena) {
    console.log("Usuario valido");
    res.render("index", { entradaCorreo });
  }

  //pool.end();
});

///////////////////////////////////////

app.get("/users/register", (req, res) => {
  res.render("register");
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", { user: "Conor", pass: "1234" });
  //alert("Dashboard")
});

app.post("/users/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;
  console.log({ name, email, password, password2 });

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be at least 6 chars" });
  }

  if (password != password2) {
    errors.push({ message: "Passwords don't match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    //Form validation passed
    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    console.log(email);
    const res = await pool.query("select * from usuario where correo=$1", [
      "{" + [email] + "}",
    ]);
    console.log(res.rows);
    //pool.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.static(__dirname + '/'));

// application/javascript;charset=utf-8
