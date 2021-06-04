drop table metodoPAgo cascade;
drop table usuarioComprador cascade;
drop table modeloCombustion;
----------------------------
--los campos aceptan null de momento SOLO para hacer las pruebas de incersiones
create table usuarioComprador(
	idUsuarioC serial primary key not null,
	nombreUC varchar(30) not null,
	apellidoMatUC varchar(30) not null,
	apellidoPatUC varchar(30) not null,
	correo varchar(50) not null,
	clave varchar(50) not null,
	verificado boolean default false
);
create table metodoPago(
	nTarjeta varchar(16) primary key not null,
	fechaVencimiento date not null,
	idUsuarioC integer not null,
	foreign key (idUsuarioC) references usuarioComprador(idUsuarioC) on delete cascade
);

create table modeloCombustion(
	idModelo serial primary key not null,
	modelo varchar(30) not null,
	marca varchar(30) not null,
	versionModelo varchar(30) not null,
	anoModelo char(4) not null,
	descripcionModelo text not null,
	motorModelo varchar(30) not null
);
-----------------------------------------
INSERT INTO usuarioComprador (nombreUC,apellidoMAtUC,apellidoPAtUC,correo, clave)
VALUES ('Usuario','apelMat','apelPat','a@a.com','1234567');
INSERT INTO modeloCombustion(modelo,marca,versionModelo,anoModelo,descripcionModelo,motorModelo)
VALUES ('Mazda 1','Sedán','Sport','2021','Está muy chulo jsjsjs','2.5L Skyactiv-G'),
('Mazda 2','Sedán','Sport','2019','Está muy chulo x2 jsjsjs','2.5L Skyactiv-G'),
('Mazda 3','Sedán','Eco','2017','Está muy chulo x3 jsjsjs','4L Skyactiv-T'),
('Mazda 4','Sedán','Sport','2020','Está muy chulo x4 jsjsjs','2.5L Skyactiv-G'),
('Mazda 5','Sedán','Sport','2015','Está muy chulo x5 jsjsjs','4L Skyactiv-G'),
('Mazda 6','Sedán','Sport','2018','Está muy chulo x6 jsjsjs','2.5L Skyactiv-G'),
('Mazda 7','Sedán','Sport','2021','Está muy chulo x7 jsjsjs','4L Skyactiv-G');
------------------------------------------
select * from modeloCombustion;