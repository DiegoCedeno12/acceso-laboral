CREATE DATABASE acceso_local;

USE acceso_local;

CREATE TABLE usuario (
  usuario_id varchar(14) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  role enum('ADMIN','EMPLEADO') NOT NULL,
  PRIMARY KEY (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE empleado (
  empleado_id varchar(14) NOT NULL,
  usuario_id varchar(14) NOT NULL,
  nombre varchar(45),
  apellido varchar(45),  
  cargo varchar(45),
  telf varchar(45),
  PRIMARY KEY (empleado_id),
  KEY FK_empleado_1 (usuario_id),
  CONSTRAINT FK_empleado_1 FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE acceso (
  acceso_id varchar(14) NOT NULL,
  empleado_id varchar(14) NOT NULL,
  fecha_hora varchar(45) NOT NULL,
  PRIMARY KEY (acceso_id),
  KEY FK_acceso_1 (empleado_id),
  CONSTRAINT FK_acceso_1 FOREIGN KEY (empleado_id) REFERENCES empleado (empleado_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;