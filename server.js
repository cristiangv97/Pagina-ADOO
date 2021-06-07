const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const { Pool } = require("pg");
const config = {
  user: "postgres",
  host: "localhost",
  // password: "maravilloso",
  password: "1234",
  // password: "admin",
  database: "postgres",
  // database: "ADOO",
};

var enSesion;
var estatusSesion;

const pool = new Pool(config);

const bcrypt = require("bcrypt");
const { render } = require("ejs");

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

/************************************************ HOME ************************************************/
app.get("/", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  //console.log("Nombre: " + resCatalogo[0]);
  if (enSesion) {
    console.log(enSesion);
    res.render("index", { estatusSesion, resCatalogo });
  } else {
    console.log("not-logged-in");
    res.render("index", { estatusSesion, resCatalogo });
  }
});

/************************************************ CREAR CUENTA ************************************************/
app.post("/crear-cuenta.html", (req, res) => {
  res.render("verificar-correo");
});

/************************************************ AGREGAR METODO DE PAGO ************************************************/
app.get("/agregar-metodo-pago.html", (req, res) => {
  res.render("agregar-metodo-pago");
});

/************************************************ AGREGAR METODO DE PAGO ************************************************/
app.get("/compra-finalizada.html", (req, res) => {
  res.render("compra-finalizada");
});

// app.get("/menu-personalizacion.html", (req, res) => {
//   res.render("menu-personalizacion");
// });

/************************************************ MAS VENDIDOS ************************************************/
app.get("/mas-vendidos.html", (req, res) => {
  res.render("mas-vendidos");
});

/************************************************ MAS RECIENTES ************************************************/
app.get("/mas-recientes.html", (req, res) => {
  res.render("mas-recientes");
});

/************************************************ CREAR CUENTA ************************************************/
app.get("/crear-cuenta.html", (req, res) => {
  res.render("crear-cuenta");
});

/************************************************ DESCRIPCION ************************************************/
app.post("/descripcion", (req, res) => {
  // console.log('descripcion llamada');
  if (enSesion) {
    console.log("logged-in");
    res.render("descripcion", { estatusSesion});
  } else {
    console.log("not-logged-in");
    res.render("descripcion", { estatusSesion});
  }
});

app.get("/descripcion.html", (req, res) => {
  if (enSesion) {
    console.log("logged-in");
    res.render("descripcion", { estatusSesion});
  } else {
    console.log("not-logged-in");
    res.render("descripcion", { estatusSesion});
  }
});

app.get("/crear-cuenta.html", (req, res) => {
  res.render("crear-cuenta");
});

/************************************************ INDEX ************************************************/
app.get("/index.html", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  //console.log("Nombre: " + resCatalogo[0]);
  if (enSesion) {
    console.log(enSesion);
    res.render("index", { estatusSesion, resCatalogo });
  } else {
    console.log("not-logged-in");
    res.render("index", { estatusSesion, resCatalogo });
  }
});

app.post("/index.html", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  //console.log("Nombre: " + resCatalogo[0]);
  if (enSesion) {
    console.log(enSesion);
    res.render("index", { estatusSesion, resCatalogo });
  } else {
    console.log("not-logged-in");
    res.render("index", { estatusSesion, resCatalogo });
  }
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
  if (tamanio === 0) {
    console.log("Registrando usuario");
    const result = await pool.query(
      "INSERT INTO usuarioComprador (nombreUC,apellidoMAtUC,apellidoPAtUC,correo, clave) VALUES ($1, $3, $2, $4, $5)",
      [nombre_registro, apellidoPaterno, apellidoMaterno, correo, contrasena]
    );

    //generación del código
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    function generateString(length) {
      let result = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    }

    //envia
    let codigoVer = generateString(6);
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
      to: correo,
      subject: "Código de verificación",
      text: "Su código de verificación es " + codigoVer,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("RIP");
        console.log(err);
      } else {
        console.log("Si se mandó");
      }
    });

    res.render("verificar-correo");
  } else {
    console.log("Usuario ya registrado");
    res.render("crear-cuenta");
  }
});

/************************************************ INICIAR SESION ************************************************/
app.get("/iniciar-sesion.html", (req, res) => {
  res.render("iniciar-sesion", { estatusSesion });
});

app.post("/iniciar-sesion.html", async (req, res) => {
  let { entradaCorreo, entradaContrasena } = req.body;
  console.log({ entradaCorreo, entradaContrasena });

  //let hashedPassword = await bcrypt.hash(password, 10);
  //console.log(hashedPassword);

  const result = await pool.query(
    "select * from usuarioComprador where correo=$1",
    [entradaCorreo]
  );

  console.log("Contador de resultados: " + result.rowCount);

  if (result.rowCount > 0) {
    var myJSON = JSON.parse(JSON.stringify(result.rows[0]["clave"]));
    const resCatalogo = await getCatalogo();
    //console.log("getCatalogo()= " + resCatalogo);
    console.log("Clave: " + myJSON);
    // console.log("This is gen"+entradaCorreoGen);
    if (myJSON == entradaContrasena) {
      estatusSesion = result.rows[0].nombreuc;
      enSesion = true;
      console.log("Usuario valido");
      res.render("index", { estatusSesion, resCatalogo });
    }
    else {
      console.log("El usuario no existe");
      res.render("iniciar-sesion", {
        estatusSesion: "Correo o contraseña no válidos.",
      });
    }
  } else {
    console.log("El usuario no existe");
    res.render("iniciar-sesion", {
      estatusSesion: "Correo o contraseña no válidos.",
    });
  }

  //pool.end();
});

/************************************************ MENU PERSONALIZACION ************************************************/
app.post("/menu-personalizacion.html", async (req, res) => {
  //res.render("index", { entradaCorreo, resCatalogo });
  if (enSesion) {
    console.log(enSesion);
    res.render("menu-personalizacion", { estatusSesion});
  } else {
    console.log("not-logged-in");
    res.render("menu-personalizacion", { estatusSesion });
  }
});

app.get("/menu-personalizacion.html", async (req, res) => {
  //console.log("Nombre: " + resCatalogo[0]);
  if (enSesion) {
    console.log(enSesion);
    res.render("menu-personalizacion", { estatusSesion});
  } else {
    console.log("not-logged-in");
    res.render("menu-personalizacion", { estatusSesion});
  }
});

/************************************************ CONFIRMAR COMPRA ************************************************/
app.post("/confirmar-compra.html", async (req, res) => {
  //res.render("index", { entradaCorreo, resCatalogo });
  if (enSesion) {
    console.log(enSesion);
    res.render("confirmar-compra", { estatusSesion});
  } else {
    console.log("not-logged-in");
    res.render("iniciar-sesion", { estatusSesion});
  }
});

app.get("/confirmar-compra.html", async (req, res) => {
  //console.log("Nombre: " + resCatalogo[0]);
  if (enSesion) {
    console.log(enSesion);
    res.render("confirmar-compra", { estatusSesion});
  } else {
    console.log("not-logged-in");
    res.render("iniciar-sesion", { estatusSesion});
  }
});

/*****************************************************************************************************************/
/************************************************ FUNCIONES EXTRA ************************************************/
/*****************************************************************************************************************/

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
