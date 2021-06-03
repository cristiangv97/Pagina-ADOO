const express = require("express");
const app = express();

const { Pool } = require("pg");
const config = {
  user: "postgres",
  host: "localhost",
  // password: "maravilloso",
  password: "123",
  database: "postgres",
  // database: "ADOO",
};

const pool = new Pool(config);

const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  //console.log("Nombre: " + resCatalogo[0]);
  res.render("index", { entradaCorreo: "", resCatalogo });
});

app.get("/iniciar-sesion.html", (req, res) => {
  res.render("iniciar-sesion");
});

app.get("/agregar-metodo-pago.html", (req, res) => {
  res.render("agregar-metodo-pago");
});

app.get("/confirmar-compra.html", (req, res) => {
  res.render("confirmar-compra");
});

app.get("/compra-finalizada.html", (req, res) => {
  res.render("compra-finalizada");
});

app.get("/menu-personalizacion.html", (req, res) => {
  res.render("menu-personalizacion");
});

app.get("/mas-vendidos.html", (req, res) => {
  res.render("mas-vendidos");
});

app.get("/mas-recientes.html", (req, res) => {
  res.render("mas-recientes");
});

app.get("/crear-cuenta.html", (req, res) => {
  res.render("crear-cuenta");
});

app.get("/index.html", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  //console.log("Nombre: " + resCatalogo[0]);
  res.render("index", { entradaCorreo: "", resCatalogo });
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

app.post("/descripcion", async (req, res) => {
  let { model } = req.body;
  console.log("..." + model);
  //res.render("index", { entradaCorreo, resCatalogo });
  res.render("descripcion");
});
///////////////////////////////////////
const getCatalogo = async () => {
  try {
    let veh = [];
    const resultV = await pool.query("select count(*) from vehiculo");
    var cantCatalogo = JSON.parse(JSON.stringify(resultV.rows[0]["count"]));

    for (let i = 0; i < cantCatalogo; i++) {
      const consNom = await pool.query("select nombre from vehiculo");
      var nombre = JSON.parse(JSON.stringify(consNom.rows[i]["nombre"]));
      veh.push(nombre);
    }

    console.log("La cuenta del catalogo fue de " + cantCatalogo);
    //console.log("La cuenta del catalogo fue de " + veh.length.toString());
    //console.log("Nombre: " + veh[0]);
    return veh;
  } catch (e) {
    console.log(e);
  }
};
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
