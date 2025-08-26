CREATE DATABASE IF NOT EXISTS `TP_DSW_BDD`;
USE `TP_DSW_BDD`;
GRANT ALL PRIVILEGES ON TP_DSW_BDD.* TO 'root' @'localhost';
fLUSH PRIVILEGES;
/*
 DROP TABLE IF EXISTS Usuario;
 DROP TABLE IF EXISTS Dj;
 DROP TABLE IF EXISTS PrecioDj;
 DROP TABLE IF EXISTS Salon;
 DROP TABLE IF EXISTS Zona;
 DROP TABLE IF EXISTS PrecioS;
 DROP TABLE IF EXISTS Barra;
 DROP TABLE IF EXISTS PrecioB;
 DROP TABLE IF EXISTS Gastronomico;
 DROP TABLE IF EXISTS PrecioG;
 DROP TABLE IF EXISTS Solicitud;
 
 START TRANSACTION;
 
 CREATE TABLE `TP_DSW_BDD`.`Zona`(
 idZona INTEGER PRIMARY KEY,
 nombre VARCHAR(100)
 );
 CREATE TABLE Usuario (
 idUsuario INTEGER PRIMARY KEY AUTO_INCREMENT,
 nombre VARCHAR(100),
 apellido VARCHAR(100),
 email VARCHAR(100) UNIQUE NOT NULL,
 contrasena VARCHAR(100) NOT NULL,
 telefono VARCHAR(100),
 nombreUsuario VARCHAR(100)
 );
 
 CREATE TABLE `TP_DSW_BDD`.`Dj`(
 idDj INTEGER  PRIMARY KEY,
 nombreArtistico VARCHAR(100),
 foto VARCHAR(200),
 idZona INTEGER,
 FOREIGN KEY (idZona) REFERENCES Zona(idZona)
 );
 
 
 CREATE TABLE `TP_DSW_BDD`.`Salon`(
 idSalon INTEGER PRIMARY KEY,
 idZona INTEGER,
 nombre VARCHAR(100),
 foto VARCHAR(200),
 direccion VARCHAR(100),
 FOREIGN KEY (IdZona) REFERENCES Zona(idZona)
 );
 
 CREATE TABLE `TP_DSW_BDD`.`Barra`(
 idBarra INTEGER PRIMARY KEY,
 tipoBebida VARCHAR(100),
 idZona INTEGER,
 nombre VARCHAR(100),
 foto VARCHAR(200),
 FOREIGN KEY(idZona) REFERENCES Zona(idZona) 
 );
 CREATE TABLE `TP_DSW_BDD`.`Gastronomico`(
 idGastro INTEGER PRIMARY KEY,
 tipoComida VARCHAR(100),
 idZona INTEGER,
 nombre VARCHAR(100),
 foto VARCHAR(200),
 FOREIGN KEY(idZona) REFERENCES Zona(idZona) 
 );
 CREATE TABLE `TP_DSW_BDD`.`Solicitud`(
 idSolicitud INTEGER PRIMARY KEY,
 fechaDesde DATE,
 fechaHasta DATE,
 idDj INTEGER,
 idUsuario INTEGER,
 idSalon INTEGER,
 idBarra INTEGER,
 idGastro INTEGER,
 precioB FLOAT,
 precioDj FLOAT,
 precioS FLOAT,
 precioG FLOAT,
 FOREIGN KEY(idDj) REFERENCES Dj(idDj),
 FOREIGN KEY(idUsuario) REFERENCES Usuario(idUsuario),
 FOREIGN KEY(idBarra) REFERENCES Barra(idBarra),
 FOREIGN KEY(idGastro) REFERENCES Gastronomico(idGastro),
 FOREIGN KEY(idSalon) REFERENCES Salon(idSalon)
 );
 
 insert into TP_DSW_BDD.Usuario VALUES (1, 'Juan', 'Gonzalez', 'DSADAS', '1234', '123456789', 'juangonzalez');
 insert into TP_DSW_BDD.Usuario VALUES (2, 'Pedro', 'Lopez', 'DSaaaDAS', '1234', '123456789', 'pedrolopez');
 
 COMMIT;
 
 */