function cambiarTarjeta(){
    var metodoPago = document.getElementById("num-metodo-pago").value;
    if (metodoPago === "metodo-1"){
        document.getElementById("display-metodo-pago").innerHTML = "**** **** **** 5588";
    }
    else if (metodoPago === "metodo-2"){
        document.getElementById("display-metodo-pago").innerHTML = "**** **** **** 6548";
    }
}