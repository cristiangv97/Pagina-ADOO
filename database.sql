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
	susDelantera varchar(60),
	susTrasera varchar(60),
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
--distancia entre ejes es lo mismo que el término "batalla"
--diesel es lo mismo que gasoloeo
--capacidad de la bateria en kWh	
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
	color varchar(12) not null,
	stock integer not null,
	descripcion varchar(150) not null,
	idModelo integer not null,
	foreign key (idModelo) references modelo(idModelo) on delete cascade
);
--tabla que contiene a cada vehiculo individual con su ns
create table vehiculo(
	nsVehiculo varchar(17) primary key not null,
	idCarModelo integer not null,
	disponibilidad boolean not null set default true,
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
VALUES ('Usuario','apelMat','apelPat','a@a.com','1234','ok');
insert into metodoPago(idUsuarioC, nTarjeta, fechaVencimiento)
values (1,'1234123412341111','11/11/2021'),
(1,'1234123412342222','11/11/2022'),
(1,'1234123412343333','11/11/2023'),
(1,'1234123412344444','11/11/2024');
insert into usuarioProveedor (telefonoUP,nombreUP,correo,clave,verificado)
values ('1234567890','Proveedor','p@p.com','1234','ok');
insert into sucursal (nombreSucursal,direccionSucursal)
values ('Vallejo','Algun lugar sobre Vallejo'),
('Lindavista','Algun lugar sobre Lindavista'),
('Polanco','Algun lugar dentro de polanco'),
('Chapultepec','Algun lugar cerca de chapultepec'),
('Tezozomoc','Algun lugar cerca del deportivo Tezozomoc');
insert into sucursalProveedor (idSucursal,idProveedor) values (1,1),(3,1),(5,1);
INSERT INTO modelo(tipoMotor,nombreModelo,marcaModelo,versionModelo,anoModelo,descripcionModelo,motorModelo)
VALUES (false,'Mazda 1','Sedán','Sport','2021','Está muy chulo jsjsjs','2.5L Skyactiv-G'),
(false,'Mazda 2','Sedán','Sport','2019','Está muy chulo x2 jsjsjs','2.5L Skyactiv-G'),
(true,'Mazda 3','Sedán','Eco','2017','Está muy chulo x3 jsjsjs','4L Skyactiv-T'),
(false,'Mazda 4','Sedán','Sport','2020','Está muy chulo x4 jsjsjs','2.5L Skyactiv-G'),
(true,'Mazda 5','Sedán','Sport','2015','Está muy chulo x5 jsjsjs','4L Skyactiv-G'),
(true,'Mazda 6','Sedán','Sport','2018','Está muy chulo x6 jsjsjs','2.5L Skyactiv-G'),
(true,'Mazda 7','Sedán','Sport','2021','Está muy chulo x7 jsjsjs','4L Skyactiv-G');
insert into modeloProveedor (idProveedor,idmodelo) values (1,1),(1,3),(1,5),(1,7);
--se deben insertar valores en los vehiculos caracterizados,
--por tanto, la siguiente insercion estaria parcialmente completa
insert into vehiCar(idModelo,precio,color,stock,descripcion) values 
(1,.1,'rojo',10,'desc'),(1,.2,'plateado',5,'desc'),(1,.3,'blanco',1,'desc'),
(2,.1,'rojo',10,'desc'),(2,.2,'plateado',5,'desc'),(2,.3,'blanco',1,'desc'),
(3,.1,'rojo',10,'desc'),(3,.2,'plateado',5,'desc'),(3,.3,'blanco',0,'desc'),
(4,.1,'rojo',10,'desc'),(4,.2,'plateado',5,'desc'),(4,.3,'blanco',1,'desc'),
(5,.1,'rojo',10,'desc'),(5,.2,'plateado',5,'desc'),(5,.3,'blanco',1,'desc'),
(6,.1,'rojo',10,'desc'),(6,.2,'plateado',5,'desc'),(6,.3,'blanco',1,'desc'),
(7,.1,'rojo',10,'desc'),(7,.2,'plateado',5,'desc'),(7,.3,'blanco',1,'desc');
--vehiculos individuales
insert into vehiculo(nsVehiculo,idCarModelo) values
(12341234512345612,1),(12341234512345624,1),(12341234512345636,1)
------------------------------------------
INSERT INTO modelo(marcaModelo,nombreModelo,versionModelo,anoModelo,motorModelo,tipoMotor,kgMMA,capacidadMaletero,nPuertas,nPlazas,mAltura,mAncho,mDistanciaEjes,coeficienteAerodinamico,kmAutonomia,kgPeso,segAceleracion0a100,susDelantera,susTrasera,frenosDelanteros,frenosTraseros,neumaticos,materialLlantas,kwPotencia,combustible,nCilindros,cm3Cilindrada,gkmEmisionCO2,tiempoCarga,capacidadBateria,descripcionModelo) Values
('Ford', 'Ranger', 'Double Cab 4x4', 2016, '2.2 TDCi 160HP', true, 3985.26, 965, 4, 5, 1.815, 1.86, 3.22, 0.75, 1126, 2177, 11.8, 'Coil springs.', 'Beam axle.', 'Disco ventilado (302 mm)', 'Tambor (295 mm)', '255/70 R16', 'Alumino', 118, 'diesel', 4, 2198, 185, null, null, ' '),
('Ford', 'Fiesta 8', '3-doors  ST-Line', 2017, '1.0 EcoBoost 100HP', true, 1989.52, 292, 3, 5, 1.466, 1.735, 2.493, 0.83, 976, 1144, 10.5, 'McPherson struts. Coil springs.', 'Coil springs. Torsion bar.', 'Disco ventilado (262 mm)', 'Tambor (203 mm)', '205/45 R17', 'Acero', 74, 'gasolina', 3, 999, 97, null, null, ' '),
('Ford', 'Escape', 'Ecoboost', 2020, 'Ecoboost 1.5-Litre', true, 2604.89, 948, 5, 5, 1.679, 1.882, 2.71, 0.91, 667, 1576, 9.2, 'MacPherson Strut', 'Multi-Link', 'Disco ventilado (320 mm)', 'Disco (280 mm)', '225/65 R17', 'Magnesio', 135, 'gasolina', 3, 1497, 140, null, null, ' '),
('Ford', 'Mustang 6', 'Convertible', 2018, '2.3 EcoBoos', true, 2792.22, 332, 2, 4, 1.396, 1.915, 2.72, 0.85, 648, 1699, 6.5, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Multilink. Coil Springs. Anti-roll bar.', 'Disco ventilado', 'Disco', '255/40 R19', 'Alumino', 213, 'gasolina', 4, 2253, 179, null, null, ' '),
('Mazda', 'CX-3', '', 2019, 'SkyActiv-G 120', true, 2009.2, 1260, 5, 5, 1.535, 1.535, 2.57, 0.78, 774, 1159, 9, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Semi-independent. Coil Springs. Anti-roll bar.', 'Disco ventilado ( 295 mm)', 'Disco ( 281 mm)', '215/60 R16', 'Acero', 89, 'gasolina', 4, 1998, 141, null, null, ' '),
('Mazda', '3', 'BP', 2021, '2.0 e-SkyActiv G 150', true, 2146.94, 1019, 5, 5, 1.44, 1.795, 2.725, 0.93, 910, 1249, 9.1, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Semi-independent. Coil Springs. Anti-roll bar.', 'Disco ventilado ( 295 mm)', 'Disco ( 265 mm)', '215/45 R18', 'Magnesio', 110, 'gasolina', 4, 1998, 128, null, null, ' '),
('Mazda', 'MX 5 Miata', 'ND', 2021, 'RF 1.5 SkyActiv-G 132', true, 1611.79, 130, 2, 2, 1.225, 1.735, 2.31, 0.94, 793, 1005, 8.6, 'Independent Double Wishbones. Coil Springs. Anti-roll bar.', 'Multilink. Coil Springs. Anti-roll bar.', 'Disco ventilado ( 258 mm)', 'Disco ( 255 mm)', '195/50 R16', 'Alumino', 97, 'gasolina', 4, 1496, 142, null, null, ' '),
('Mazda', '6', 'MY17 Wagon', 2021, '2.5 SkyActiv-G 194', true, 2500.74, 1648, 5, 5, 1.48, 1.84, 2.75, 0.75, 911, 1441, 8.1, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Multilink. Coil Springs. Anti-roll bar.', 'Disco ventilado ( 297 mm)', 'Disco ( 278 mm)', '225/45 R19', 'Acero', 143, 'gasolina', 4, 2488, 172, null, null, ' '),
('Audi', 'e-tron', 'GT', 2021, 'e-tron', false, 3414.73, 405, 5, 5, 1.396, 1.964, 2.9, 0.83, 488, 2251, 4.1, 'Independent Double Wishbones. Coil Springs. Anti-roll bar.', 'Multilink. Coil Springs. Anti-roll bar.', 'Disco ventilado', 'Disco', '225/55 R19', 'Magnesio', 350, 'electricidad', null, null, 0, '09:20', 93.4, ' '),
('Audi', 'A4', 'B9', 2020, '40 TFSI', true, 2412.61, 965, 4, 5, 1.431, 1.847, 2.82, 0.85, 964, 1460, 7.1, 'Multilink. Coil Springs. Anti-roll bar.', 'Multilink. Coil Springs. Anti-roll bar.', 'Disco ventilado', 'Disco', '225/50 R17', 'Alumino', 150, 'gasolina', 4, 1984, 128, null, null, ' '),
('Audi', 'A1', 'GB Sportback', 2021, '30 TFSI', true, 1939.23, 1090, 5, 4, 1.433, 1.74, 2.563, 0.75, 754, 1080, 10.5, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Semi-independent. Coil Springs. Anti-roll bar.', 'Disco ventilado', 'Disco', '185/65 R15', 'Acero', 81, 'gasolina', 3, 999, 121, null, null, ' '),
('Audi', 'A7', 'Sportback C8', 2021, '40 TFSI', true, 2955.34, 1390, 5, 4, 1.422, 1.908, 2.926, 0.78, 875, 1665, 8.4, 'Multilink. Coil Springs. Anti-roll bar.', 'Multilink. Coil Springs. Anti-roll bar.', 'Disco ventilado', 'Disco', '255/55 R18', 'Magnesio', 150, 'gasolina', 4, 1984, 163, null, null, ' '),
('Nissan', 'Juke', 'F16', 2020, 'DIG-T 114 Auto', true, 1791.04, 1305, 5, 5, 1.595, 1.8, 2.636, 0.99, 920, 1186, 11.8, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Semi-independent. Coil Springs. Anti-roll bar.', 'Disco ventilado', 'Disco', '215/60 R17', 'Alumino', 84, 'gasolina', 3, 999, 114, null, null, ' '),
('Nissan', 'Micra', 'K14', 2020, 'I-GT 92 Auto', true, 1784.06, 1004, 5, 5, 1.454, 1.743, 2.525, 0.76, 672, 1055, 14, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Semi-independent. Coil Springs. Anti-roll bar.', 'Disco', 'Tambor', '185/65 R15', 'Acero', 68, 'gasolina', 3, 999, 138, null, null, ' '),
('Nissan', 'Rogue', 'AWD', 2020, 'PR25DD', true, 2613.45, 895, 5, 5, 1.689, 1.839, 2.705, 0.33, 679, 1585, 9.3, 'Independent strut w/ coil springs. Stabilizer bar (24.2 mm)', 'Independent multi-link. Stabilizer bar (27.5 mm)', 'Disco ventilado (296 mm)', 'Disco ventilado (292 mm)', '235/65 R17', 'Magnesio', 135, 'gasolina', 4, 2488, 183, null, null, ' '),
('Nissan', 'GT R', 'Nismo', 2018, 'VR38DETT', true, 2932.13, 315, 3, 2, 1.37, 1.895, 2.78, 0.81, 627, 1725, 2.8, 'Independent Double Wishbones. Coil Springs. Anti-roll bar.', 'Multilink. Coil Springs. Anti-roll bar.', 'Disco ventilado ( 390 mm)', 'Disco ventilado ( 380 mm)', '255/40 R20 & 285/35 R20', 'Alumino', 441, 'gasolina', 6, 3799, 192, null, null, ' '),
('Mercedes', 'GLB', 'X247', 2020, '', true, 2407.2, 1800, 5, 7, 1.658, 1.834, 2.829, 0.96, 866, 1455, 9.9, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Multilink. Coil Springs. Anti-roll bar.', 'Disco ventilado', 'Disco', '225/55 R17', 'Acero', 100, 'gasolina', 4, 1332, 137, null, null, ' '),
('Suzuki', 'Swace 1.8 Hybrid', '', 2021, '1.8 (122 Hp) Hybrid CVT', false, 2268.09, 1606, 5, 5, 1.46, 1.79, 2.7, 0.84, 977, 1375, 11.1, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Independent Double Wishbones. Coil Springs. Anti-roll bar.', 'Disco ventilado', 'Disco', '205/55 R16', 'Magnesio', 72, 'electrico/gasolina', 4, 1798, 103, '01:05', 3.6, ' '),
('Volkswagen', 'T-Roc', '', 2020, '1.0 TSI 110HP', true, 2086.36, 1290, 5, 5, 1.573, 1.819, 2.59, 0.76, 943, 1194, 10.8, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Semi-independent. Coil Springs.', 'Disco ventilado', 'Disco', '215/60 R16', 'Alumino', 81, 'gasolina', 3, 999, 137, null, null, ' '),
('Peugeot', '5008', '', 2021, '1.2 PureTech 130', true, 2297.36, 1940, 5, 7, 1.646, 1.844, 2.84, 0.81, 828, 1404, 9.9, 'Independent McPherson. Coil Springs. Anti-roll bar.', 'Independent Cross Arms. Torsion bar. Anti-roll bar.', 'Disco ventilado', 'Disco', '215/65 R17', 'Acero', 96, 'gasolina', 3, 1199, 144, null, null, ' ');
select idmodelo,nombremodelo from modelo;
--select min(precio) from vehicarc,vehicare where 
--vehicarc.idmodeloc=(select idModeloC from modelocombustion where nombremodelo='Mazda 1') 
--or vehicare.idmodeloe=(select idModeloE from modeloelectrico where nombremodelo='Mazda 1');
update modelo 
set kgMMA = 1500, 
capacidadMaletero = 350, 
nPuertas = 4, 
nPlazas = 5, 
mAltura = 1.6, 
mAncho = 2.1, 
mDistanciaEjes = 2.5, 
coeficienteAerodinamico = 0.4, 
kmAutonomia = 130, 
kgPeso = 2000, 
segAceleracion0a100 = 3.4, 
susDelantera = 'Suspensión McPherson', 
susTrasera = 'Suspensión rígida', 
frenosDelanteros = 'De discos',   
frenosTraseros = 'De discos', 
neumaticos = 'Neumático diagonal y radial',  
materialLlantas = 'Aluminio', 
kwPotencia = 760.61, 
combustible = 'Gasolina', 
nCilindros = 8, 
cm3Cilindrada = 1984, 
gkmEmisionCO2 = 121.31, 
tiempoCarga = '00:30:00', 
capacidadBateria = 30000
where idModelo = 1;
