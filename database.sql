drop table metodoPAgo cascade;
drop table usuarioComprador cascade;
drop table vehiculo;
----------------------------
--los campos aceptan null de momento SOLO para hacer las pruebas de incersiones
create table usuarioComprador(
	idUsuarioC serial primary key not null,
	nombreUC varchar[30],
	apellidoMatUC varchar[30],
	apellidoPatUC varchar[30],
	telefonoUC varchar[30],
	verificado boolean,
	correo varchar[50],
	clave varchar[50] not null
);
create table metodoPago(
	nTarjeta varchar(16) primary key not null,
	fechaVencimiento date not null,
	idUsuarioC integer not null,
	foreign key (idUsuarioC) references usuarioComprador(idUsuarioC) on delete cascade
);

create table vehiculo(
	nombre varchar[30]
);

INSERT INTO usuarioComprador (nombreUC,correo, clave) VALUES ('{Usuario}','{a@a.com}','{1234567}');
INSERT INTO vehiculo(nombre) VALUES ('{Mazda}');
INSERT INTO vehiculo(nombre) VALUES ('{Civic}');
INSERT INTO vehiculo(nombre) VALUES ('{Sentra}');
INSERT INTO vehiculo(nombre) VALUES ('{Tsuru}');
INSERT INTO vehiculo(nombre) VALUES ('{Tesla Roadster}');
INSERT INTO vehiculo(nombre) VALUES ('{Hot Wheels}');
select * from usuarioComprador;