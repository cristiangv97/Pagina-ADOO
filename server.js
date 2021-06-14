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
var variableSesion;

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
  res.render("index", { variableSesion, resCatalogo });
});

/************************************************ CERRAR SESION ************************************************/
app.get("/cerrar-sesion.html", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  variableSesion = null;
  enSesion = false;
  res.render("index", { variableSesion, resCatalogo });
});

app.post("/cerrar-sesion.html", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  variableSesion = null;
  enSesion = false;
  res.render("index", { variableSesion, resCatalogo });
});

/************************************************ AGREGAR METODO DE PAGO ************************************************/
app.get("/agregar-metodo-pago.html", (req, res) => {
  res.render("agregar-metodo-pago", { variableSesion });
});

/************************************************ COMPRA FINALIZADA ************************************************/
app.post("/compra-finalizada.html", async (req, res) => {
  if (enSesion) {
    res.render("compra-finalizada", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

app.get("/compra-finalizada.html", async (req, res) => {
  if (enSesion) {
    res.render("compra-finalizada", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

/************************************************ MAS VENDIDOS ************************************************/
app.get("/mas-vendidos.html", (req, res) => {
  res.render("mas-vendidos");
});

/************************************************ MAS RECIENTES ************************************************/
app.get("/mas-recientes.html", (req, res) => {
  res.render("mas-recientes");
});

/************************************************ DESCRIPCION ************************************************/
app.post("/descripcion", async (req, res) => {
  console.log("post descirpcion llamada");
  let { modelo } = req.body;
  infoModelo = await getDetallesModelo(modelo);
  caracterizados = await getModelosCaracterizados(modelo);
  res.render("descripcion", {
    variableSesion,
    modelo,
    infoModelo,
    caracterizados,
  });
});

app.get("/descripcion", async (req, res) => {
  res.render("descripcion", { variableSesion });
});

/************************************************ INDEX ************************************************/
app.get("/index.html", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  res.render("index", { variableSesion, resCatalogo });
});

app.post("/index.html", async (req, res) => {
  console.log("Llamaste a post del index");
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  console.log("Nombre recibido del index es: " + nombre_carro);
  res.render("index", { variableSesion, resCatalogo });
});

/************************************************ CREAR CUENTA ************************************************/
app.get("/crear-cuenta.html", (req, res) => {
  res.render("crear-cuenta");
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

    console.log("Registrando usuario");
    const result = await pool.query(
      "INSERT INTO usuarioComprador (nombreUC,apellidoMAtUC,apellidoPAtUC,correo, clave,verificado) VALUES ($1, $3, $2, $4, $5, $6)",
      [
        nombre_registro,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        contrasena,
        codigoVer,
      ]
    );

    //subir el codigo de confirmacion a la base para despues
    //utilizarlo en la pantallad de verificacion y como parametro a validar
    //en el inicio de sesion
    const ver = pool.query(
      "update usuarioComprador set verificado = '$1' where correo='$2'",
      [codigoVer, correo]
    );

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
  res.render("iniciar-sesion", { variableSesion });
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
    //Validar que el usuario este verificado
    const verif = await pool.query(
      "select verificado from usuarioComprador where correo=$1",
      [entradaCorreo]
    );
    var resVer = JSON.parse(JSON.stringify(verif.rows[0]["verificado"]));
    if (myJSON === entradaContrasena) {
      variableSesion = result.rows[0].correo;
      enSesion = true;
      if (resVer != "ok") {
        console.log("Verificacion: " + resVer);
        res.render("verificar-correo");
      }
      console.log("Usuario valido");
      res.render("index", { variableSesion, resCatalogo });
    } else {
      console.log("El usuario no existe");
      res.render("iniciar-sesion", {
        variableSesion: "Correo o contraseña no válidos.",
      });
    }
  } else {
    console.log("El usuario no existe");
    res.render("iniciar-sesion", {
      variableSesion: "Correo o contraseña no válidos.",
    });
  }

  //pool.end();
});

/************************************************ MENU PERSONALIZACION ************************************************/
app.post("/menu-personalizacion", async (req, res) => {
  res.render("menu-personalizacion", { variableSesion });
});

app.get("/menu-personalizacion", async (req, res) => {
  if (enSesion) {
    res.render("menu-personalizacion", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

/************************************************ CONFIRMAR COMPRA ************************************************/
//Trabajando en...
app.post("/confirmar-compra", async (req, res) => {
  if (!enSesion) {
    res.render("iniciar-sesion", { variableSesion });
  } else {
    let { idcarmodelo } = req.body;
    console.log(idcarmodelo);
    var mpago = await getMetodosPago(variableSesion);
    var sucursal = await getSucursalesProveedor(idcarmodelo);

    res.render("confirmar-compra", {
      variableSesion,
      idcarmodelo,
      mpago,
      sucursal,
    });
  }
});

app.get("/confirmar-compra", async (req, res) => {
  if (enSesion) {
    res.render("confirmar-compra", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

/************************************************ INORMACION CUENTA ************************************************/
app.post("/informacion-cuenta.html", async (req, res) => {
  if (enSesion) {
    res.render("informacion-cuenta", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

app.get("/informacion-cuenta.html", async (req, res) => {
  if (enSesion) {
    res.render("informacion-cuenta", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

/*****************************************************************************************************************/
/************************************************ FUNCIONES EXTRA ************************************************/
/*****************************************************************************************************************/

const getMetodosPago = async (correousuario) => {
  try {
    let resultMetodosPago = await pool.query(
      "select nTarjeta from metodoPago where idusuarioc = (select idusuarioc from usuariocomprador where correo=$1)",
      [correousuario]
    );
    console.log(resultMetodosPago.rows);
    return resultMetodosPago.rows;
  } catch (error) {
    console.log(error);
  }
};

const getSucursalesProveedor = async (idcarmodelo) => {
  try {
    let sucursales = await pool.query(
      "select nombresucursal,direccionsucursal from sucursal inner join sucursalproveedor on sucursal.idsucursal = sucursalproveedor.idsucursal inner join usuarioproveedor on sucursalproveedor.idproveedor = usuarioproveedor.idproveedor inner join modeloproveedor on usuarioproveedor.idproveedor = modeloproveedor.idproveedor inner join modelo on modeloproveedor.idmodelo=modelo.idmodelo inner join vehicar on modelo.idmodelo = vehicar.idmodelo where idcarmodelo=$1",
      [idcarmodelo]
    );
    console.log(sucursales.rows);
    return sucursales.rows;
  } catch (error) {
    console.log(error);
  }
};

const getCatalogo = async () => {
  try {
    let veh = [];
    const resultVE = await pool.query("select count(*) from modelo;");
    var cantCatalogoE = JSON.parse(JSON.stringify(resultVE.rows[0]["count"]));
    console.log("Total de automóviles: " + cantCatalogoE);

    // const resultVC = await pool.query("select count(*) from modeloCombustion");
    // var cantCatalogoC = JSON.parse(JSON.stringify(resultVC.rows[0]["count"]));
    // console.log("Combustión: " + cantCatalogoC);

    // var cantCatalogo = cantCatalogoC + cantCatalogoE;

    for (let i = 0; i < cantCatalogoE; i++) {
      const consNom = await pool.query(
        "select nombreModelo from modelo;"
        // "select nombreModelo from modeloCombustion"
      );
      var nombre = JSON.parse(JSON.stringify(consNom.rows[i]["nombremodelo"]));
      const preM = await pool.query(
        "select min(precio) from vehicar where idmodelo=(select idModelo from modelo where nombremodelo='" +
          nombre +
          "');"
      );
      var precio = JSON.parse(JSON.stringify(preM.rows[0]["min"]));

      //console.log("Nombres:" + nombre);
      // Orden de los automóviles es, primero combustión y después eléctricos.
      veh.push(nombre, precio);
    }

    // console.log("La cuenta del catalogo fue de " + cantCatalogo);
    //console.log("La cuenta del catalogo fue de " + veh.length.toString());
    //console.log("Nombre: " + veh[0]);
    return veh;
  } catch (e) {
    console.log(e);
  }
};

const getDetallesModelo = async (modelo) => {
  console.log("Inicio de función idModelo");
  try {
    let result = [];
    let resultModelos = await pool.query(
      "select * from modelo where nombreModelo = $1",
      [modelo]
    );
    // var idmod = JSON.parse(JSON.stringify(resultModelos.rows[0]["idmodeloc"]));
    result.push(resultModelos.rows[0]);
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
};

const getModelosCaracterizados = async (modelo) => {
  try {
    const preM = await pool.query(
      "select idcarmodelo,precio,color from vehicar where idmodelo=(select idModelo from modelo where nombremodelo='" +
        modelo +
        "');"
    );
    console.log(preM.rows);
    return preM.rows;
  } catch (error) {
    log;
  }
};
///////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.static(__dirname + "/"));

// application/javascript;charset=utf-8
