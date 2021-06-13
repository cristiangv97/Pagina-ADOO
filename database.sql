drop table if exists sucursal cascade;
drop table if exists sucursalProveedor;
drop table if exists cuentaBancaria;
drop table if exists usuarioProveedor cascade;
drop table if exists compra;
drop table if exists metodoPago cascade;
drop table if exists usuarioComprador cascade;
drop table if exists vehiculo;
drop table if exists modeloProveedor;
drop table if exists vehiCar cascade;
drop table if exists modelo;
----------------------------
--los campos aceptan null de momento SOLO para hacer las pruebas de incersiones
create table usuarioComprador(
	idUsuarioC serial primary key not null,
	nombreUC varchar(30) not null,
	apellidoMatUC varchar(30) not null,
	apellidoPatUC varchar(30) not null,
	correo varchar(50) not null,
	clave varchar(50) not null,
	verificado varchar(30) default 'not' not null
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
	verificado varchar(30) default 'not' not null
);
create table sucursal(
	idSucursal serial primary key not null,
	nombreSucursal varchar(30) not null,
	direccionSucursal varchar(250) not null
);
--relacion entre proveedores y sucursales
create table sucursalProveedor(
	idSucursalProveedor serial primary key not null,
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
--atributos que aceptan valores vacios solo para entorno de pruebas
create table modelo(
	idModelo serial primary key not null,
	tipoMotor boolean not null,
	nombreModelo varchar(30) not null,
	marcaModelo varchar(30) not null,
	versionModelo varchar(30) not null,
	anoModelo char(4) not null,
	descripcionModelo text not null,
	motorModelo varchar(30),
	kgMMA integer,
	capacidadMaletero integer,
	nPuertas integer,
	nPlazas integer,
	mAltura float,
	mAncho float,
	mDistanciaEjes float,
	coeficienteAerodinamico float,
	kmAutonomia integer,
	kgPeso integer,
	segAceleracion0a100 float,
	susDelantera varchar(30),
	susTrasera varchar(30),
	frenosDelanteros varchar(30),
	frenosTraseros varchar(30),
	neumaticos varchar(30),
	materialLlantas varchar(30),
	kwPotencia float,
	combustible varchar(30),
	nCilindros integer,
	cm3Cilindrada float,
	gkmEmisionCO2 float,
	tiempoCarga time,
	capacidadBateria float
);
create table modeloProveedor(
	idModeloProveedor serial primary key not null,
	idProveedor integer not null,
	idModelo integer not null,
	foreign key (idProveedor) references usuarioProveedor(idProveedor) on delete cascade,
	foreign key (idModelo) references modelo(idModelo) on delete cascade
);
--modelos de autos electricos y sus proveedores
--atributos que aceptan valores vacios solo para entorno de pruebas

--vehiculos caracterizados
create table vehiCar(
	idCarModelo serial primary key not null,
	precio float not null,
	idModelo integer not null,
	foreign key (idModelo) references modelo(idModelo) on delete cascade
);
--tabla que contiene a cada vehiculo individual con su ns
create table vehiculo(
	nsVehiculo varchar(40) primary key not null,
	idCarModelo integer not null,
	foreign key (idCarModelo) references vehiCar(idCarModelo)
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
INSERT INTO usuarioComprador (nombreUC,apellidoMAtUC,apellidoPAtUC,correo, clave,verificado)
VALUES ('Usuario','apelMat','apelPat','a@a.com','1234567','verCode');
INSERT INTO modelo(tipoMotor,nombreModelo,marcaModelo,versionModelo,anoModelo,descripcionModelo,motorModelo)
VALUES (false,'Mazda 1','Sedán','Sport','2021','Está muy chulo jsjsjs','2.5L Skyactiv-G'),
(false,'Mazda 2','Sedán','Sport','2019','Está muy chulo x2 jsjsjs','2.5L Skyactiv-G'),
(true,'Mazda 3','Sedán','Eco','2017','Está muy chulo x3 jsjsjs','4L Skyactiv-T'),
(false,'Mazda 4','Sedán','Sport','2020','Está muy chulo x4 jsjsjs','2.5L Skyactiv-G'),
(true,'Mazda 5','Sedán','Sport','2015','Está muy chulo x5 jsjsjs','4L Skyactiv-G'),
(true,'Mazda 6','Sedán','Sport','2018','Está muy chulo x6 jsjsjs','2.5L Skyactiv-G'),
(true,'Mazda 7','Sedán','Sport','2021','Está muy chulo x7 jsjsjs','4L Skyactiv-G');
--se deben insertar valores en los vehiculos caracterizados,
--por tanto, la siguiente insercion estaria parcialmente completa
insert into vehiCar(idModelo,precio) values 
(1,.1),(1,.2),(1,.3),
(2,.1),(2,.2),(2,.3),
(3,.1),(3,.2),(3,.3),
(4,.1),(4,.2),(4,.3),
(5,.1),(5,.2),(5,.3),
(6,.1),(6,.2),(6,.3),
(7,.1),(7,.2),(7,.3);
------------------------------------------
select idmodelo,nombremodelo from modelo;
--select min(precio) from vehicarc,vehicare where 
--vehicarc.idmodeloc=(select idModeloC from modelocombustion where nombremodelo='Mazda 1') 
--or vehicare.idmodeloe=(select idModeloE from modeloelectrico where nombremodelo='Mazda 1');