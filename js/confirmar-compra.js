function cambiarTarjeta(){
    var metodoPago = document.getElementById("num-metodo-pago").value;
    if (metodoPago === "metodo-1"){
        document.getElementById("display-metodo-pago").innerHTML = "**** **** **** 5588";
    }
    else if (metodoPago === "metodo-2"){
        document.getElementById("display-metodo-pago").innerHTML = "**** **** **** 6548";
    }
}

function cambiarDireccion(){
    var direccionSucursal = document.getElementById("direccion-sucursal").value;
    if (direccionSucursal === "sucursal-1"){
        document.getElementById("display-direccion").innerHTML = "ESCOM IPN, Unidad Profesional Adolfo López Mateos, 07320.";
    }
    else if (direccionSucursal === "sucursal-2"){
        document.getElementById("display-direccion").innerHTML = "Av. Wilfrido Massieu s/n, Nueva Industrial Vallejo, Gustavo A. Madero, 07738.";
    }
    else if (direccionSucursal === "sucursal-3"){
        document.getElementById("display-direccion").innerHTML = "Av. IPN s/n, Col. San Pedro Zacatenco, 07738 Gustavo A. Madero.";
    }
    else{
        document.getElementById("display-direccion").innerHTML = "Lindavista Nte., Gustavo A. Madero, 07738 Ciudad de México, CDMX";
    }
}