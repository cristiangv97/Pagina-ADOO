function checarMotor() {
    var tipoMotor = document.getElementById("tipo-carro").value;
    if (tipoMotor === "Combustión"){
        formularioCombustion();
    }else{
        formularioElectrico();
    }
}

function formularioCombustion(){
    document.getElementById("publicar-automovil-4").innerHTML = "<div class=\"mb-1\">\n" + 
    "<div class='mb-3'>\n" + 
    "   <label for='motor' class='form-label'>Motor</label>\n" + 
    "   <input type='text' class='form-control' id='motor' placeholder='Ejemplo: V 8 Couple'>\n" + 
    "</div>\n" +
    "<div class='mb-3'>\n" +
      "<label for='tipo-motor' class='form-label'>Tipo de motor</label>\n" + 
      "<input type='text' class='form-control' id='tipo-motor' placeholder='Ejemplo: V'> \n" + 
    "</div>\n"+
  "<div class='mb-1'>\n"+
    "<label for='no-cilindros' class='form-label'>Número de cilindros</label> \n"+
      "<input type='text' class='form-control' id='no-cilindros' placeholder='Ejemplo: 8'>\n"+
     "<label for='cilindrada' class='form-label'>Clindrada cm^3</label>\n"+
      "<input type='text' class='form-control' id='cilindrada' placeholder='Ejemplo: 3855'>\n"+
  "</div>\n"+
   "<div class='mb-3'>\n"+
       "<label for='potencia' class='form-label'>Potencia (kW)</label>\n"+
      "<input type='text' class='form-control' id='potencia' placeholder='Ejemplo: 456'>\n"+
     "<label for='distancia-ejes' class='form-label'>Emisiones de CO2 (g/km)</label>\n"+
      "<input type='text' class='form-control' id='distancia-ejes' placeholder='Ejemplo: 150'>\n"+
  "</div>\n"+

  "<div class=\"row text-center mt-5\">\n"+
      "<div class=\"col\"><a href='./publicar-automovil-3.html' class='btn btn-primary w-100' role='button'>Atras</a></div>\n"+
      "<div class=\"col\"><button type=\"button\" class=\"btn btn-danger w-100\" data-bs-toggle=\"modal\" data-bs-target= '#cancelarPublicacion'>Cancelar</button></div>\n"+
      "<div class=\"col\"><a href='./publicar-automovil-5.html' class='btn btn-primary w-100' role='button'>Siguiente</a>   </div>\n"+
  "</div>\n"
}

function formularioElectrico(){
    document.getElementById("publicar-automovil-4").innerHTML = 
    "<div class='mb-3'>\n"+
    "<label for='motor' class='form-label '>Motor</label>\n"+
    "<input type='text' class='form-control' id='motor' placeholder='Ejemplo: XeroXtreme'> \n"+
    "</div>\n"+
    "<div class='mb-3'>\n"+
    "<label for='tipo-motor' class='form-label '>Tipo de motor</label>\n"+
    "<input type='text' class='form-control' id='tipo-motor' placeholder='Ejemplo: Síncrono de imanes permanentes'> \n"+
    "</div>\n"+
    "<div class='mb-3'>\n"+
    "<label for='potencia' class='form-label '>Potencia (kW)</label>\n"+
    "<input type='text' class='form-control' id='potencia' placeholder='Ejemplo: 456'>\n "+
    "</div>\n"+
    "<div class='mb-3'>\n"+
    "<label for='capacidad-bateria' class='form-label '>Capacidad de bateria (KWh)</label>\n"+
    "<input type='text' class='form-control' id='capacidad-bateria' placeholder='Ejemplo: 356'> \n"+
    "</div>\n"+
    "<div class='mb-3'>\n"+
    "<label for='tiempo-carga' class='form-label '>Tiempo de carga de la bateria (hr)</label>\n"+
    "<input type='text' class='form-control' id='tiempo-carga' placeholder='Ejemplo: 1.5'>\n "+
    "</div>\n"+
    "<div class=\"row text-center mt-5\">\n"+
    "<div class=\"col\">\n"+
    "<a href='./publicar-automovil-3.html' class='btn btn-primary w-100' role='button'>Atras</a>\n"+
    "</div>\n"+
    "<div class=\"col\">\n"+
    "<button type=\"button\" class=\"btn btn-danger w-100\" data-bs-toggle=\"modal\" data-bs-target=\"#cancelarPublicacion\">Cancelar</button>\n"+
    "</div>\n"+
    "<div class=\"col\">\n"+
    "<a href='./publicar-automovil-5.html' class='btn btn-primary w-100' role='button'>Siguiente</a>\n"+
    "</div>"
}