function cambiarColor() {
    var x = document.getElementById("color-vehiculo-usuario").value;
    if (x === "blanco"){
        vehiculoBlanco();
    }
    else if (x == "rojo"){
        vehiculoRojo();
    }
    else if (x == "verde"){
        vehiculoVerde();
    }

}

function vehiculoBlanco(){
    document.getElementById("vehiculo-personalizacion").src = 'imgs/carro-6.png';
}
function vehiculoRojo(){
    document.getElementById("vehiculo-personalizacion").src = 'imgs/carro-6-rojo.png';
}
function vehiculoVerde(){
    document.getElementById("vehiculo-personalizacion").src = 'imgs/carro-6-verde.png';
}

function enCarga(){
    vehiculoBlanco();
}