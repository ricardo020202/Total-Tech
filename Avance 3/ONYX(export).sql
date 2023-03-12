-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-03-2023 a las 19:54:29
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `onyx`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`email`) VALUES
('ana.ramirez@hotmail.com'),
('carlos.lopez@gmail.com'),
('clara.hernandez@gmail.com'),
('jose.martinez@yahoo.com'),
('juan.sanchez@gmail.com'),
('lucia.perez@hotmail.com'),
('maria.gomez@gmail.com'),
('oscar.ortega@hotmail.com'),
('pablo.flores@yahoo.com'),
('sofia.estrada@yahoo.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alimento`
--

CREATE TABLE `alimento` (
  `id_alimento` int(11) NOT NULL,
  `unidad` varchar(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion_alimento` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alimento`
--

INSERT INTO `alimento` (`id_alimento`, `unidad`, `cantidad`, `descripcion_alimento`) VALUES
(1, 'gramos', 200, 'Pollo asado sin piel'),
(2, 'gramos', 250, 'Ensalada César con pollo a la parrilla'),
(3, 'gramos', 100, 'Atún enlatado en agua'),
(4, 'gramos', 150, 'Fresas frescas'),
(5, 'gramos', 100, 'Huevo cocido'),
(6, 'gramos', 300, 'Arroz integral cocido'),
(7, 'gramos', 50, 'Camarones cocidos'),
(8, 'gramos', 200, 'Arándanos frescos'),
(9, 'gramos', 100, 'Papa cocida sin piel'),
(10, 'gramos', 150, 'Mango fresco cortado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `id_bitacora` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contenido` varchar(2500) NOT NULL,
  `entreno` varchar(200) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bitacora`
--

INSERT INTO `bitacora` (`id_bitacora`, `fecha`, `contenido`, `entreno`, `email`) VALUES
(1, '2023-03-12', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'maria.gomez@gmail.com'),
(2, '2023-03-12', 'Realicé una caminata al aire libre en el parque.', 'Caminata al aire libre', 'jose.martinez@yahoo.com'),
(3, '2023-03-12', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'lucia.perez@hotmail.com'),
(4, '2023-03-12', 'Realicé una sesión de entrenamiento en casa.', 'Entrenamiento de cardio en casa', 'juan.sanchez@gmail.com'),
(5, '2023-03-12', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'carlos.lopez@gmail.com'),
(6, '2023-03-12', 'Realicé una clase de yoga en el estudio.', 'Clase de yoga', 'ana.ramirez@hotmail.com'),
(7, '2023-03-12', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'pablo.flores@yahoo.com'),
(8, '2023-03-12', 'Realicé una caminata al aire libre en el parque.', 'Caminata al aire libre', 'clara.hernandez@gmail.com'),
(9, '2023-03-12', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'oscar.ortega@hotmail.com'),
(10, '2023-03-12', 'Realicé una sesión de entrenamiento en casa.', 'Entrenamiento de cardio en casa', 'sofia.estrada@yahoo.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `email` varchar(30) NOT NULL,
  `peso` int(11) NOT NULL,
  `altura` double NOT NULL,
  `edad` int(11) NOT NULL,
  `nivel_actividad` varchar(30) NOT NULL,
  `objetivo` varchar(20) NOT NULL,
  `sexo` varchar(15) NOT NULL,
  `pr_BenchPress` int(11) NOT NULL,
  `pr_PesoMuerto` int(11) NOT NULL,
  `pr_Sentadillas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`email`, `peso`, `altura`, `edad`, `nivel_actividad`, `objetivo`, `sexo`, `pr_BenchPress`, `pr_PesoMuerto`, `pr_Sentadillas`) VALUES
('ana.ramirez@hotmail.com', 58, 165, 24, 'Bajo', 'Perder Peso', 'Femenino', 40, 70, 30),
('carlos.lopez@gmail.com', 75, 178, 32, 'Alto', 'Ganar Masa Muscular', 'Masculino', 85, 120, 65),
('clara.hernandez@gmail.com', 62, 170, 28, 'Moderado', 'Perder Grasa', 'Femenino', 45, 75, 30),
('jose.martinez@yahoo.com', 57, 163, 27, 'Bajo', 'Perder Peso', 'Femenino', 40, 65, 30),
('juan.sanchez@gmail.com', 55, 160, 30, 'Moderado', 'Perder Grasa', 'Femenino', 35, 60, 25),
('lucia.perez@hotmail.com', 90, 182, 29, 'Alto', 'Ganar Fuerza', 'Masculino', 100, 150, 70),
('maria.gomez@gmail.com', 80, 175, 35, 'Moderado', 'Ganar Masa Muscular', 'Masculino', 90, 130, 80),
('oscar.ortega@hotmail.com', 80, 175, 35, 'Moderado', 'Ganar Masa Muscular', 'Masculino', 90, 130, 80),
('pablo.flores@yahoo.com', 80, 182, 29, 'Alto', 'Ganar Fuerza', 'Masculino', 95, 140, 75),
('sofia.estrada@yahoo.com', 57, 163, 27, 'Bajo', 'Perder Peso', 'Femenino', 40, 65, 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dieta`
--

CREATE TABLE `dieta` (
  `id_dieta` int(11) NOT NULL,
  `no_calorias` int(11) NOT NULL,
  `proteinas` int(11) NOT NULL,
  `grasas` int(11) NOT NULL,
  `carbohidratos` int(11) NOT NULL,
  `micronutrientes` varchar(20) NOT NULL,
  `macronutrientes` varchar(20) NOT NULL,
  `nombre_dieta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dieta`
--

INSERT INTO `dieta` (`id_dieta`, `no_calorias`, `proteinas`, `grasas`, `carbohidratos`, `micronutrientes`, `macronutrientes`, `nombre_dieta`) VALUES
(1, 1300, 250, 43, 75, 'Vitamina A', 'Grasa', 'Spaghetti'),
(2, 1200, 60, 10, 130, 'Vitamina C', 'Grasa', 'Ensalada de Quinoa'),
(3, 3500, 350, 100, 250, 'Creatina', 'Proteína', 'Pechuga de pollo con arroz integral'),
(4, 1500, 100, 60, 50, 'Vitamina D', 'Grasa', 'Salmón con espinacas'),
(5, 2000, 100, 140, 20, 'Magnesio', 'Grasa', 'Hamburguesa con aguacate'),
(6, 1800, 90, 40, 150, 'Fibra', 'Carbohidrato', 'Avena con frutas'),
(7, 1600, 80, 30, 120, 'Cromo', 'Carbohidrato', 'Ensalada de salmón y espinacas'),
(8, 2000, 80, 50, 150, 'Vitamina E', 'Grasa', 'Batido de frutas y verduras');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dieta_alimento`
--

CREATE TABLE `dieta_alimento` (
  `id_dieta` int(11) NOT NULL,
  `id_alimento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dieta_alimento`
--

INSERT INTO `dieta_alimento` (`id_dieta`, `id_alimento`) VALUES
(1, 1),
(1, 4),
(2, 3),
(2, 5),
(3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio`
--

CREATE TABLE `ejercicio` (
  `id_ejercicio` int(11) NOT NULL,
  `categoria` varchar(20) NOT NULL,
  `nivel_intensidad` varchar(20) NOT NULL,
  `referencia_visual` varchar(100) NOT NULL,
  `descripcion_ejercicio` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ejercicio`
--

INSERT INTO `ejercicio` (`id_ejercicio`, `categoria`, `nivel_intensidad`, `referencia_visual`, `descripcion_ejercicio`) VALUES
(1, 'push', 'novato', 'pecho', 'favorece el desarrollo de la musculatura pectoral a través del movimiento de empuje con carga'),
(2, 'pull', 'principiante', 'espalda', 'favorece el desarrollo de la musculatura de la espalda a través del movimiento de tracción con carga'),
(3, 'full-body', 'intermedio', 'cuerpo completo', 'favorece el desarrollo de la musculatura de todo el cuerpo a través de ejercicios que involucran varios grupos musculares'),
(4, 'fuerza', 'avanzado', 'brazos', 'favorece el desarrollo de la fuerza muscular en los brazos a través de ejercicios específicos de carga'),
(5, 'hipertrofia', 'elite', 'glúteos', 'favorece el desarrollo de la masa muscular en los glúteos a través de ejercicios específicos con alta carga y repetición'),
(6, 'resistencia', 'monstruo!', 'abdomen', 'favorece el desarrollo de la resistencia muscular en el abdomen a través de ejercicios específicos con alta carga y alto volumen'),
(7, 'pull', 'novato', 'bíceps', 'favorece el desarrollo de la musculatura del bíceps a través del movimiento de tracción con carga'),
(8, 'push', 'principiante', 'hombros', 'favorece el desarrollo de la musculatura de los hombros a través del movimiento de empuje con carga'),
(9, 'full-body', 'intermedio', 'cuerpo completo', 'favorece el desarrollo de la musculatura de todo el cuerpo a través de ejercicios que involucran varios grupos musculares');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegio`
--

CREATE TABLE `privilegio` (
  `id_cu` int(11) NOT NULL,
  `nombrecu` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `privilegio`
--

INSERT INTO `privilegio` (`id_cu`, `nombrecu`) VALUES
(1, 'Registrar Bitacora'),
(2, 'Registrar Alimento'),
(3, 'Registrar Dieta'),
(4, 'Registrar Entrenamie'),
(5, 'Registrar Rutina'),
(6, 'Registrar Usuario'),
(7, 'Registrar Rol');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa`
--

CREATE TABLE `programa` (
  `id_programa` int(11) NOT NULL,
  `frecuencia` int(11) NOT NULL,
  `descripcion_programa` varchar(200) NOT NULL,
  `nombre_programa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `programa`
--

INSERT INTO `programa` (`id_programa`, `frecuencia`, `descripcion_programa`, `nombre_programa`) VALUES
(1, 4, 'Programa de fuerza para principiantes', 'Programa de fuerza'),
(2, 3, 'Programa de entrenamiento para aumentar el tamaño muscular', 'Programa de hipertrofia'),
(3, 5, 'Programa de entrenamiento para mejorar la capacidad aeróbica', 'Programa de resistencia'),
(4, 6, 'Programa de entrenamiento para mejorar la fuerza y la resistencia muscular', 'Programa de fuerza y resistencia'),
(5, 4, 'Programa de entrenamiento para mejorar la movilidad y flexibilidad muscular', 'Programa de flexibilidad'),
(6, 5, 'Programa de entrenamiento para reducir el peso corporal y quemar grasa', 'Programa de pérdida de peso'),
(7, 3, 'Programa de entrenamiento para mejorar la coordinación, la estabilidad y el equilibrio muscular', 'Programa de entrenamiento funcional'),
(8, 4, 'Programa de entrenamiento para realizar en casa sin necesidad de equipamiento especial', 'Programa de entrenamiento en casa'),
(9, 5, 'Programa de entrenamiento para realizar en grupo y motivarse mutuamente', 'Programa de entrenamiento en grupo'),
(10, 6, 'Programa de entrenamiento de corta duración y alta intensidad para mejorar la resistencia y el rendimiento cardiovascular', 'Programa de entrenamiento de alta intensidad'),
(11, 3, 'Programa de entrenamiento específico para corredores y mejorar su rendimiento en carreras', 'Programa de entrenamiento para corredores');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_dieta_cliente`
--

CREATE TABLE `programa_dieta_cliente` (
  `id_programa` int(11) NOT NULL,
  `id_dieta` int(11) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `programa_dieta_cliente`
--

INSERT INTO `programa_dieta_cliente` (`id_programa`, `id_dieta`, `email`) VALUES
(1, 4, 'maria.gomez@gmail.com'),
(2, 2, 'sofia.estrada@yahoo.com'),
(2, 3, 'pablo.flores@yahoo.com'),
(3, 1, 'juan.sanchez@gmail.com'),
(4, 3, 'clara.hernandez@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_ejercicio`
--

CREATE TABLE `programa_ejercicio` (
  `id_programa` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `programa_ejercicio`
--

INSERT INTO `programa_ejercicio` (`id_programa`, `id_ejercicio`) VALUES
(1, 3),
(2, 1),
(2, 4),
(3, 1),
(4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `statusRol` varchar(20) NOT NULL,
  `nombreRol` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `statusRol`, `nombreRol`) VALUES
(1, 'on', 'administrador'),
(2, 'on', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_privilegio`
--

CREATE TABLE `rol_privilegio` (
  `id_rol` int(11) NOT NULL,
  `id_cu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol_privilegio`
--

INSERT INTO `rol_privilegio` (`id_rol`, `id_cu`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_usuario`
--

CREATE TABLE `rol_usuario` (
  `id_rol` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol_usuario`
--

INSERT INTO `rol_usuario` (`id_rol`, `email`, `fecha`) VALUES
(1, 'clara.hernandez@gmail.com', '2023-03-12'),
(1, 'maria.gomez@gmail.com', '2023-03-12'),
(1, 'sofia.estrada@yahoo.com', '2023-03-12'),
(2, 'juan.sanchez@gmail.com', '2023-03-12'),
(2, 'pablo.flores@yahoo.com', '2023-03-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talla`
--

CREATE TABLE `talla` (
  `id_medida` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `extremidad` varchar(50) NOT NULL,
  `medida` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `talla`
--

INSERT INTO `talla` (`id_medida`, `email`, `extremidad`, `medida`, `fecha`) VALUES
(1, 'maria.gomez@gmail.com', 'Brazo', 30, '2023-03-12'),
(2, 'jose.martinez@yahoo.com', 'Brazo', 36, '2023-03-12'),
(3, 'lucia.perez@hotmail.com', 'Pierna', 56, '2023-03-12'),
(4, 'juan.sanchez@gmail.com', 'Pierna', 61, '2023-03-12'),
(5, 'carlos.lopez@gmail.com', 'Cintura', 85, '2023-03-12'),
(6, 'ana.ramirez@hotmail.com', 'Cadera', 100, '2023-03-12'),
(7, 'pablo.flores@yahoo.com', 'Brazo', 33, '2023-03-12'),
(8, 'clara.hernandez@gmail.com', 'Brazo', 27, '2023-03-12'),
(9, 'oscar.ortega@hotmail.com', 'Pecho', 95, '2023-03-12'),
(10, 'sofia.estrada@yahoo.com', 'Espalda', 40, '2023-03-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(30) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `contraseña` varchar(15) NOT NULL,
  `telefono` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `nombre`, `apellido`, `contraseña`, `telefono`) VALUES
('ana.perez@hotmail.com', 'Ana', 'Pérez', 'qWe456', '+34 910 111 222'),
('ana.ramirez@hotmail.com', 'Ana', 'Ramírez', 'ZxTyU2', '+34 912222222'),
('carlos.lopez@gmail.com', 'Carlos', 'López', 'QwErT7', '+52 (55)5555-5555'),
('carlos.sanchez@yahoo.com', 'Carlos', 'Sánchez', 'zXc789', '+34 913 456 789'),
('clara.hernandez@gmail.com', 'Clara', 'Hernández', 'VbNmL0', '+52(55)1234-5678'),
('clara.hernandez@hotmail.com', 'Clara', 'Hernández', 'tUv123', '+34 914 222 777'),
('david.fernandez@hotmail.com', 'David', 'Fernández', 'ZxAsD5', '+1 (408) 111-2222'),
('jose.fernandez@hotmail.com', 'José', 'Fernández', 'jKl123', '+34 915 444 555'),
('jose.martinez@yahoo.com', 'José', 'Martínez', 'GhT1w7', '+52(33)987-6543'),
('juan.rodriguez@gmail.com', 'Juan', 'Rodríguez', 'aBc123', '+34 912 345 678'),
('juan.sanchez@gmail.com', 'Juan', 'Sánchez', 'AsDfG1', '+1 (408)765-4321'),
('laura.garcia@gmail.com', 'Laura', 'García', 'sEd123', '+34 916 777 888'),
('lucia.gonzalez@gmail.com', 'Lucía', 'González', 'mNo456', '+34 919 555 666'),
('lucia.perez@hotmail.com', 'Lucía', 'Pérez', 'XcVbN9', '+34 911111111'),
('luisa.mendez@yahoo.com', 'Luisa', 'Méndez', 'L0pKj8', '+34 917 777 777'),
('maria.gomez@gmail.com', 'María', 'Gómez', 'M3kHd8', '+1 (555)123-4567'),
('maria.martin@yahoo.com', 'María', 'Martín', 'gHi789', '+34 914 777 555'),
('oscar.ortega@hotmail.com', 'Óscar', 'Ortega', 'PoiUy6', '+34 913333333'),
('pablo.flores@yahoo.com', 'Pablo', 'Flores', 'KjHgF4', '+1 (415)123-4567'),
('pablo.ruiz@yahoo.com', 'Pablo', 'Ruiz', 'pQr789', '+34 917 444 777'),
('pedro.lopez@hotmail.com', 'Pedro', 'López', 'dFg456', '+34 918 222 333'),
('sofia.estrada@yahoo.com', 'Sofía', 'Estrada', 'NmLkJ9', '+1 (650)765-4321');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `alimento`
--
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`id_alimento`);

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`id_bitacora`),
  ADD KEY `fk_bitacora_usuario` (`email`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `dieta`
--
ALTER TABLE `dieta`
  ADD PRIMARY KEY (`id_dieta`);

--
-- Indices de la tabla `dieta_alimento`
--
ALTER TABLE `dieta_alimento`
  ADD PRIMARY KEY (`id_dieta`,`id_alimento`),
  ADD KEY `fk_dieta_alimento_alimento` (`id_alimento`);

--
-- Indices de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`id_ejercicio`);

--
-- Indices de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`id_cu`);

--
-- Indices de la tabla `programa`
--
ALTER TABLE `programa`
  ADD PRIMARY KEY (`id_programa`);

--
-- Indices de la tabla `programa_dieta_cliente`
--
ALTER TABLE `programa_dieta_cliente`
  ADD PRIMARY KEY (`id_programa`,`id_dieta`,`email`),
  ADD KEY `fk_programa_dieta_cliente_dieta` (`id_dieta`),
  ADD KEY `fk_programa_dieta_cliente_cliente` (`email`);

--
-- Indices de la tabla `programa_ejercicio`
--
ALTER TABLE `programa_ejercicio`
  ADD PRIMARY KEY (`id_programa`,`id_ejercicio`),
  ADD KEY `fk_programa_ejercicio_ejercicio` (`id_ejercicio`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD PRIMARY KEY (`id_rol`,`id_cu`),
  ADD KEY `fk_rol_privilegio_privilegio` (`id_cu`);

--
-- Indices de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD PRIMARY KEY (`id_rol`,`email`),
  ADD KEY `fk_rol_usuario_usuario` (`email`);

--
-- Indices de la tabla `talla`
--
ALTER TABLE `talla`
  ADD PRIMARY KEY (`id_medida`),
  ADD KEY `fk_talla_cliente` (`email`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alimento`
--
ALTER TABLE `alimento`
  MODIFY `id_alimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `id_bitacora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `dieta`
--
ALTER TABLE `dieta`
  MODIFY `id_dieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `id_cu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `programa`
--
ALTER TABLE `programa`
  MODIFY `id_programa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `talla`
--
ALTER TABLE `talla`
  MODIFY `id_medida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `fk_admin_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Filtros para la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD CONSTRAINT `bitacora_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `fk_bitacora_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Filtros para la tabla `dieta_alimento`
--
ALTER TABLE `dieta_alimento`
  ADD CONSTRAINT `dieta_alimento_ibfk_1` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`),
  ADD CONSTRAINT `dieta_alimento_ibfk_2` FOREIGN KEY (`id_alimento`) REFERENCES `alimento` (`id_alimento`),
  ADD CONSTRAINT `fk_dieta_alimento_alimento` FOREIGN KEY (`id_alimento`) REFERENCES `alimento` (`id_alimento`),
  ADD CONSTRAINT `fk_dieta_alimento_dieta` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`);

--
-- Filtros para la tabla `programa_dieta_cliente`
--
ALTER TABLE `programa_dieta_cliente`
  ADD CONSTRAINT `fk_programa_dieta_cliente_cliente` FOREIGN KEY (`email`) REFERENCES `cliente` (`email`),
  ADD CONSTRAINT `fk_programa_dieta_cliente_dieta` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`),
  ADD CONSTRAINT `fk_programa_dieta_cliente_programa` FOREIGN KEY (`id_programa`) REFERENCES `programa` (`id_programa`),
  ADD CONSTRAINT `programa_dieta_cliente_ibfk_1` FOREIGN KEY (`id_programa`) REFERENCES `programa` (`id_programa`),
  ADD CONSTRAINT `programa_dieta_cliente_ibfk_2` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`),
  ADD CONSTRAINT `programa_dieta_cliente_ibfk_3` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Filtros para la tabla `programa_ejercicio`
--
ALTER TABLE `programa_ejercicio`
  ADD CONSTRAINT `fk_programa_ejercicio_ejercicio` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicio` (`id_ejercicio`),
  ADD CONSTRAINT `fk_programa_ejercicio_programa` FOREIGN KEY (`id_programa`) REFERENCES `programa` (`id_programa`),
  ADD CONSTRAINT `programa_ejercicio_ibfk_1` FOREIGN KEY (`id_programa`) REFERENCES `programa` (`id_programa`),
  ADD CONSTRAINT `programa_ejercicio_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicio` (`id_ejercicio`);

--
-- Filtros para la tabla `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD CONSTRAINT `fk_rol_privilegio_privilegio` FOREIGN KEY (`id_cu`) REFERENCES `privilegio` (`id_cu`),
  ADD CONSTRAINT `fk_rol_privilegio_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `rol_privilegio_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `rol_privilegio_ibfk_2` FOREIGN KEY (`id_cu`) REFERENCES `privilegio` (`id_cu`);

--
-- Filtros para la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD CONSTRAINT `fk_rol_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `fk_rol_usuario_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `rol_usuario_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `rol_usuario_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);

--
-- Filtros para la tabla `talla`
--
ALTER TABLE `talla`
  ADD CONSTRAINT `fk_talla_cliente` FOREIGN KEY (`email`) REFERENCES `cliente` (`email`),
  ADD CONSTRAINT `talla_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
