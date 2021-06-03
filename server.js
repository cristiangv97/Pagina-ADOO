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

app.get("/", async (req, res) => {
  const resultV = await pool.query("select * from vehiculo");
  var myVehiculo = JSON.parse(JSON.stringify(resultV.rows[0]["nombre"]));
  res.render("index", { entradaCorreo: "", myVehiculo });
});

app.get("/iniciar-sesion.html", (req, res) => {
  res.render("iniciar-sesion");
});

app.get("/crear-cuenta.html", (req, res) => {
  res.render("crear-cuenta");
});

app.get("/index.html", (req, res) => {
  res.render("index", { entradaCorreo: "" });
});

app.post("/iniciar-sesion.html", async (req, res) => {
  let { entradaCorreo, entradaContrasena } = req.body;
  console.log({ entradaCorreo, entradaContrasena });

  //let hashedPassword = await bcrypt.hash(password, 10);
  //console.log(hashedPassword);

  const result = await pool.query(
    "select * from usuarioComprador where correo=$1",
    ["{" + [entradaCorreo] + "}"]
  );
  const resultV = await pool.query("select * from vehiculo");
  var myVehiculo = JSON.parse(JSON.stringify(resultV.rows[0]["nombre"]));

  var myJSON = JSON.parse(JSON.stringify(result.rows[0]["clave"]));
  const resCatalogo = await getCatalogo();
  //console.log("getCatalogo()= " + resCatalogo);
  console.log("Clave: " + myJSON);

  if (myJSON == entradaContrasena) {
    console.log("Usuario valido");
    res.render("index", { entradaCorreo, resCatalogo });
  }

  //pool.end();
});
///////////////////////////////////////
function getCatalogo() {
  const veh = [];

  const resultV = pool.query("select count(*) from vehiculo");
  var cantCatalogo = JSON.parse(JSON.stringify(resultV.rows[0]["count"]));

  for (let i = 0; i < cantCatalogo; i++) {
    const consNom = pool.query("select nombre from vehiculo");
    var nombre = JSON.parse(JSON.stringify(consNom.rows[i]["nombre"]));
    veh.push(nombre);
  }

  console.log("La cuenta del catalogo fue de " + cantCatalogo);
  console.log("Nombre: " + veh[0]);
  return veh;
}
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

app.use(express.static(__dirname + "/"));

// application/javascript;charset=utf-8
