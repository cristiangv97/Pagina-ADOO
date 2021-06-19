function cambiarTarjeta() {
  var cant = document.getElementById("num-metodo-pago").options.length;
  var term = [cant];
  for (let i = 0; i < cant; i++) {
    term[i] = document.getElementById("tarjeta-" + i).value;
  }
  var metodoPago = document.getElementById("num-metodo-pago").value[7];
  document.getElementById("display-metodo-pago").innerHTML =
    "**** **** **** " + term[metodoPago - 1];
  document.getElementById("elegido").innerHTML = document.getElementById(
    "opcion-" + (metodoPago - 1) + ""
  ).value;
}

function cambiarDireccion() {
  var cant = document.getElementById("direccion-sucursal").options.length;
  var term = [cant];
  for (let i = 0; i < cant; i++) {
    term[i] = document.getElementById("direccion-" + i).value;
  }
  var direccionSucursal =
    document.getElementById("direccion-sucursal").value[9];
  document.getElementById("display-direccion").innerHTML =
    term[direccionSucursal - 1];
  document.getElementById("entrega").innerHTML =
    document.getElementById("display-direccion").value;
}
