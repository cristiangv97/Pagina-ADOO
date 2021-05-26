function checarUsuario() {
    var x = document.getElementById("tipo-usuario").value;
    if (x === "Cliente"){
        formularioCliente();
    }
    else{
        formularioProveedor();
    }

}

function formularioCliente(){
    document.getElementById("formulario-registro").innerHTML = "\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='entrada-nombre' class='form-label'>Nombre/s</label>\n" +
        "        <input type='text' class='form-control' id='entrada-nombre' placeholder='Julian'>\n" +
        "      </div>\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='entrada-apellidos' class='form-label'>Apellidos</label>\n" +
        "        <input type='text' class='form-control' id='entrada-apellidos' placeholder='Alvarez'>\n" +
        "      </div>\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='exampleInputEmail1' class='form-label'>Email address</label>\n" +
        "        <input type='email' class='form-control' id='exampleInputEmail1' aria-describedby='emailHelp'>\n" +
        "      </div>\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='entrada-contrasena' class='form-label'>Contraseña</label>\n" +
        "        <input type='password' class='form-control' id='entrada-contrasena'>\n" +
        "      </div>\n" +
        "      <a href='index.html' class='btn btn-primary col-12' role='button'>Registrarse</a>\n" +
        "      <button type='submit' class='btn btn-primary col-12'>Registrarse <em>(Validaciones)</em></button>";
}

function formularioProveedor(){
    document.getElementById("formulario-registro").innerHTML = "Completar con formulario de proveedor";
}