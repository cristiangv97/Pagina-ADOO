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
app.get("/cerrar-sesion", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  variableSesion = null;
  enSesion = false;
  res.render("index", { variableSesion, resCatalogo });
});

app.post("/cerrar-sesion", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  variableSesion = null;
  enSesion = false;
  res.render("index", { variableSesion, resCatalogo });
});

/************************************************ AGREGAR METODO DE PAGO ************************************************/
app.get("/agregar-metodo-pago", (req, res) => {
  if (enSesion) {
    res.render("agregar-metodo-pago", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

app.post("/agregar-metodo-pago", async (req, res) => {
  //002
  let { nTarjeta, cSeguridad, fVencimiento, nomP, telP } = req.body;
  //console.log(correo);
  if (validarTarjeta(nTarjeta, variableSesion)) {
    //Aca ejecuta la insercion
    console.log(nTarjeta, cSeguridad, fVencimiento, nomP, telP, variableSesion);
    const getID = await pool.query(
      "select idusuarioc from usuariocomprador where correo=$1",
      [variableSesion]
    );
    const insercion = await pool.query(
      "insert into metodopago(nTarjeta,fechavencimiento,idusuarioc) values ($1,$2,$3);",
      [nTarjeta, fVencimiento, getID.rows[0]["idusuarioc"]]
    );
    let resCatalogo = [];
    resCatalogo = await getCatalogo();
    res.render("index", { variableSesion, resCatalogo });
  } else {
    res.render("agregar-metodo-pago", { variableSesion });
  }
});

/************************************************ COMPRA FINALIZADA ************************************************/
app.post("/compra-finalizada", async (req, res) => {
  if (enSesion) {
    //003
    //subida de pedido a la base de datos
    let { sesion, modeloAuto, precio, ntarjeta, fecha, place } = req.body;
    try {
      console.log(sesion, modeloAuto, precio, ntarjeta, fecha, place);
      const idUsuario = await pool.query(
        "select idusuarioc from usuarioComprador where correo=$1",
        [sesion]
      );

      const idproveedor = await pool.query(
        "select idproveedor from modelo where nombremodelo=$1",
        [modeloAuto]
      );

      const nsVehiculo = await pool.query(
        "select nsvehiculo from vehiculo where idcarmodelo = (select idcarmodelo from vehicar where precio = " +
          precio +
          " and idmodelo = (select idmodelo from modelo where nombremodelo = '" +
          modeloAuto +
          "'))"
      );
      const subida = await pool.query(
        "insert into compra(idusuarioc,idproveedor,nsvehiculo,ntarjeta,fechacompra,estatuscompra,idSucursal) values (" +
          idUsuario.rows[0]["idusuarioc"] +
          ", " +
          idproveedor.rows[0]["idproveedor"] +
          ", '" +
          nsVehiculo.rows[0]["nsvehiculo"] +
          "', '" +
          ntarjeta +
          "', '" +
          fecha +
          "', 'Por confirmar', ( select idsucursal from sucursal where direccionsucursal = '" +
          place +
          "'))"
      );
      const nodisp = await pool.query(
        "update vehiculo set disponibilidad = 'f' where nsvehiculo = '" +
          nsVehiculo.rows[0]["nsvehiculo"] +
          "'"
      );
      const actStock = await pool.query(
        "update vehicar set stock = (select stock from vehicar where idcarmodelo = (select idcarmodelo from vehiculo where nsvehiculo = '" +
          nsVehiculo.rows[0]["nsvehiculo"] +
          "'))-1 where idcarmodelo = (select idcarmodelo from vehiculo where nsvehiculo = '" +
          nsVehiculo.rows[0]["nsvehiculo"] +
          "')"
      );
    } catch (error) {
      console.log(error);
    }

    //redireccion
    res.render("compra-finalizada", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

app.get("/compra-finalizada", async (req, res) => {
  if (enSesion) {
    res.render("compra-finalizada", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

/************************************************ MAS VENDIDOS ************************************************/
app.get("/mas-vendidos", (req, res) => {
  res.render("mas-vendidos");
});

/************************************************ DESCRIPCION ************************************************/
app.post("/descripcion", async (req, res) => {
  console.log("post descirpcion llamada");
  let { modelo } = req.body;
  infoModelo = await getDetallesModelo(modelo);
  caracterizados = await getModelosCaracterizados(modelo);
  let tamanioCaracterizados = caracterizados.length;
  res.render("descripcion", {
    variableSesion,
    modelo,
    infoModelo,
    caracterizados,
    tamanioCaracterizados,
  });
});

app.get("/descripcion", async (req, res) => {
  res.render("descripcion", { variableSesion });
});
/**********************************VERIFICAR CORREO *************************************/
app.post("/verificar-correo", async (req, res) => {
  let { correo, codigoVerificacion } = req.body;
  const consultaCodigo = await pool.query(
    "select verificado from usuarioComprador where correo=$1",
    [correo]
  );
  var codigo = consultaCodigo.rows[0]["verificado"];
  console.log(codigo, codigoVerificacion);
  if (codigo === codigoVerificacion) {
    const updateVerificacion = await pool.query(
      "update usuariocomprador set verificado = 'ok' where correo = '" +
        correo +
        "'"
    );
    let resCatalogo = [];
    resCatalogo = await getCatalogo();
    res.render("index", { variableSesion, resCatalogo });
  } else {
    res.render("verificar-correo", { variableSesion });
  }
  return codigo;
});

/************************************************ INDEX ************************************************/
app.get("/index", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  res.render("index", { variableSesion, resCatalogo });
});

app.get("/mas-recientes", async (req, res) => {
  let resCatalogo = [];
  resCatalogo = await getCatalogoRecientes();
  console.log("Ingreso a mas recientes");
  res.render("mas-recientes", { variableSesion, resCatalogo });
});

app.post("/buscar", async (req, res) => {
  let { busqueda } = req.body;
  console.log(busqueda);
  let resCatalogo = [];
  resCatalogo = await getBusqueda(busqueda);
  res.render("index", { variableSesion, resCatalogo });
});

app.post("/index", async (req, res) => {
  console.log("Llamaste a post del index");
  let resCatalogo = [];
  resCatalogo = await getCatalogo();
  console.log("Nombre recibido del index es: " + nombre_carro);
  res.render("index", { variableSesion, resCatalogo });
});

/************************************************ CREAR CUENTA ************************************************/
app.get("/crear-cuenta", (req, res) => {
  res.render("crear-cuenta");
});

app.post("/crear-cuenta", async (req, res) => {
  let {
    nombre_registroPro,
    correoPro,
    numPro,
    contrasenaPro,
    confContrasenaPro,
    nombre_registro,
    apellidoPaterno,
    apellidoMaterno,
    correo,
    contrasena,
    confirmarContrasena,
  } = req.body;

  if (nombre_registroPro === undefined) {
    //usuario comprador
    const result = await pool.query(
      "select * from usuarioComprador where correo=$1",
      [correo]
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
        let result = "";
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
          user: "no.reply.isurusictu@gmail.com",
          pass: "12345678Mm*",
        },
      });
      let mailOptions = {
        from: "no.reply.isurusictu@gmail.com",
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

      res.render("verificar-correo", { variableSesion });
    } else {
      console.log("Usuario ya registrado");
      res.render("crear-cuenta");
    }
  } else {
    //usuario proveedor
    const result = await pool.query(
      "select * from usuarioproveedor where correo=$1",
      [correoPro]
    );

    console.log(result);

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
          user: "no.reply.isurusictu@gmail.com",
          pass: "12345678Mm*",
        },
      });
      let mailOptions = {
        from: "no.reply.isurusictu@gmail.com",
        to: correoPro,
        subject: "Código de verificación",
        text: "Su código de verificación es " + codigoVer,
      };

      console.log("Registrando usuario");
      const result = await pool.query(
        "INSERT INTO usuarioproveedor (telefonoup,nombreup,correo,clave) VALUES ($1, $2, $3, $4)",
        [numPro, nombre_registroPro, correoPro, contrasenaPro]
      );

      //subir el codigo de confirmacion a la base para despues
      //utilizarlo en la pantallad de verificacion y como parametro a validar
      //en el inicio de sesion
      const ver = pool.query(
        "update usuarioproveedor set verificado = '$1' where correo='$2'",
        [codigoVer, correoPro]
      );

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("RIP");
          console.log(err);
        } else {
          console.log("Si se mandó");
        }
      });

      res.render("verificar-correo", { variableSesion });
    } else {
      console.log("Usuario ya registrado");
      res.render("crear-cuenta");
    }
  }
});

/************************************************ INICIAR SESION ************************************************/
app.get("/iniciar-sesion", (req, res) => {
  res.render("iniciar-sesion", { variableSesion });
});

app.post("/iniciar-sesion", async (req, res) => {
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
      //validacion 001
      if (resVer != "ok") {
        console.log("Verificacion: " + resVer);
        res.render("verificar-correo", { variableSesion });
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
    const result = await pool.query(
      "select * from usuarioproveedor where correo=$1",
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
        "select verificado from usuarioproveedor where correo=$1",
        [entradaCorreo]
      );
      var resVer = JSON.parse(JSON.stringify(verif.rows[0]["verificado"]));
      if (myJSON === entradaContrasena) {
        variableSesion = result.rows[0].correo;
        enSesion = true;
        //validacion 001
        if (resVer != "ok") {
          console.log("Verificacion: " + resVer);
          res.render("verificar-correo", { variableSesion });
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

/************************************************ MODIFICAR DATOS DE LA CUENTA ************************************************/
app.get("/modificar-datos-de-usuario", async (req, res) => {
  //009
  if (enSesion) {
    res.render("modificar-datos-de-usuario", { variableSesion, datosCuenta });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});
//005
app.post("/modificar-datos-de-usuario", async (req, res) => {
  if (enSesion) {
    let { newpass } = req.body;
    console.log(datosCuenta["correo"], newpass);
    const updatePass = await pool.query(
      "update usuariocomprador set clave = '" +
        newpass +
        "' where correo='" +
        datosCuenta["correo"] +
        "'"
    );
    //proceso para recargar la pagina
    var dataUser = await pool.query(
      "select * from usuariocomprador where correo='" + variableSesion + "'"
    );
    var cuentas = await pool.query(
      "select * from metodopago where idusuarioc=(select idusuarioc from usuariocomprador where correo='" +
        variableSesion +
        "')"
    );
    datosCuenta = dataUser.rows[0];
    tarjetasCuenta = cuentas.rows;
    res.render("informacion-cuenta", {
      variableSesion,
      datosCuenta,
      tarjetasCuenta,
    });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

/************************************************ MODIFICAR DATOS DE LA CUENTA PROVEEDOR ************************************************/
app.get("/modificar-datos-de-proveedor", async (req, res) => {
  if (enSesion) {
    console.log(datosCuenta);
    res.render("modificar-datos-de-proveedor", { variableSesion, datosCuenta });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});

app.post("/modificar-datos-de-proveedor", async (req, res) => {
  if (enSesion) {
    console.log(datosCuenta);
    //res.render("modificar-datos-de-usuario", { variableSesion, datosCuenta });
    res.render("iniciar-sesion", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});
/************************************************ CONFIRMAR COMPRA ************************************************/

app.post("/confirmar-compra", async (req, res) => {
  if (!enSesion) {
    res.render("iniciar-sesion", { variableSesion });
  } else {
    let { idcarmodelo, modelo, precio } = req.body;
    console.log(idcarmodelo);
    var mpago = await getMetodosPago(variableSesion);
    var sucursal = await getSucursalesProveedor(idcarmodelo);
    console.log(modelo);
    res.render("confirmar-compra", {
      variableSesion,
      modelo,
      precio,
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
app.post("/informacion-cuenta", async (req, res) => {
  if (enSesion) {
    res.render("informacion-cuenta", { variableSesion });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});
//008
app.post("/eliminar-cuenta", async (req, res) => {
  console.log("quiero eliminar");
  if (enSesion) {
    let { cuenta } = req.body;
    const borrar = await pool.query(
      "delete from usuariocomprador where correo= '" + cuenta + "'"
    );
    variableSesion = null;
    let resCatalogo = [];
    resCatalogo = await getCatalogo();
    res.render("index", { variableSesion, resCatalogo });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});
//004
app.get("/informacion-cuenta", async (req, res) => {
  if (enSesion) {
    var dataUser = await pool.query(
      "select * from usuariocomprador where correo='" + variableSesion + "'"
    );
    if (dataUser.rowCount > 0) {
      // usuario comprador
      var cuentas = await pool.query(
        "select * from metodopago where idusuarioc=(select idusuarioc from usuariocomprador where correo='" +
          variableSesion +
          "')"
      );
      datosCuenta = dataUser.rows[0];
      tarjetasCuenta = cuentas.rows;
      res.render("informacion-cuenta", {
        variableSesion,
        datosCuenta,
        tarjetasCuenta,
      });
    } else {
      // usuario proveedor
      var dataUser = await pool.query(
        "select * from usuarioproveedor where correo='" + variableSesion + "';"
      );
      datosCuenta = dataUser.rows[0];
      console.log(datosCuenta);
      res.render("informacion-cuenta-proveedor", {
        variableSesion,
        datosCuenta,
      });
    }
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});
/************************************************ ELIMINAR METODO PAGO ************************************************/
app.post("/eliminar-mpago", async (req, res) => {
  //010
  if (enSesion) {
    let { tarjeta } = req.body;
    console.log(tarjeta);
    var delCard = await pool.query(
      "delete from metodopago where ntarjeta = '" + tarjeta + "'"
    );
    //proceso para recargar la pagina
    var dataUser = await pool.query(
      "select * from usuariocomprador where correo='" + variableSesion + "'"
    );
    var cuentas = await pool.query(
      "select * from metodopago where idusuarioc=(select idusuarioc from usuariocomprador where correo='" +
        variableSesion +
        "')"
    );
    datosCuenta = dataUser.rows[0];
    tarjetasCuenta = cuentas.rows;
    res.render("informacion-cuenta", {
      variableSesion,
      datosCuenta,
      tarjetasCuenta,
    });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});
/************************************************ CONSULTAR Y CANCELAR PEDIDO ************************************/
app.get("/consultar-compras", async (req, res) => {
  //006
  if (enSesion) {
    var compras = await pool.query(
      "select * from compra inner join usuarioproveedor on compra.idproveedor=usuarioproveedor.idproveedor inner join sucursal on compra.idsucursal = sucursal.idsucursal inner join vehiculo on compra.nsvehiculo = vehiculo.nsvehiculo inner join vehicar on vehiculo.idcarmodelo = vehicar.idcarmodelo inner join modelo on vehicar.idmodelo = modelo.idmodelo where idusuarioc = (select idusuarioc from usuariocomprador where correo = '" +
        variableSesion +
        "')"
    );
    var resultadoCompras = compras.rows;
    console.log(resultadoCompras);
    res.render("consultar-compras", { variableSesion, resultadoCompras });
  } else {
    res.render("iniciar-sesion", { variableSesion });
  }
});
app.post("/consultar-compras/cancelar", async (req, res) => {
  if (enSesion) {
    let { compra } = req.body;
    console.log(compra);

    //cambio de estado
    const sidisp = await pool.query(
      "update vehiculo set disponibilidad = 't' where nsvehiculo = (select nsvehiculo from compra where idcompra = " +
        compra +
        ")"
    );
    //actualizacion de stock
    const actStock = await pool.query(
      "update vehicar set stock = (select stock from vehicar where idcarmodelo = (select idcarmodelo from vehiculo where nsvehiculo = (select nsvehiculo from compra where idcompra = " +
        compra +
        ")))-1 where idcarmodelo = (select idcarmodelo from vehiculo where nsvehiculo = (select nsvehiculo from compra where idcompra = " +
        compra +
        "))"
    );
    //eliminacion de la compra
    const deleteCompra = await pool.query(
      "delete from compra where idcompra = " + compra + ""
    );

    //actualizacion de pagina
    var compras = await pool.query(
      "select * from compra inner join usuarioproveedor on compra.idproveedor=usuarioproveedor.idproveedor inner join sucursal on compra.idsucursal = sucursal.idsucursal inner join vehiculo on compra.nsvehiculo = vehiculo.nsvehiculo inner join vehicar on vehiculo.idcarmodelo = vehicar.idcarmodelo inner join modelo on vehicar.idmodelo = modelo.idmodelo where idusuarioc = (select idusuarioc from usuariocomprador where correo = '" +
        variableSesion +
        "')"
    );
    var resultadoCompras = compras.rows;
    res.render("consultar-compras", { variableSesion, resultadoCompras });
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

const validarTarjeta = async (nTarjeta, usuario) => {
  const validacion = await pool.query(
    "select ntarjeta from metodopago inner join usuariocomprador on metodopago.idusuarioc = usuariocomprador.idusuarioc where correo='" +
      usuario +
      "'"
  );
  console.log(validacion.rowCount);
  if (validacion.rowCount > 0) {
    return false;
  } else {
    return true;
  }
};

const getSucursalesProveedor = async (idcarmodelo) => {
  try {
    let sucursales = await pool.query(
      "select nombresucursal,direccionsucursal from sucursal inner join sucursalproveedor on sucursal.idsucursal = sucursalproveedor.idsucursal inner join usuarioproveedor on sucursalproveedor.idproveedor = usuarioproveedor.idproveedor inner join modelo on usuarioproveedor.idproveedor = modelo.idproveedor inner join vehicar on modelo.idmodelo = vehicar.idmodelo where idcarmodelo=$1",
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
        "select nombreModelo from modelo order by idmodelo asc;"
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

const getCatalogoRecientes = async () => {
  try {
    let veh = [];
    const resultVE = await pool.query("select count(*) from modelo;");
    var cantCatalogoE = JSON.parse(JSON.stringify(resultVE.rows[0]["count"]));
    console.log("Total de automóviles: " + cantCatalogoE);

    for (let i = 0; i < cantCatalogoE; i++) {
      const consNom = await pool.query(
        "select nombreModelo from modelo order by idmodelo desc;"
      );
      var nombre = JSON.parse(JSON.stringify(consNom.rows[i]["nombremodelo"]));
      const preM = await pool.query(
        "select min(precio) from vehicar where idmodelo=(select idModelo from modelo where nombremodelo='" +
          nombre +
          "');"
      );
      var precio = JSON.parse(JSON.stringify(preM.rows[0]["min"]));
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
//011
const getBusqueda = async (busqueda) => {
  //007
  try {
    let veh = [];
    const resultVE = await pool.query(
      "select count(*) from modelo where nombreModelo=" + busqueda + ";"
    );
    var cantCatalogoE = JSON.parse(JSON.stringify(resultVE.rows[0]["count"]));
    console.log("Total de automóviles: " + cantCatalogoE);

    // const resultVC = await pool.query("select count(*) from modeloCombustion");
    // var cantCatalogoC = JSON.parse(JSON.stringify(resultVC.rows[0]["count"]));
    // console.log("Combustión: " + cantCatalogoC);

    // var cantCatalogo = cantCatalogoC + cantCatalogoE;

    for (let i = 0; i < cantCatalogoE; i++) {
      const consNom = await pool.query(
        "select nombreModelo from modelo where nombreModelo=" +
          busqueda +
          " order by idmodelo asc;"
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
      "select idcarmodelo,precio,color,stock,descripcion from vehicar where idmodelo=(select idModelo from modelo where nombremodelo='" +
        modelo +
        "') order by precio asc;"
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
