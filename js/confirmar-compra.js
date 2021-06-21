function cambiarTarjeta() {
  var cant = document.getElementById("num-metodo-pago").options.length;
  var term = [cant];
  var select = [cant];
  for (let i = 0; i < cant; i++) {
    term[i] = document.getElementById("tarjeta-" + i).value;
    select[i] = document.getElementById("seleccion-" + i).value;
  }
  var metodoPago = document.getElementById("num-metodo-pago").value[7];
  document.getElementById("display-metodo-pago").innerHTML =
    "**** **** **** " + term[metodoPago - 1];
  //ntarjeta y valores desde seleccion-1
  document.getElementById("ntarjeta").value = select[metodoPago - 1];
  //alert("Tarjeta seleccionada" + document.getElementById("ntarjeta").value);
}

function cambiarDireccion() {
  var cant = document.getElementById("direccion-sucursal").options.length;
  var term = [cant];
  for (let i = 0; i < cant; i++) {
    term[i] = document.getElementById("direccion-" + i).value;
  }
  var direccionSucursal =
    document.getElementById("direccion-sucursal").value[9];
  document.getElementById("displaydir").innerHTML = term[direccionSucursal - 1];
}
