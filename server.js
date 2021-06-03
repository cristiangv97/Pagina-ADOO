const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
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
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  //console.log("Nombre: " + resCatalogo[0]);
  res.render("index", { entradaCorreo: "", resCatalogo });
});

app.get("/iniciar-sesion.html", (req, res) => {
  res.render("iniciar-sesion");
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

app.post("/crear-cuenta.html", async (req, res) => {
  //implementación solo para usuario
  let {
    nombre_registro,
    apellidoPaterno,
    apellidoMaterno,
    correo,
    contrasena,
    confirmarContrasena,
  } = req.body;

  const result = await pool.query(
    "select * from usuarioComprador where correo=$1",
    ["{" + [correo] + "}"]
  );

  //buen código del stack overflow
  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  //calculamos el tamaño
  let tamanio = Object.size(result.rows);
  console.log(tamanio);

  //si  encuentra un correo igual el tamaño != 0
  if (tamanio == 0) {
    console.log("a registrar concha su madre");

    //envia
    let emailUsuario = "gomez.santillan.meza@gmail.com";
    let codigoVer = "siuuuu";
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "isurusictu@gmail.com",
        pass: "12345678Mm*",
      },
    });
    let mailOptions = {
      from: "isurusictu@gmail.com",
      to: emailUsuario,
      subject: "Código de verificación",
      text: codigoVer,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("RIP");
        console.log(err);
      } else {
        console.log("Si se mandó");
      }
    });
  } else {
    console.log("valio verga ya hay un wey");
  }

  res.render("verificar-correo");
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
  const resultV = await pool.query("select * from modeloCombustion");
  //var myVehiculo = JSON.parse(JSON.stringify(resultV.rows[0]["modelo"]));

  var myJSON = JSON.parse(JSON.stringify(result.rows[0]["clave"]));
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  //console.log("Nombre: " + resCatalogo[0]);
  console.log("Clave: " + myJSON);

  if (myJSON == entradaContrasena) {
    console.log("Usuario valido");
    res.render("index", { entradaCorreo, resCatalogo });
  } else {
    res.render("iniciar-sesion");
  }

  //pool.end();
});

app.get("/descripcion.html", async (req, res) => {
  //let { model } = req.body;
  //console.log("..." + model);
  //res.render("index", { entradaCorreo, resCatalogo });
  res.render("descripcion");
});
///////////////////////////////////////
const getCatalogo = async () => {
  try {
    let veh = [];
    const resultV = await pool.query("select count(*) from modeloCombustion");
    var cantCatalogo = JSON.parse(JSON.stringify(resultV.rows[0]["count"]));

    for (let i = 0; i < cantCatalogo; i++) {
      const consNom = await pool.query("select modelo from modeloCombustion");
      var nombre = JSON.parse(JSON.stringify(consNom.rows[i]["modelo"]));
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
