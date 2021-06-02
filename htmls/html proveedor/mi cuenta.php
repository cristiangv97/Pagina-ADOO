<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mi cuenta</title>

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="../../css/personal.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js" referrerpolicy="no-referrer"></script>
    <script src="../../js/bootstrap.bundle.min.js"></script>
</head>





<body style="background-color: #c8c7c7">

    <?php ?>

<div class="container">

    <div class="col p-5 mx-auto col-lg-6 col-sm-10 m-3">
        <h3 class="p-2 text-center">Mi cuenta</h3>
        <form class="form-control form-control-lg" id="formulario-info-cuenta">
            <h5 class="p-2 text-center">DATOS DE SESIÓN</h5>

            <div class='mb-3'>
                <label for='nombre' class='form-label'>Nombre de la empresa</label>
                <input type='text' class='form-control' id='nombre' placeholder='Carros Mauricio'>
            </div>
              <div class='mb-3'>
                <label for='apellido' class='form-label'>Teléfono</label>
                <input type='text' class='form-control' id='nombre' placeholder='5558565841'>
            </div>
            <div class='mb-3'>
                <label for='correo' class='form-label'>Correo electrónico</label>
                <input type='text' class='form-control' id='correo'  placeholder='carrosMau@gmail.com'>
            </div>
            <div class='mb-3'>
                <label for='correo' class='form-label'>Contraseña</label>
                <input type='password' class='form-control' id='password'  placeholder='************'>
            </div>
             
            <div class='mb-3'>
                <a href='./modificar-cuenta-proveedor.html' class='btn btn-primary col-12 my-3' role='button'>Modificar información</a>
            </div>
            
            <h5 class="p-4 text-center">Cuentas bancarias</h5>

            <div class='mb-3'>
                <label for='numero-tarjeta' class='form-label'>Clabe #1</label>
                <input type='text' class='form-control' id='clabe1' placeholder='546765435465498749874'>
            </div>
            <div class='mb-3'>
                <label for='fecha-vencimiento' class='form-label'>Clabe #2</label>
                <input type='text' class='form-control' id='clabe2' placeholder='356441564151819265165'>
            </div>
            <div class="text-center">
                <a href='./modificar-cuentas-bancarias.html' class='btn btn-primary col-12 my-3' role='button'>Modificar cuentas</a>
            </div>

            <h5 class="p-4 text-center">Sucursales</h5>

            <div class='mb-3'>
                <label for='numero-tarjeta' class='form-label'>Sucursal #1</label>
                <input type='text' class='form-control' id='sucursal1' placeholder='Av. las Flores, GAM, 32434, CDMX'>
            </div>
            <div class='mb-3'>
                <label for='fecha-vencimiento' class='form-label'>Sucursal #2</label>
                <input type='text' class='form-control' id='sucursal2' placeholder='Avenida Siempreviva 742, CDMX'>
            </div>
            <div class="text-center">
                <a href='./modificar-sucursales-proveedor.html' class='btn btn-primary col-12 my-3' role='button'>Modificar direcciones</a>
            </div>
        </form>
    </div>
</div>





</div>
</body>
</html>