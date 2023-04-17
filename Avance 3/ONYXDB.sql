/* Proyecto ONYX - Tecnologico de Monterrey - Campus Queretaro BASE DE DATOS DE ONYX */
/* Creado por el equipo de desarrollo de bases de datos de Total-Tech*/

DROP DATABASE Onyx;
CREATE DATABASE Onyx;
USE Onyx;

CREATE TABLE privilegio(
    id_cu INT AUTO_INCREMENT NOT NULL,
    nombrecu VARCHAR(50),
    PRIMARY KEY(id_cu)
);

CREATE TABLE rol(
    id_rol INT AUTO_INCREMENT NOT NULL,
    statusRol varchar(20) NOT NULL,
    nombreRol VARCHAR(20),
    PRIMARY KEY(id_rol)
);

CREATE TABLE rol_privilegio(
    id_rol INT NOT NULL,
    id_cu INT NOT NULL,
    PRIMARY KEY(id_rol, id_cu),
    FOREIGN KEY(id_rol) REFERENCES rol(id_rol),
    FOREIGN KEY(id_cu) REFERENCES privilegio(id_cu)
);

CREATE TABLE usuario(
    email VARCHAR(30) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    contraseña VARCHAR(400) NOT NULL,
    user_pic VARCHAR(200),
    PRIMARY KEY (email)
);

CREATE TABLE rol_usuario (
    id_rol INT AUTO_INCREMENT NOT NULL ,
    email VARCHAR(30) NOT NULL,
    fecha DATE NOT NULL,
    PRIMARY KEY (id_rol, email),
    FOREIGN KEY(email) REFERENCES usuario(email),
    FOREIGN KEY(id_rol) REFERENCES rol(id_rol)
);

CREATE TABLE admin(
    email VARCHAR(30) NOT NULL,
    PRIMARY KEY(email),
    FOREIGN KEY(email) REFERENCES usuario(email)
);

CREATE TABLE cliente(
    email VARCHAR(30) NOT NULL,
    altura DOUBLE NOT NULL,
    edad INT NOT NULL,
    nivel_actividad varchar(30) NOT NULL,
    objetivo VARCHAR (20) NOT NULL,
    sexo VARCHAR (15) NOT NULL,
    pr_BenchPress INT NOT NULL,
    pr_PesoMuerto INT NOT NULL,
    pr_Sentadillas INT NOT NULL,
    PRIMARY KEY(email),
    FOREIGN KEY(email) REFERENCES usuario(email)
);

CREATE TABLE talla(
    id_medida INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(30) NOT NULL,
    extremidad VARCHAR(50) NOT NULL,
    medida INT NOT NULL,
    fecha DATE NOT NULL,
    PRIMARY KEY (id_medida),
    FOREIGN KEY(email) REFERENCES usuario(email)
);

CREATE TABLE bitacora(
    id_bitacora INT AUTO_INCREMENT NOT NULL ,
    fecha DATE NOT NULL,
    contenido VARCHAR(2500) NOT NULL,
    entreno VARCHAR(200) NOT NULL,
    email VARCHAR(30) NOT NULL,
    PRIMARY KEY(id_bitacora),
    FOREIGN KEY(email) REFERENCES usuario(email)
);

CREATE TABLE programa (
    id_programa INT AUTO_INCREMENT NOT NULL,
    frecuencia INT NOT NULL,
    descripcion_programa VARCHAR(200) NOT NULL,
    nombre_programa VARCHAR(100) NOT NULL,
    ref_visual VARCHAR(200),
    img_programa VARCHAR(200),
    PRIMARY KEY(id_programa)
);

CREATE TABLE ejercicio(
    id_ejercicio INT AUTO_INCREMENT NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    nivel_intensidad VARCHAR(20) NOT NULL,
    referencia_visual VARCHAR(100) NOT NULL,
    descripcion_ejercicio VARCHAR(200) NOT NULL,
    nombre_ejercicio VARCHAR(100) NOT NULL,
    imagen_ejercicio VARCHAR(500) NOT NULL,
    PRIMARY KEY(id_ejercicio)
);

CREATE TABLE programa_ejercicio(
    id_programa INT NOT NULL,
    id_ejercicio INT NOT NULL,
    PRIMARY KEY(id_programa, id_ejercicio),
    FOREIGN KEY(id_programa) REFERENCES programa(id_programa),
    FOREIGN KEY(id_ejercicio) REFERENCES ejercicio(id_ejercicio)
);



CREATE TABLE alimento(
    id_alimento INT NOT NULL AUTO_INCREMENT,
    unidad VARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    descripcion_alimento VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_alimento)

);

CREATE TABLE dieta(
    id_dieta INT NOT NULL AUTO_INCREMENT,
    proteinas INT NOT NULL,
    grasas INT NOT NULL,
    carbohidratos INT NOT NULL,
    calorias INT NOT NULL,
    fibra_total FLOAT,
    ceniza FLOAT,
    calcio FLOAT,
    fosforo FLOAT,
    hierro FLOAT,
    tiamina FLOAT,
    riboflavina FLOAT,
    niacina FLOAT,
    vitamina_c FLOAT,
    vitamina_a FLOAT,
    ac_graso_mono FLOAT,
    ac_graso_poli FLOAT,
    ac_graso_saturado FLOAT,
    colesterol FLOAT,
    potasio FLOAT,
    sodio FLOAT,
    zinc FLOAT,
    magnesio FLOAT,
    vit_b6 FLOAT,
    vit_b12 FLOAT,
    ac_folico FLOAT,
    folato FLOAT,
    nombre_dieta VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_dieta)
);

CREATE TABLE dieta_alimento(
    id_dieta INT NOT NULL,
    id_alimento INT NOT NULL,
    PRIMARY KEY (id_dieta, id_alimento),
    FOREIGN KEY (id_dieta) REFERENCES dieta (id_dieta),
    FOREIGN KEY (id_alimento) REFERENCES alimento (id_alimento)
);


CREATE TABLE favoritos_dieta(
    id_dieta INT NOT NULL,
    email VARCHAR(30) NOT NULL,
    PRIMARY KEY(id_dieta, email),
    FOREIGN KEY(id_dieta) REFERENCES dieta(id_dieta),
    FOREIGN KEY(email) REFERENCES usuario(email)
);

CREATE TABLE favoritos_programa(
    id_programa INT NOT NULL,
    email VARCHAR(30) NOT NULL,
    PRIMARY KEY(id_programa, email),
    FOREIGN KEY(id_programa) REFERENCES programa(id_programa),
    FOREIGN KEY(email) REFERENCES usuario(email)
);

CREATE TABLE sesiones(
    id_sesion INT NOT NULL AUTO_INCREMENT,
    fecha DATE NOT NULL ,
    PRIMARY KEY(id_sesion)
);    

/*INSERTS - USUARIO*/

INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('maria.gomez@gmail.com','María','Gómez','M3kHd8');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('jose.martinez@yahoo.com','José','Martínez','GhT1w7');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('lucia.perez@hotmail.com','Lucía','Pérez','XcVbN9');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('juan.sanchez@gmail.com','Juan','Sánchez','AsDfG1');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('carlos.lopez@gmail.com','Carlos','López','QwErT7');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('ana.ramirez@hotmail.com','Ana','Ramírez','ZxTyU2');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('pablo.flores@yahoo.com','Pablo','Flores','KjHgF4');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('clara.hernandez@gmail.com','Clara','Hernández','VbNmL0');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('oscar.ortega@hotmail.com','Óscar','Ortega','PoiUy6');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('sofia.estrada@yahoo.com','Sofía','Estrada','NmLkJ9');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('luisa.mendez@yahoo.com','Luisa','Méndez','L0pKj8');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('david.fernandez@hotmail.com','David','Fernández','ZxAsD5');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('juan.rodriguez@gmail.com','Juan','Rodríguez','aBc123');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('ana.perez@hotmail.com','Ana','Pérez','qWe456');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('carlos.sanchez@yahoo.com','Carlos','Sánchez','zXc789');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('laura.garcia@gmail.com','Laura','García','sEd123');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('pedro.lopez@hotmail.com','Pedro','López','dFg456');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('maria.martin@yahoo.com','María','Martín','gHi789');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('jose.fernandez@hotmail.com','José','Fernández','jKl123');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('lucia.gonzalez@gmail.com','Lucía','González','mNo456');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('pablo.ruiz@yahoo.com','Pablo','Ruiz','pQr789');
INSERT INTO usuario(email, nombre, apellido, contraseña) VALUES ('clara.hernandez@hotmail.com','Clara','Hernández','tUv123');

/*INSERTS - CLIENTE*/

INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('maria.gomez@gmail.com',175,35,'Moderado','Ganar Masa Muscular','Masculino',90,130,80);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('jose.martinez@yahoo.com',163,27,'Bajo','Perder Peso','Femenino',40,65,30);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('lucia.perez@hotmail.com',182,29,'Alto','Ganar Fuerza','Masculino',100,150,70);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('juan.sanchez@gmail.com',160,30,'Moderado','Perder Grasa','Femenino',35,60,25);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('carlos.lopez@gmail.com',178,32,'Alto','Ganar Masa Muscular','Masculino',85,120,65);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('ana.ramirez@hotmail.com',165,24,'Bajo','Perder Peso','Femenino',40,70,30);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('pablo.flores@yahoo.com',182,29,'Alto','Ganar Fuerza','Masculino',95,140,75);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('clara.hernandez@gmail.com',170,28,'Moderado','Perder Grasa','Femenino',45,75,30);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('oscar.ortega@hotmail.com',175,35,'Moderado','Ganar Masa Muscular','Masculino',90,130,80);
INSERT INTO cliente(email, altura, edad, nivel_actividad, objetivo, sexo, pr_BenchPress, pr_PesoMuerto, pr_Sentadillas) VALUES ('sofia.estrada@yahoo.com',163,27,'Bajo','Perder Peso','Femenino',40,65,30);


/*INSERTS - EJERCICIO*/

INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('push','novato','pecho','favorece el desarrollo de la musculatura pectoral a través del movimiento de empuje con carga', 'Press de banca', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/press-de-banca.jpg');
INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('pull','principiante','espalda','favorece el desarrollo de la musculatura de la espalda a través del movimiento de tracción con carga', 'Remo con barra', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/remo-con-barra.jpg');
INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('full-body','intermedio','cuerpo completo','favorece el desarrollo de la musculatura de todo el cuerpo a través de ejercicios que involucran varios grupos musculares', 'Sentadilla', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/sentadilla.jpg');
INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('fuerza','avanzado','brazos','favorece el desarrollo de la fuerza muscular en los brazos a través de ejercicios específicos de carga', 'Dominadas', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/dominadas.jpg');
INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('hipertrofia','elite','glúteos','favorece el desarrollo de la masa muscular en los glúteos a través de ejercicios específicos con alta carga y repetición', 'Peso muerto', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/peso-muerto.jpg');
INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('resistencia','monstruo!','abdomen','favorece el desarrollo de la resistencia muscular en el abdomen a través de ejercicios específicos con alta carga y alto volumen', 'Abdominales', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/abdominales.jpg');
INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('pull','novato','bíceps','favorece el desarrollo de la musculatura del bíceps a través del movimiento de tracción con carga', 'Dominadas', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/dominadas.jpg');
INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('push','principiante','hombros','favorece el desarrollo de la musculatura de los hombros a través del movimiento de empuje con carga', 'Press militar', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/press-militar.jpg');
INSERT INTO ejercicio(categoria, nivel_intensidad, referencia_visual, descripcion_ejercicio, nombre_ejercicio, imagen_ejercicio) VALUES ('full-body','intermedio','cuerpo completo','favorece el desarrollo de la musculatura de todo el cuerpo a través de ejercicios que involucran varios grupos musculares', 'Peso muerto', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/peso-muerto.jpg');

/*INSERTS - ROL*/

INSERT INTO rol(statusRol, nombreRol) VALUES ('on','administrador');
INSERT INTO rol(statusRol, nombreRol) VALUES ('on','cliente');



/*INSERTS - ALIMENTO*/

INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',200,'Pollo asado sin piel');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',250,'Ensalada César con pollo a la parrilla');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',100,'Atún enlatado en agua');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',150,'Fresas frescas');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',100,'Huevo cocido');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',300,'Arroz integral cocido');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',50,'Camarones cocidos');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',200,'Arándanos frescos');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',100,'Papa cocida sin piel');
INSERT INTO alimento(unidad, cantidad, descripcion_alimento) VALUES ('gramos',150,'Mango fresco cortado');


/*INSERTS - DIETA*/

INSERT INTO dieta(proteinas, grasas, carbohidratos, calorias, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato, nombre_dieta) VALUES (152,95,308,2700,35.1,17.7,1482.4,2156.4,18.9,1.4,2.9,23.7,37.2,2271.8,27.0,18.2,28.9,865.7,3993.7,1781.7,16.1,485.1,2.2,4.5,0.0,389.2, 'Dieta 1');
INSERT INTO dieta(proteinas, grasas, carbohidratos, calorias, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato, nombre_dieta) VALUES (152,95,308,2700,35.1,17.7,1482.4,2156.4,18.9,1.4,2.9,23.7,37.2,2271.8,27.0,18.2,28.9,865.7,3993.7,1781.7,16.1,485.1,2.2,4.5,0.0,389.2, 'Dieta 2');
INSERT INTO dieta(proteinas, grasas, carbohidratos, calorias, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato, nombre_dieta) VALUES (100,50,200,1800,25.0,15.0,800.0,1200.0,10.0,1.0,2.0,20.0,20.0,1500.0,15.0,10.0,20.0,500.0,2500.0,1000.0,10.0,400.0,2.0,3.0,0.0,300.0, 'Dieta 3');
INSERT INTO dieta(proteinas, grasas, carbohidratos, calorias, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato,nombre_dieta) VALUES (120,80,220,2000,30.0,20.0,1000.0,1500.0,12.0,1.2,2.5,25.0,25.0,1800.0,18.0,12.0,22.0,550.0,3000.0,1200.0,12.0,450.0,2.5,3.5,0.0,350.0,'Dieta 4');
INSERT INTO dieta(proteinas, grasas, carbohidratos, calorias, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato,nombre_dieta) VALUES (130,70,240,2200,32.5,22.0,1100.0,1600.0,14.0,1.3,2.7,27.5,27.5,1950.0,20.0,13.0,24.0,600.0,3250.0,1300.0,14.0,500.0,3.0,4.0,0.0,375.0,'Dieta 5');
INSERT INTO dieta(proteinas, grasas, carbohidratos, calorias, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato,nombre_dieta) VALUES (135, 90, 340, 2800, 30.5, 18.3, 1350.7, 1950.9, 22.5, 1.3, 2.7, 21.9, 33.6, 2150.3, 27.3, 16.5, 26.2, 800.9, 3600.8, 1590.2, 15.7, 470.4, 2.0, 4.1, 0.0, 365.2,'Dieta 6');
INSERT INTO dieta(proteinas, grasas, carbohidratos, calorias, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato,nombre_dieta) VALUES (90,50,150,1500,10.5,9.3,700.2,800.3,12.3,0.8,1.6,12.9,27.6,1050.8,15.7,10.1,12.5,324.8,1587.2,761.9,9.8,259.4,1.4,2.1,0.0,219.7,'Dieta 7');
INSERT INTO dieta(proteinas, grasas, carbohidratos, calorias, fibra_total, ceniza, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vitamina_c, vitamina_a, ac_graso_mono, ac_graso_poli, ac_graso_saturado, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, ac_folico, folato,nombre_dieta) VALUES (110,60,200,1800,15.0,10.8,950.6,1020.9,14.2,1.2,2.2,15.3,30.7,1378.6,18.6,12.3,14.9,415.6,1976.3,991.2,10.7,303.8,1.7,2.9,0.0,259.8,'Dieta 8');



/*INSERTS - DIETA_ALIMENTO*/

INSERT INTO dieta_alimento(id_dieta, id_alimento) VALUES (1,1);
INSERT INTO dieta_alimento(id_dieta, id_alimento) VALUES (3,2);
INSERT INTO dieta_alimento(id_dieta, id_alimento) VALUES (2,3);
INSERT INTO dieta_alimento(id_dieta, id_alimento) VALUES (1,4);
INSERT INTO dieta_alimento(id_dieta, id_alimento) VALUES (2,5);

/* INSERT - PRIVILEGIOS*/ 


INSERT INTO privilegio(nombrecu) VALUES ('Registrar Bitacora');
INSERT INTO privilegio(nombrecu) VALUES ('Registrar Alimento');
INSERT INTO privilegio(nombrecu) VALUES ('Registrar Dieta');
INSERT INTO privilegio(nombrecu) VALUES ('Registrar Entrenamiento');
INSERT INTO privilegio(nombrecu) VALUES ('Registrar Rutina');
INSERT INTO privilegio(nombrecu) VALUES ('Registrar Usuario');
INSERT INTO privilegio(nombrecu) VALUES ('Registrar Rol');


/* INSERTS - Rol de privilegio*/

INSERT INTO rol_privilegio(id_rol, id_cu) VALUES (1,2);
INSERT INTO rol_privilegio(id_rol, id_cu) VALUES (2,4);
INSERT INTO rol_privilegio(id_rol, id_cu) VALUES (1,1);
INSERT INTO rol_privilegio(id_rol, id_cu) VALUES (1,3);


/*INSERTS - BITACORA*/

INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una sesión de entrenamiento con mi entrenador personal.','Entrenamiento de fuerza en el gimnasio','maria.gomez@gmail.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una caminata al aire libre en el parque.','Caminata al aire libre','jose.martinez@yahoo.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una sesión de entrenamiento con mi entrenador personal.','Entrenamiento de fuerza en el gimnasio','lucia.perez@hotmail.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una sesión de entrenamiento en casa.','Entrenamiento de cardio en casa','juan.sanchez@gmail.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una sesión de entrenamiento con mi entrenador personal.','Entrenamiento de fuerza en el gimnasio','carlos.lopez@gmail.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una clase de yoga en el estudio.','Clase de yoga','ana.ramirez@hotmail.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una sesión de entrenamiento con mi entrenador personal.','Entrenamiento de fuerza en el gimnasio','pablo.flores@yahoo.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una caminata al aire libre en el parque.','Caminata al aire libre','clara.hernandez@gmail.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una sesión de entrenamiento con mi entrenador personal.','Entrenamiento de fuerza en el gimnasio','oscar.ortega@hotmail.com');
INSERT INTO `bitacora`(`fecha`, `contenido`, `entreno`, `email`) VALUES (NOW(),'Realicé una sesión de entrenamiento en casa.','Entrenamiento de cardio en casa','sofia.estrada@yahoo.com');

/*INSERTS - PROGRAMA*/

INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (4,'Programa de fuerza','Programa de fuerza para principiantes');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (3,'Programa de hipertrofia','Programa de entrenamiento para aumentar el tamaño muscular');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (5,'Programa de resistencia','Programa de entrenamiento para mejorar la capacidad aeróbica');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (6,'Programa de fuerza y resistencia','Programa de entrenamiento para mejorar la fuerza y la resistencia muscular');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (4,'Programa de flexibilidad','Programa de entrenamiento para mejorar la movilidad y flexibilidad muscular');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (5,'Programa de pérdida de peso','Programa de entrenamiento para reducir el peso corporal y quemar grasa');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (3,'Programa de entrenamiento funcional','Programa de entrenamiento para mejorar la coordinación, la estabilidad y el equilibrio muscular');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (4,'Programa de entrenamiento en casa','Programa de entrenamiento para realizar en casa sin necesidad de equipamiento especial');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (5,'Programa de entrenamiento en grupo','Programa de entrenamiento para realizar en grupo y motivarse mutuamente');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (6,'Programa de entrenamiento de alta intensidad','Programa de entrenamiento de corta duración y alta intensidad para mejorar la resistencia y el rendimiento cardiovascular');
INSERT INTO programa(frecuencia, nombre_programa, descripcion_programa) VALUES (3,'Programa de entrenamiento para corredores','Programa de entrenamiento específico para corredores y mejorar su rendimiento en carreras');

/*INSERTS -  TALLA*/

INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('maria.gomez@gmail.com','Brazo',30,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('jose.martinez@yahoo.com','Brazo',36,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('lucia.perez@hotmail.com','Pierna',56,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('juan.sanchez@gmail.com','Pierna',61,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('carlos.lopez@gmail.com','Cintura',85,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('ana.ramirez@hotmail.com','Cadera',100,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('pablo.flores@yahoo.com','Brazo',33,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('clara.hernandez@gmail.com','Brazo',27,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('oscar.ortega@hotmail.com','Pecho',95,NOW());
INSERT INTO talla(email, extremidad, medida, fecha) VALUES ('sofia.estrada@yahoo.com','Espalda',40,NOW());


/*INSERTS - ADMINS*/

INSERT INTO admin(email) VALUES ('maria.gomez@gmail.com');
INSERT INTO admin(email) VALUES ('sofia.estrada@yahoo.com');
INSERT INTO admin(email) VALUES ('lucia.perez@hotmail.com');
INSERT INTO admin(email) VALUES ('clara.hernandez@gmail.com');
INSERT INTO admin(email) VALUES ('juan.sanchez@gmail.com');
INSERT INTO admin(email) VALUES ('ana.ramirez@hotmail.com');
INSERT INTO admin(email) VALUES ('carlos.lopez@gmail.com');
INSERT INTO admin(email) VALUES ('pablo.flores@yahoo.com');
INSERT INTO admin(email) VALUES ('oscar.ortega@hotmail.com');
INSERT INTO admin(email) VALUES ('jose.martinez@yahoo.com');


/* INSERTS - rol_usuario */ 

INSERT INTO rol_usuario(email, id_rol, fecha) VALUES ('maria.gomez@gmail.com',1, NOW());
INSERT INTO rol_usuario(email, id_rol, fecha) VALUES ('sofia.estrada@yahoo.com',1, NOW());
INSERT INTO rol_usuario(email, id_rol, fecha) VALUES ('clara.hernandez@gmail.com', 1, NOW());
INSERT INTO rol_usuario(email, id_rol, fecha) VALUES ('juan.sanchez@gmail.com', 2, NOW());
INSERT INTO rol_usuario(email, id_rol, fecha) VALUES ('pablo.flores@yahoo.com', 2, NOW());

/* INSERTS - programa_ejercicio */

INSERT INTO programa_ejercicio(id_programa, id_ejercicio) VALUES (1,3);
INSERT INTO programa_ejercicio(id_programa, id_ejercicio) VALUES (2,1);
INSERT INTO programa_ejercicio(id_programa, id_ejercicio) VALUES (3,1);
INSERT INTO programa_ejercicio(id_programa, id_ejercicio) VALUES (4,2);
INSERT INTO programa_ejercicio(id_programa, id_ejercicio) VALUES (2,4);




/* DEFINICION DE LAS LLAVES FORANEAS */

ALTER TABLE rol_privilegio ADD CONSTRAINT fk_rol_privilegio_rol FOREIGN KEY (id_rol) REFERENCES rol(id_rol);
ALTER TABLE rol_privilegio ADD CONSTRAINT fk_rol_privilegio_privilegio FOREIGN KEY (id_cu) REFERENCES privilegio(id_cu);
ALTER TABLE rol_usuario ADD CONSTRAINT fk_rol_usuario_rol FOREIGN KEY (id_rol) REFERENCES rol(id_rol);
ALTER TABLE rol_usuario ADD CONSTRAINT fk_rol_usuario_usuario FOREIGN KEY (email) REFERENCES usuario(email);
ALTER TABLE admin ADD CONSTRAINT fk_admin_usuario FOREIGN KEY (email) REFERENCES usuario(email);
ALTER TABLE cliente ADD CONSTRAINT fk_cliente_usuario FOREIGN KEY (email) REFERENCES usuario(email);
ALTER TABLE talla ADD CONSTRAINT fk_talla_cliente FOREIGN KEY (email) REFERENCES cliente(email);
ALTER TABLE bitacora ADD CONSTRAINT fk_bitacora_usuario FOREIGN KEY (email) REFERENCES usuario(email);
ALTER TABLE programa_ejercicio ADD CONSTRAINT fk_programa_ejercicio_ejercicio FOREIGN KEY (id_ejercicio) REFERENCES ejercicio(id_ejercicio);
ALTER TABLE programa_ejercicio ADD CONSTRAINT fk_programa_ejercicio_programa FOREIGN KEY (id_programa) REFERENCES programa(id_programa);
ALTER TABLE dieta_alimento ADD CONSTRAINT fk_dieta_alimento_dieta FOREIGN KEY (id_dieta) REFERENCES dieta(id_dieta);
ALTER TABLE dieta_alimento ADD CONSTRAINT fk_dieta_alimento_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento);
ALTER TABLE favoritos_dieta ADD CONSTRAINT fk_favoritos_dieta FOREIGN KEY (id_dieta) REFERENCES dieta(id_dieta);
ALTER TABLE favoritos_programa ADD CONSTRAINT fk_favoritos_programa FOREIGN KEY (id_programa) REFERENCES programa(id_programa);

