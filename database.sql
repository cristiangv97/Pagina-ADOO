drop table if exists sucursal cascade;
drop table if exists sucursalProveedor;
drop table if exists cuentaBancaria;
drop table if exists usuarioProveedor cascade;
drop table if exists compra;
drop table if exists metodoPago cascade;
drop table if exists usuarioComprador cascade;
drop table if exists vehiculo;
drop table if exists modeloProveedorC;
drop table if exists vehiCarC cascade;
drop table if exists modeloProveedorE;
drop table if exists vehiCarE cascade;
drop table if exists modeloCombustion;
drop table if exists modeloElectrico;
----------------------------
--los campos aceptan null de momento SOLO para hacer las pruebas de incersiones
create table usuarioComprador(
	idUsuarioC serial primary key not null,
	nombreUC varchar(30) not null,
	apellidoMatUC varchar(30) not null,
	apellidoPatUC varchar(30) not null,
	correo varchar(50) not null,
	clave varchar(50) not null,
	verificado boolean default false not null
);
create table metodoPago(
	nTarjeta varchar(16) primary key not null,
	fechaVencimiento date not null,
	idUsuarioC integer not null,
	foreign key (idUsuarioC) references usuarioComprador(idUsuarioC) on delete cascade
);
create table usuarioProveedor(
	idProveedor serial primary key not null,
	telefonoUP varchar(10),
	nombreUP varchar(30),
	correo varchar(30) not null,
	clave varchar(30) not null,
	verificado boolean default false not null
);
create table sucursal(
	idSucursal serial primary key not null,
	nombreSucursal varchar(30) not null,
	direccionSucursal varchar(250) not null
);
--relacion entre proveedores y sucursales
create table sucursalProveedor(
	idSucursalProveedor varchar(10) primary key not null,
	idSucursal integer not null,
	idProveedor integer not null,
	foreign key (idSucursal) references sucursal(idSucursal) on delete cascade,
	foreign key (idProveedor) references usuarioProveedor(idProveedor) on delete cascade
);
create table cuentaBancaria(
	idClabe integer primary key not null,
	nombreBanco varchar(30) not null,
	idProveedor integer not null,
	foreign key (idProveedor) references usuarioProveedor(idProveedor) on delete cascade
);
--modelos de autos de combustion y sus proveedores
create table modeloCombustion(
	idModeloC serial primary key not null,
	nombreModelo varchar(30) not null,
	marcaModelo varchar(30) not null,
	versionModelo varchar(30) not null,
	anoModelo char(4) not null,
	descripcionModelo text not null,
	motor varchar(30) not null,
	kgMMA integer not null,
	capacidadMaletero integer not null,
	nPuertas integer not null,
	nPlazas integer not null,
	mAltura float not null,
	mAncho float not null,
	mDistanciaEjes float not null,
	coeficienteAerodinamico float not null,
	kmAutonomia integer not null,
	kgPeso integer not null,
	segAceleracion0a100 float not null,
	susDelantera varchar(30) not null,
	susTrasera varchar(30) not null,
	frenosDelanteros varchar(30) not null,
	frenosTraseros varchar(30) not null,
	neumaticos varchar(30) not null,
	materialLlantas varchar(30) not null,
	tipoMotor varchar(30) not null,
	kwPotencia float not null,
	combustible varchar(30),
	nCilindros integer not null,
	cm3Cilindrada float not null,
	gkmEmisionCO2 float not null
);
create table modeloProveedorC(
	idModeloProveedorC varchar(10) primary key not null,
	idProveedor integer not null,
	idModeloC integer not null,
	foreign key (idProveedor) references usuarioProveedor(idProveedor) on delete cascade,
	foreign key (idModeloC) references modeloCombustion(idModeloC) on delete cascade
);
--modelos de autos electricos y sus proveedores
create table modeloElectrico(
	idModeloE serial primary key not null,
	nombreModelo varchar(30) not null,
	marcaModelo varchar(30) not null,
	versionModelo varchar(30) not null,
	anoModelo char(4) not null,
	descripcionModelo text not null,
	motor varchar(30) not null,
	kgMMA integer not null,
	capacidadMaletero integer not null,
	nPuertas integer not null,
	nPlazas integer not null,
	mAltura float not null,
	mAncho float not null,
	mDistanciaEjes float not null,
	coeficienteAerodinamico float not null,
	kmAutonomia integer not null,
	kgPeso integer not null,
	segAceleracion0a100 float not null,
	susDelantera varchar(30) not null,
	susTrasera varchar(30) not null,
	frenosDelanteros varchar(30) not null,
	frenosTraseros varchar(30) not null,
	neumaticos varchar(30) not null,
	materialLlantas varchar(30) not null,
	kwPotencia float not null,
	tipoMotor varchar(30) not null,
	kwhCapacidadBateria float not null,
	hTiempoCarga time not null
);
create table modeloProveedorE(
	idModeloProveedorE varchar(10) primary key not null,
	idProveedor integer not null,
	idModeloE integer not null,
	foreign key (idProveedor) references usuarioProveedor(idProveedor) on delete cascade,
	foreign key (idModeloE) references modeloElectrico(idModeloE) on delete cascade
);
--vehiculos caracterizados
create table vehiCarC(
	idCarCombustion varchar(10) primary key not null,
	precio float not null,
	idModeloC integer not null,
	foreign key (idModeloC) references modeloCombustion(idModeloC) on delete cascade
);
create table vehiCarE(
	idCarElectrico varchar(10) primary key not null,
	precio float not null,
	idModeloE integer not null,
	foreign key (idModeloE) references modeloElectrico(idModeloE) on delete cascade
);
--tabla que contiene a cada vehiculo individual con su ns
create table vehiculo(
	nsVehiculo varchar(40) primary key not null,
	idCarCombustion varchar(10) not null,
	idCarElectrico varchar(10) not null,
	foreign key (idCarCombustion) references vehiCarC(idCarCombustion),
	foreign key (idCarElectrico) references vehiCarE(idCarElectrico)
);
create table compra(
	idCompra serial primary key not null,
	fechaEntrega date not null,
	fechaCompra date not null,
	estatusCompra varchar(30) not null,
	idUsuarioC integer not null,
	idProveedor integer not null,
	nsVehiculo varchar(40) not null,
	nTarjeta varchar(16) not null,
	foreign key (idUsuarioC) references usuarioComprador(idUsuarioC) on delete cascade,
	foreign key (idProveedor) references usuarioProveedor(idProveedor),
	foreign key (nsVehiculo) references vehiculo(nsVehiculo),
	foreign key (nTarjeta) references metodoPago(nTarjeta)
);
-----------------------------------------
INSERT INTO usuarioComprador (nombreUC,apellidoMAtUC,apellidoPAtUC,correo, clave)
VALUES ('Usuario','apelMat','apelPat','a@a.com','1234567');
--INSERT INTO modeloCombustion(modelo,marca,versionModelo,anoModelo,descripcionModelo,motorModelo)
VALUES ('Mazda 1','Sedán','Sport','2021','Está muy chulo jsjsjs','2.5L Skyactiv-G'),
('Mazda 2','Sedán','Sport','2019','Está muy chulo x2 jsjsjs','2.5L Skyactiv-G'),
('Mazda 3','Sedán','Eco','2017','Está muy chulo x3 jsjsjs','4L Skyactiv-T'),
('Mazda 4','Sedán','Sport','2020','Está muy chulo x4 jsjsjs','2.5L Skyactiv-G'),
('Mazda 5','Sedán','Sport','2015','Está muy chulo x5 jsjsjs','4L Skyactiv-G'),
('Mazda 6','Sedán','Sport','2018','Está muy chulo x6 jsjsjs','2.5L Skyactiv-G'),
('Mazda 7','Sedán','Sport','2021','Está muy chulo x7 jsjsjs','4L Skyactiv-G');
------------------------------------------
select * from modeloCombustion;