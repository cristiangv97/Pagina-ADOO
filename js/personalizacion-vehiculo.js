let precioColor = 180;
let precioRines = 10;
let precioFinal;

function cambiarColor() {
    var color = document.getElementById("color-vehiculo-usuario").value;
    if (color === "blanco"){
        precioColor = vehiculoBlanco();
    }
    else if (color === "rojo"){
        precioColor = vehiculoRojo();
    }
    else if (color === "verde"){
        vehiculoVerde();
        precioColor = vehiculoVerde();
    }
    calculoPrecio();
}

function vehiculoBlanco(){
    document.getElementById("vehiculo-personalizacion").src = 'imgs/carro-6.png';
    return 170;
}
function vehiculoRojo(){
    document.getElementById("vehiculo-personalizacion").src = 'imgs/carro-6-rojo.png';
    return 190;
}
function vehiculoVerde(){
    document.getElementById("vehiculo-personalizacion").src = 'imgs/carro-6-verde.png';
    return 195;
}

function cambiarRines() {
    var rines = document.getElementById("rines-vehiculo-usuario").value;
    if (rines === "normales") {
        precioRines = 10;
    } else if (rines === "progresivos") {
        precioRines = 15;
    } else if (rines === "concavos") {
        precioRines = 20;
    }
    calculoPrecio();
}

function calculoPrecio(){
    precioFinal = precioRines + precioColor;
    document.getElementById("precio-personalizacion").innerHTML = "Precio final: $"+precioFinal+", 000.00";
}