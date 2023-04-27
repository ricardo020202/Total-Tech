-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 27, 2023 at 11:17 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Onyx`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
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
-- Table structure for table `alimento`
--

CREATE TABLE `alimento` (
  `id_alimento` int(11) NOT NULL,
  `unidad` varchar(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion_alimento` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alimento`
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
-- Table structure for table `bitacora`
--

CREATE TABLE `bitacora` (
  `id_bitacora` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contenido` varchar(2500) NOT NULL,
  `entreno` varchar(200) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bitacora`
--

INSERT INTO `bitacora` (`id_bitacora`, `fecha`, `contenido`, `entreno`, `email`) VALUES
(1, '2023-04-22', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'maria.gomez@gmail.com'),
(2, '2023-04-22', 'Realicé una caminata al aire libre en el parque.', 'Caminata al aire libre', 'jose.martinez@yahoo.com'),
(3, '2023-04-22', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'lucia.perez@hotmail.com'),
(4, '2023-04-22', 'Realicé una sesión de entrenamiento en casa.', 'Entrenamiento de cardio en casa', 'juan.sanchez@gmail.com'),
(5, '2023-04-22', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'carlos.lopez@gmail.com'),
(6, '2023-04-22', 'Realicé una clase de yoga en el estudio.', 'Clase de yoga', 'ana.ramirez@hotmail.com'),
(7, '2023-04-22', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'pablo.flores@yahoo.com'),
(8, '2023-04-22', 'Realicé una caminata al aire libre en el parque.', 'Caminata al aire libre', 'clara.hernandez@gmail.com'),
(9, '2023-04-22', 'Realicé una sesión de entrenamiento con mi entrenador personal.', 'Entrenamiento de fuerza en el gimnasio', 'oscar.ortega@hotmail.com'),
(10, '2023-04-22', 'Realicé una sesión de entrenamiento en casa.', 'Entrenamiento de cardio en casa', 'sofia.estrada@yahoo.com');

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `email` varchar(30) NOT NULL,
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
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`email`, `altura`, `edad`, `nivel_actividad`, `objetivo`, `sexo`, `pr_BenchPress`, `pr_PesoMuerto`, `pr_Sentadillas`) VALUES
('a01708746@tec.mx', 185, 19, 'Alto', 'Mantener Peso Peso', 'Femenino', 80, 130, 100),
('ana.ramirez@hotmail.com', 165, 24, 'Bajo', 'Perder Peso', 'Femenino', 40, 70, 30),
('carlos.lopez@gmail.com', 178, 32, 'Alto', 'Ganar Masa Muscular', 'Masculino', 85, 120, 65),
('clara.hernandez@gmail.com', 170, 28, 'Moderado', 'Perder Grasa', 'Femenino', 45, 75, 30),
('jose.martinez@yahoo.com', 163, 27, 'Bajo', 'Perder Peso', 'Femenino', 40, 65, 30),
('juan.sanchez@gmail.com', 160, 30, 'Moderado', 'Perder Grasa', 'Femenino', 35, 60, 25),
('lucia.perez@hotmail.com', 182, 29, 'Alto', 'Ganar Fuerza', 'Masculino', 100, 150, 70),
('maria.gomez@gmail.com', 175, 35, 'Moderado', 'Ganar Masa Muscular', 'Masculino', 90, 130, 80),
('mike@hotmail.com', 186, 19, 'Alto', 'Mantener Peso Peso', 'Femenino', 80, 120, 100),
('oscar.ortega@hotmail.com', 175, 35, 'Moderado', 'Ganar Masa Muscular', 'Masculino', 90, 130, 80),
('pablo.flores@yahoo.com', 182, 29, 'Alto', 'Ganar Fuerza', 'Masculino', 95, 140, 75),
('ricoroca2@hotmail.com', 178, 21, 'Moderado', 'Ganar Peso', 'Masculino', 0, 0, 0),
('ricoroca3@hotmail.com', 178, 21, 'Moderado', 'Ganar Peso', 'Masculino', 0, 0, 0),
('Rob@hotmail.com', 12, 12, 'Alto', 'Ganar Peso', 'Femenino', 12, 12, 12),
('sofia.estrada@yahoo.com', 163, 27, 'Bajo', 'Perder Peso', 'Femenino', 40, 65, 30);

-- --------------------------------------------------------

--
-- Table structure for table `dieta`
--

CREATE TABLE `dieta` (
  `id_dieta` int(11) NOT NULL,
  `proteinas` int(11) NOT NULL,
  `grasas` int(11) NOT NULL,
  `carbohidratos` int(11) NOT NULL,
  `calorias` int(11) NOT NULL,
  `fibra_total` float DEFAULT NULL,
  `ceniza` float DEFAULT NULL,
  `calcio` float DEFAULT NULL,
  `fosforo` float DEFAULT NULL,
  `hierro` float DEFAULT NULL,
  `tiamina` float DEFAULT NULL,
  `riboflavina` float DEFAULT NULL,
  `niacina` float DEFAULT NULL,
  `vitamina_c` float DEFAULT NULL,
  `vitamina_a` float DEFAULT NULL,
  `ac_graso_mono` float DEFAULT NULL,
  `ac_graso_poli` float DEFAULT NULL,
  `ac_graso_saturado` float DEFAULT NULL,
  `colesterol` float DEFAULT NULL,
  `potasio` float DEFAULT NULL,
  `sodio` float DEFAULT NULL,
  `zinc` float DEFAULT NULL,
  `magnesio` float DEFAULT NULL,
  `vit_b6` float DEFAULT NULL,
  `vit_b12` float DEFAULT NULL,
  `ac_folico` float DEFAULT NULL,
  `folato` float DEFAULT NULL,
  `nombre_dieta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dieta`
--

INSERT INTO `dieta` (`id_dieta`, `proteinas`, `grasas`, `carbohidratos`, `calorias`, `fibra_total`, `ceniza`, `calcio`, `fosforo`, `hierro`, `tiamina`, `riboflavina`, `niacina`, `vitamina_c`, `vitamina_a`, `ac_graso_mono`, `ac_graso_poli`, `ac_graso_saturado`, `colesterol`, `potasio`, `sodio`, `zinc`, `magnesio`, `vit_b6`, `vit_b12`, `ac_folico`, `folato`, `nombre_dieta`) VALUES
(3, 152, 95, 308, 2700, 35.1, 17.7, 1482.4, 2156.4, 18.9, 1.4, 2.9, 23.7, 37.2, 2271.8, 27, 18.2, 28.9, 865.7, 3993.7, 1781.7, 16.1, 485.1, 2.2, 4.5, 0, 389.2, 'Dieta 2'),
(4, 100, 50, 200, 1800, 25, 15, 800, 1200, 10, 1, 2, 20, 20, 1500, 15, 10, 20, 500, 2500, 1000, 10, 400, 2, 3, 0, 300, 'Dieta 3'),
(5, 120, 80, 220, 2000, 30, 20, 1000, 1500, 12, 1.2, 2.5, 25, 25, 1800, 18, 12, 22, 550, 3000, 1200, 12, 450, 2.5, 3.5, 0, 350, 'Dieta 4'),
(6, 130, 70, 240, 2200, 32.5, 22, 1100, 1600, 14, 1.3, 2.7, 27.5, 27.5, 1950, 20, 13, 24, 600, 3250, 1300, 14, 500, 3, 4, 0, 375, 'Dieta 5'),
(7, 135, 90, 340, 2800, 30.5, 18.3, 1350.7, 1950.9, 22.5, 1.3, 2.7, 21.9, 33.6, 2150.3, 27.3, 16.5, 26.2, 800.9, 3600.8, 1590.2, 15.7, 470.4, 2, 4.1, 0, 365.2, 'Dieta 6');

-- --------------------------------------------------------

--
-- Table structure for table `dieta_alimento`
--

CREATE TABLE `dieta_alimento` (
  `id_dieta` int(11) NOT NULL,
  `id_alimento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dieta_alimento`
--

INSERT INTO `dieta_alimento` (`id_dieta`, `id_alimento`) VALUES
(3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ejercicio`
--

CREATE TABLE `ejercicio` (
  `id_ejercicio` int(11) NOT NULL,
  `categoria` varchar(20) NOT NULL,
  `nivel_intensidad` varchar(20) NOT NULL,
  `referencia_visual` varchar(100) NOT NULL,
  `descripcion_ejercicio` varchar(200) NOT NULL,
  `nombre_ejercicio` varchar(100) NOT NULL,
  `imagen_ejercicio` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ejercicio`
--

INSERT INTO `ejercicio` (`id_ejercicio`, `categoria`, `nivel_intensidad`, `referencia_visual`, `descripcion_ejercicio`, `nombre_ejercicio`, `imagen_ejercicio`) VALUES
(1, 'push', 'novato', 'pecho', 'favorece el desarrollo de la musculatura pectoral a través del movimiento de empuje con carga', 'Press de banca', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/press-de-banca.jpg'),
(2, 'pull', 'principiante', 'espalda', 'favorece el desarrollo de la musculatura de la espalda a través del movimiento de tracción con carga', 'Remo con barra', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/remo-con-barra.jpg'),
(3, 'full-body', 'intermedio', 'cuerpo completo', 'favorece el desarrollo de la musculatura de todo el cuerpo a través de ejercicios que involucran varios grupos musculares', 'Sentadilla', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/sentadilla.jpg'),
(5, 'hipertrofia', 'elite', 'glúteos', 'favorece el desarrollo de la masa muscular en los glúteos a través de ejercicios específicos con alta carga y repetición', 'Peso muerto', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/peso-muerto.jpg'),
(6, 'resistencia', 'monstruo!', 'abdomen', 'favorece el desarrollo de la resistencia muscular en el abdomen a través de ejercicios específicos con alta carga y alto volumen', 'Abdominales', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/abdominales.jpg'),
(7, 'pull', 'novato', 'bíceps', 'favorece el desarrollo de la musculatura del bíceps a través del movimiento de tracción con carga', 'Dominadas', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/dominadas.jpg'),
(8, 'push', 'principiante', 'hombros', 'favorece el desarrollo de la musculatura de los hombros a través del movimiento de empuje con carga', 'Press militar', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/press-militar.jpg'),
(9, 'full-body', 'intermedio', 'cuerpo completo', 'favorece el desarrollo de la musculatura de todo el cuerpo a través de ejercicios que involucran varios grupos musculares', 'Peso muerto', 'https://www.fitnessrevolucion.com/wp-content/uploads/2018/10/peso-muerto.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(30) NOT NULL,
  `token` varchar(200) NOT NULL,
  `expires` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `privilegio`
--

CREATE TABLE `privilegio` (
  `id_cu` int(11) NOT NULL,
  `nombrecu` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `privilegio`
--

INSERT INTO `privilegio` (`id_cu`, `nombrecu`) VALUES
(1, 'Consultar cuenta'),
(2, 'Modificar cuenta'),
(3, 'Eliminar cuenta'),
(4, 'Consultar programa'),
(5, 'Consultar dieta'),
(6, 'Registrar datos iniciales'),
(7, 'Consultar datos iniciales'),
(8, 'Modificar datos iniciales'),
(9, 'Registrar tallas'),
(10, 'Consultar tallas'),
(11, 'Registrar favoritos'),
(12, 'Consultar favoritos'),
(13, 'Eliminar favoritos'),
(14, 'Registrar bitácora'),
(15, 'Consultar bitácora'),
(16, 'Eliminar bitácora'),
(17, 'Consultar reporte de progreso'),
(18, 'Consultar ejercicio'),
(19, 'Registrar usuarios'),
(20, 'Consultar usuarios'),
(21, 'Modificar usuarios'),
(22, 'Eliminar usuarios'),
(23, 'Registrar rol'),
(24, 'Consultar rol'),
(25, 'Modificar rol'),
(26, 'Eliminar rol'),
(27, 'Consultar privilegio'),
(28, 'Eliminar privilegio'),
(29, 'Registrar dieta'),
(30, 'Modificar dieta'),
(31, 'Eliminar dieta'),
(32, 'Registrar programa'),
(33, 'Modificar programa'),
(34, 'Eliminar programa'),
(35, 'Registrar alimento'),
(36, 'Consultar alimento'),
(37, 'Modificar alimento'),
(38, 'Eliminar alimento'),
(39, 'Registrar ejercicio'),
(40, 'Modificar ejercicio'),
(41, 'Eliminar ejercicio'),
(42, 'Admin dashboard');

-- --------------------------------------------------------

--
-- Table structure for table `programa`
--

CREATE TABLE `programa` (
  `id_programa` int(11) NOT NULL,
  `frecuencia` int(11) NOT NULL,
  `descripcion_programa` varchar(200) NOT NULL,
  `nombre_programa` varchar(100) NOT NULL,
  `ref_visual` varchar(200) DEFAULT NULL,
  `img_programa` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programa`
--

INSERT INTO `programa` (`id_programa`, `frecuencia`, `descripcion_programa`, `nombre_programa`, `ref_visual`, `img_programa`) VALUES
(1, 0, 'comodin', 'comodin', NULL, NULL),
(9, 4, 'Programa de entrenamiento para realizar en casa sin necesidad de equipamiento especial', 'Programa de entrenamiento en casa', NULL, NULL),
(12, 4, 'abcdefg', 'abcdefg nombre', 'alt text', 'pexels-cottonbro-studio-4753996.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `programa_dieta_cliente`
--

CREATE TABLE `programa_dieta_cliente` (
  `id_programa` int(11) NOT NULL,
  `id_dieta` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programa_dieta_cliente`
--

INSERT INTO `programa_dieta_cliente` (`id_programa`, `id_dieta`, `email`, `tipo`) VALUES
(1, 3, 'mike@hotmail.com', 'dieta'),
(1, 4, 'a01708746@tec.mx', 'dieta'),
(1, 4, 'maria.gomez@gmail.com', 'dieta'),
(1, 4, 'maria.gomez@gmail.com', 'programa'),
(1, 4, 'mike@hotmail.com', 'dieta'),
(1, 4, 'ricoroca2@hotmail.com', 'dieta'),
(1, 5, 'mike@hotmail.com', 'dieta'),
(1, 5, 'ricoroca2@hotmail.com', 'dieta'),
(1, 6, 'mike@hotmail.com', 'dieta'),
(1, 6, 'ricoroca2@hotmail.com', 'dieta'),
(1, 7, 'mike@hotmail.com', 'dieta');

-- --------------------------------------------------------

--
-- Table structure for table `programa_ejercicio`
--

CREATE TABLE `programa_ejercicio` (
  `id_programa` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programa_ejercicio`
--

INSERT INTO `programa_ejercicio` (`id_programa`, `id_ejercicio`) VALUES
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `statusRol` varchar(20) NOT NULL,
  `nombreRol` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id_rol`, `statusRol`, `nombreRol`) VALUES
(1, 'on', 'administrador'),
(2, 'on', 'cliente');

-- --------------------------------------------------------

--
-- Table structure for table `rol_privilegio`
--

CREATE TABLE `rol_privilegio` (
  `id_rol` int(11) NOT NULL,
  `id_cu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rol_privilegio`
--

INSERT INTO `rol_privilegio` (`id_rol`, `id_cu`) VALUES
(1, 1),
(2, 1),
(1, 2),
(2, 2),
(1, 3),
(2, 3),
(1, 4),
(2, 4),
(1, 5),
(2, 5),
(1, 6),
(2, 6),
(1, 7),
(2, 7),
(1, 8),
(2, 8),
(1, 9),
(2, 9),
(1, 10),
(2, 10),
(1, 11),
(2, 11),
(1, 12),
(2, 12),
(1, 13),
(2, 13),
(1, 14),
(2, 14),
(1, 15),
(2, 15),
(1, 16),
(2, 16),
(1, 17),
(2, 17),
(1, 18),
(2, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29),
(1, 30),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 40),
(1, 41),
(1, 42);

-- --------------------------------------------------------

--
-- Table structure for table `rol_usuario`
--

CREATE TABLE `rol_usuario` (
  `id_rol` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rol_usuario`
--

INSERT INTO `rol_usuario` (`id_rol`, `email`, `fecha`) VALUES
(1, 'a01352033@tec.mx', '2023-04-22'),
(1, 'a01708746@tec.mx', '2023-04-26'),
(1, 'clara.hernandez@gmail.com', '2023-04-22'),
(1, 'maria.gomez@gmail.com', '2023-04-22'),
(1, 'sofia.estrada@yahoo.com', '2023-04-22'),
(2, 'alexa@hotmail.com', '2023-04-27'),
(2, 'juan.sanchez@gmail.com', '2023-04-22'),
(2, 'mike@hotmail.com', '2023-04-26'),
(2, 'pablo.flores@yahoo.com', '2023-04-22'),
(2, 'ricoroca2@hotmail.com', '2023-04-25'),
(2, 'ricoroca3@hotmail.com', '2023-04-25'),
(2, 'Rob@hotmail.com', '2023-04-26');

-- --------------------------------------------------------

--
-- Table structure for table `sesiones`
--

CREATE TABLE `sesiones` (
  `id_sesion` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `talla`
--

CREATE TABLE `talla` (
  `id_medida` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `extremidad` varchar(50) NOT NULL,
  `medida` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `talla`
--

INSERT INTO `talla` (`id_medida`, `email`, `extremidad`, `medida`, `fecha`) VALUES
(1, 'maria.gomez@gmail.com', 'Brazo', 30, '2023-04-22'),
(2, 'jose.martinez@yahoo.com', 'Brazo', 36, '2023-04-22'),
(3, 'lucia.perez@hotmail.com', 'Pierna', 56, '2023-04-22'),
(4, 'juan.sanchez@gmail.com', 'Pierna', 61, '2023-04-22'),
(5, 'carlos.lopez@gmail.com', 'Cintura', 85, '2023-04-22'),
(6, 'ana.ramirez@hotmail.com', 'Cadera', 100, '2023-04-22'),
(7, 'pablo.flores@yahoo.com', 'Brazo', 33, '2023-04-22'),
(8, 'clara.hernandez@gmail.com', 'Brazo', 27, '2023-04-22'),
(9, 'oscar.ortega@hotmail.com', 'Pecho', 95, '2023-04-22'),
(10, 'sofia.estrada@yahoo.com', 'Espalda', 40, '2023-04-22');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(30) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `contraseña` varchar(400) NOT NULL,
  `user_pic` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`email`, `nombre`, `apellido`, `contraseña`, `user_pic`) VALUES
('a01352033@tec.mx', 'Manuelito', 'adminsito', '$2a$12$Kp7VffOlNWnfzAeUdZWXQe7nguLk5kNvLXohDnKe5PMJRRnAFA77y', 'default.png'),
('a01708746@tec.mx', 'Gamaliel', 'Mo', '$2a$12$zNRJbgY7MMKZVPZiW7ia9uBSSXAcwDEw7QJBZtJGbfD3Yl4J6qdCm', 'default.png'),
('alexa@hotmail.com', 'Alexa', 'A', '$2a$12$wwslA6ycJliKm9knh3CZzuwde.cyqGldvAre1GEQiOwZ52OQBegCC', 'default.png'),
('ana.perez@hotmail.com', 'Ana', 'Pérez', 'qWe456', NULL),
('ana.ramirez@hotmail.com', 'Ana', 'Ramírez', 'ZxTyU2', NULL),
('carlos.lopez@gmail.com', 'Carlos', 'López', 'QwErT7', NULL),
('carlos.sanchez@yahoo.com', 'Carlos', 'Sánchez', 'zXc789', NULL),
('clara.hernandez@gmail.com', 'Clara', 'Hernández', 'VbNmL0', NULL),
('clara.hernandez@hotmail.com', 'Clara', 'Hernández', 'tUv123', NULL),
('david.fernandez@hotmail.com', 'David', 'Fernández', 'ZxAsD5', NULL),
('jose.fernandez@hotmail.com', 'José', 'Fernández', 'jKl123', NULL),
('jose.martinez@yahoo.com', 'José', 'Martínez', 'GhT1w7', NULL),
('juan.rodriguez@gmail.com', 'Juan', 'Rodríguez', 'aBc123', NULL),
('juan.sanchez@gmail.com', 'Juan', 'Sánchez', 'AsDfG1', NULL),
('laura.garcia@gmail.com', 'Laura', 'García', 'sEd123', NULL),
('lucia.gonzalez@gmail.com', 'Lucía', 'González', 'mNo456', NULL),
('lucia.perez@hotmail.com', 'Lucía', 'Pérez', 'XcVbN9', NULL),
('luisa.mendez@yahoo.com', 'Luisa', 'Méndez', 'L0pKj8', NULL),
('maria.gomez@gmail.com', 'María', 'Gómez', 'M3kHd8', NULL),
('maria.martin@yahoo.com', 'María', 'Martín', 'gHi789', NULL),
('mike@hotmail.com', 'Mike', 'Mo', '$2a$12$Uro/E/0p/hc1k12GMcUM7e4U4Wde6Mq2mDnI/L4j6jHF4zNm51Ffm', 'default.png'),
('oscar.ortega@hotmail.com', 'Óscar', 'Ortega', 'PoiUy6', NULL),
('pablo.flores@yahoo.com', 'Pablo', 'Flores', 'KjHgF4', NULL),
('pablo.ruiz@yahoo.com', 'Pablo', 'Ruiz', 'pQr789', NULL),
('pedro.lopez@hotmail.com', 'Pedro', 'López', 'dFg456', NULL),
('ricoroca2@hotmail.com', 'Ricardo', 'Rosales', '$2a$12$6FWRzfsYU3akZx3/d5lHz./HYdHrB1P6qzS11NDnBH66sY5cZralm', 'default.png'),
('ricoroca3@hotmail.com', 'Ricardo', 'Rosales', '$2a$12$ac.CRaY4U9ZU7Ojpb1yojesspHdmHtzJKlujoAP1vDDZiY8W0v6y2', 'default.png'),
('Rob@hotmail.com', 'Roberto', 'Mo', '$2a$12$d1tq7ktq0fPKCvrfggUqTurbJFCdSYIgTbCjRdw8rmUnSqoUxk4km', 'default.png'),
('sofia.estrada@yahoo.com', 'Sofía', 'Estrada', 'NmLkJ9', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `alimento`
--
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`id_alimento`);

--
-- Indexes for table `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`id_bitacora`),
  ADD KEY `fk_bitacora_usuario` (`email`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `dieta`
--
ALTER TABLE `dieta`
  ADD PRIMARY KEY (`id_dieta`);

--
-- Indexes for table `dieta_alimento`
--
ALTER TABLE `dieta_alimento`
  ADD PRIMARY KEY (`id_dieta`,`id_alimento`),
  ADD KEY `fk_dieta_alimento_alimento` (`id_alimento`);

--
-- Indexes for table `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`id_ejercicio`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`,`token`);

--
-- Indexes for table `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`id_cu`);

--
-- Indexes for table `programa`
--
ALTER TABLE `programa`
  ADD PRIMARY KEY (`id_programa`);

--
-- Indexes for table `programa_dieta_cliente`
--
ALTER TABLE `programa_dieta_cliente`
  ADD PRIMARY KEY (`id_programa`,`id_dieta`,`email`,`tipo`),
  ADD KEY `fk_programa_dieta_cliente_dieta` (`id_dieta`),
  ADD KEY `fk_programa_dieta_cliente_cliente` (`email`);

--
-- Indexes for table `programa_ejercicio`
--
ALTER TABLE `programa_ejercicio`
  ADD PRIMARY KEY (`id_programa`,`id_ejercicio`),
  ADD KEY `fk_programa_ejercicio_ejercicio` (`id_ejercicio`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD PRIMARY KEY (`id_rol`,`id_cu`),
  ADD KEY `fk_rol_privilegio_privilegio` (`id_cu`);

--
-- Indexes for table `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD PRIMARY KEY (`id_rol`,`email`),
  ADD KEY `fk_rol_usuario_usuario` (`email`);

--
-- Indexes for table `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id_sesion`);

--
-- Indexes for table `talla`
--
ALTER TABLE `talla`
  ADD PRIMARY KEY (`id_medida`),
  ADD KEY `fk_talla_cliente` (`email`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alimento`
--
ALTER TABLE `alimento`
  MODIFY `id_alimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `id_bitacora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `dieta`
--
ALTER TABLE `dieta`
  MODIFY `id_dieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `id_cu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `programa`
--
ALTER TABLE `programa`
  MODIFY `id_programa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rol_usuario`
--
ALTER TABLE `rol_usuario`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id_sesion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `talla`
--
ALTER TABLE `talla`
  MODIFY `id_medida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `fk_admin_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Constraints for table `bitacora`
--
ALTER TABLE `bitacora`
  ADD CONSTRAINT `bitacora_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `fk_bitacora_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Constraints for table `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Constraints for table `dieta_alimento`
--
ALTER TABLE `dieta_alimento`
  ADD CONSTRAINT `dieta_alimento_ibfk_1` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`),
  ADD CONSTRAINT `dieta_alimento_ibfk_2` FOREIGN KEY (`id_alimento`) REFERENCES `alimento` (`id_alimento`),
  ADD CONSTRAINT `fk_dieta_alimento_alimento` FOREIGN KEY (`id_alimento`) REFERENCES `alimento` (`id_alimento`),
  ADD CONSTRAINT `fk_dieta_alimento_dieta` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`);

--
-- Constraints for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `fk_password_resets` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Constraints for table `programa_dieta_cliente`
--
ALTER TABLE `programa_dieta_cliente`
  ADD CONSTRAINT `fk_programa_dieta_cliente_cliente` FOREIGN KEY (`email`) REFERENCES `cliente` (`email`),
  ADD CONSTRAINT `fk_programa_dieta_cliente_dieta` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_programa_dieta_cliente_programa` FOREIGN KEY (`id_programa`) REFERENCES `programa` (`id_programa`) ON DELETE CASCADE,
  ADD CONSTRAINT `programa_dieta_cliente_ibfk_1` FOREIGN KEY (`id_programa`) REFERENCES `programa` (`id_programa`),
  ADD CONSTRAINT `programa_dieta_cliente_ibfk_2` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`),
  ADD CONSTRAINT `programa_dieta_cliente_ibfk_3` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);

--
-- Constraints for table `programa_ejercicio`
--
ALTER TABLE `programa_ejercicio`
  ADD CONSTRAINT `fk_programa_ejercicio_ejercicio` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicio` (`id_ejercicio`),
  ADD CONSTRAINT `fk_programa_ejercicio_programa` FOREIGN KEY (`id_programa`) REFERENCES `programa` (`id_programa`),
  ADD CONSTRAINT `programa_ejercicio_ibfk_1` FOREIGN KEY (`id_programa`) REFERENCES `programa` (`id_programa`),
  ADD CONSTRAINT `programa_ejercicio_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicio` (`id_ejercicio`);

--
-- Constraints for table `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD CONSTRAINT `fk_rol_privilegio_privilegio` FOREIGN KEY (`id_cu`) REFERENCES `privilegio` (`id_cu`),
  ADD CONSTRAINT `fk_rol_privilegio_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `rol_privilegio_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `rol_privilegio_ibfk_2` FOREIGN KEY (`id_cu`) REFERENCES `privilegio` (`id_cu`);

--
-- Constraints for table `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD CONSTRAINT `fk_rol_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `fk_rol_usuario_usuario` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `rol_usuario_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`),
  ADD CONSTRAINT `rol_usuario_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);

--
-- Constraints for table `talla`
--
ALTER TABLE `talla`
  ADD CONSTRAINT `fk_talla_cliente` FOREIGN KEY (`email`) REFERENCES `cliente` (`email`),
  ADD CONSTRAINT `talla_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
