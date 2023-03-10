-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-03-2023 a las 19:36:14
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
(2, '1', 200, 'Pollo asado sin piel'),
(3, '2', 250, 'Ensalada César con pollo a la parrilla'),
(4, '1', 100, 'Atún enlatado en agua'),
(5, '3', 150, 'Fresas frescas'),
(6, '1', 100, 'Huevo cocido'),
(7, '2', 300, 'Arroz integral cocido'),
(8, '1', 50, 'Camarones cocidos'),
(9, '3', 200, 'Arándanos frescos'),
(10, '2', 100, 'Papa cocida sin piel'),
(11, '3', 150, 'Mango fresco cortado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `id_bitacora` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contenido` varchar(2500) NOT NULL,
  `entreno` varchar(200) NOT NULL,
  `email` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `email` varchar(30) NOT NULL,
  `peso` int(11) NOT NULL,
  `estatura` int(11) NOT NULL,
  `altura` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `nivel_actividad` int(11) NOT NULL,
  `objetivo` varchar(20) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `pr_BenchPress` int(11) NOT NULL,
  `pr_PesoMuerto` int(11) NOT NULL,
  `pr_Sentadillas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`email`, `peso`, `estatura`, `altura`, `edad`, `nivel_actividad`, `objetivo`, `sexo`, `pr_BenchPress`, `pr_PesoMuerto`, `pr_Sentadillas`) VALUES
('juan.lopez@gmail.com', 80, 0, 175, 35, 0, 'Ganar Masa Muscular', 'M', 90, 130, 80),
('maria.rodriguez@yahoo.com', 57, 0, 163, 27, 0, 'Perder Peso', 'F', 40, 65, 30),
('carlos.martinez@gmail.com', 90, 0, 182, 29, 0, 'Ganar Fuerza', 'M', 100, 150, 70),
('ana.gonzalez@hotmail.com', 55, 0, 160, 30, 0, 'Perder Grasa', 'F', 35, 60, 25),
('jose.perez@gmail.com', 75, 0, 178, 32, 0, 'Ganar Masa Muscular', 'M', 85, 120, 65),
('laura.hernandez@yahoo.com', 58, 0, 165, 24, 0, 'Perder Peso', 'F', 40, 70, 30),
('daniel.lopez@hotmail.com', 80, 0, 182, 29, 0, 'Ganar Fuerza', 'M', 95, 140, 75),
('carmen.perez@gmail.com', 62, 0, 170, 28, 0, 'Perder Grasa', 'F', 45, 75, 30),
('juan.lopez@gmail.com', 80, 0, 175, 35, 0, 'Ganar Masa Muscular', 'M', 90, 130, 80),
('maria.rodriguez@yahoo.com', 57, 0, 163, 27, 0, 'Perder Peso', 'F', 40, 65, 30),
('carlos.martinez@gmail.com', 90, 0, 182, 29, 0, 'Ganar Fuerza', 'M', 100, 150, 70),
('ana.gonzalez@hotmail.com', 55, 0, 160, 30, 0, 'Perder Grasa', 'F', 35, 60, 25),
('jose.perez@gmail.com', 75, 0, 178, 32, 0, 'Ganar Masa Muscular', 'M', 85, 120, 65),
('laura.hernandez@yahoo.com', 58, 0, 165, 24, 0, 'Perder Peso', 'F', 40, 70, 30),
('daniel.lopez@hotmail.com', 80, 0, 182, 29, 0, 'Ganar Fuerza', 'M', 95, 140, 75),
('carmen.perez@gmail.com', 62, 0, 170, 28, 0, 'Perder Grasa', 'F', 45, 75, 30);

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
  `nombre_dieta` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dieta`
--

INSERT INTO `dieta` (`id_dieta`, `no_calorias`, `proteinas`, `grasas`, `carbohidratos`, `micronutrientes`, `macronutrientes`, `nombre_dieta`) VALUES
(1, 1300, 250, 43, 75, 'Vitamina A', 'Grasa', 'Spaghetti'),
(1, 1300, 250, 43, 75, 'Vitamina A', 'Grasa', 'Spaghetti'),
(2, 1200, 60, 10, 130, 'Vitamina C', 'Grasa', 'Ensalada de Quinoa'),
(3, 3500, 350, 100, 250, 'Creatina', 'Proteína', 'Pechuga de pollo con'),
(4, 1500, 100, 60, 50, 'Vitamina D', 'Grasa', 'Salmón con espinacas'),
(5, 2000, 100, 140, 20, 'Magnesio', 'Grasa', 'Hamburguesa con agua'),
(6, 1800, 90, 40, 150, 'Fibra', 'Carbohidrato', 'Avena con frutas'),
(7, 1600, 80, 30, 120, 'Cromo', 'Carbohidrato', 'Ensalada de salmón y'),
(8, 2000, 80, 50, 150, 'Vitamina E', 'Grasa', 'Batido de frutas y v');

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
(2, 'push', 'novato', 'pecho', 'favorece el desarrollo de la musculatura pectoral a través del movimiento de empuje con carga'),
(3, 'pull', 'principiante', 'espalda', 'favorece el desarrollo de la musculatura de la espalda a través del movimiento de tracción con carga'),
(4, 'full-body', 'intermedio', 'cuerpo completo', 'favorece el desarrollo de la musculatura de todo el cuerpo a través de ejercicios que involucran varios grupos musculares'),
(5, 'fuerza', 'avanzado', 'brazos', 'favorece el desarrollo de la fuerza muscular en los brazos a través de ejercicios específicos de carga'),
(6, 'hipertrofia', 'elite', 'glúteos', 'favorece el desarrollo de la masa muscular en los glúteos a través de ejercicios específicos con alta carga y repetición'),
(7, 'resistencia', 'monstruo!', 'abdomen', 'favorece el desarrollo de la resistencia muscular en el abdomen a través de ejercicios específicos con alta carga y alto volumen'),
(8, 'pull', 'novato', 'bíceps', 'favorece el desarrollo de la musculatura del bíceps a través del movimiento de tracción con carga'),
(9, 'push', 'principiante', 'hombros', 'favorece el desarrollo de la musculatura de los hombros a través del movimiento de empuje con carga'),
(10, 'full-body', 'intermedio', 'cuerpo completo', 'favorece el desarrollo de la musculatura de todo el cuerpo a través de ejercicios que involucran varios grupos musculares');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegio`
--

CREATE TABLE `privilegio` (
  `id_cu` int(11) NOT NULL,
  `nombreCu` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa`
--

CREATE TABLE `programa` (
  `id_programa` int(11) NOT NULL,
  `frecuencia` int(11) NOT NULL,
  `descripcion_programa` varchar(200) NOT NULL,
  `nombre_programa` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_dieta_cliente`
--

CREATE TABLE `programa_dieta_cliente` (
  `id_programa` int(11) NOT NULL,
  `id_dieta` int(11) NOT NULL,
  `email` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_ejercicio`
--

CREATE TABLE `programa_ejercicio` (
  `id_programa` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `nombreRol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `status`, `nombreRol`) VALUES
(1, 0, 'administrador'),
(2, 0, 'cliente'),
(3, 0, 'cliente'),
(4, 0, 'administrador'),
(5, 0, 'cliente'),
(6, 0, 'administrador'),
(7, 0, 'cliente'),
(8, 0, 'cliente'),
(9, 0, 'administrador'),
(10, 0, 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_privilegio`
--

CREATE TABLE `rol_privilegio` (
  `id_rol` int(11) NOT NULL,
  `id_cu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_usuario`
--

CREATE TABLE `rol_usuario` (
  `id_rol` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talla`
--

CREATE TABLE `talla` (
  `id_medida` int(11) NOT NULL,
  `extremidad` int(11) NOT NULL,
  `medida` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `email` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `talla`
--

INSERT INTO `talla` (`id_medida`, `extremidad`, `medida`, `fecha`, `email`) VALUES
(124, 0, 32, '2022-10-12', 'lucia.perez@hotmail.'),
(356, 0, 42, '2022-02-27', 'pablo.flores@yahoo.c'),
(820, 0, 30, '2022-04-01', 'oscar.ortega@hotmail'),
(195, 0, 35, '2023-02-08', 'maria.gomez@gmail.co'),
(547, 0, 28, '2022-07-14', 'clara.hernandez@gmai'),
(679, 0, 40, '2023-01-06', 'juan.sanchez@gmail.c'),
(932, 0, 31, '2022-11-23', 'sofia.estrada@yahoo.'),
(438, 0, 34, '2023-03-01', 'jose.martinez@yahoo.'),
(761, 0, 29, '2022-03-19', 'ana.ramirez@hotmail.'),
(120, 0, 39, '2022-12-05', 'carlos.lopez@gmail.c');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(30) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `contraseña` varchar(15) NOT NULL,
  `telefono` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `nombre`, `apellido`, `contraseña`, `telefono`) VALUES
('maria.gomez@gmail.com', 'María', 'Gómez', 'M3kHd8', '+1 (555) 123-45'),
('jose.martinez@yahoo.com', 'José', 'Martínez', 'GhT1w7', '+52 (33) 987-65'),
('lucia.perez@hotmail.com', 'Lucía', 'Pérez', 'XcVbN9', '+34 911 111 111'),
('juan.sanchez@gmail.com', 'Juan', 'Sánchez', 'AsDfG1', '+1 (408) 765-43'),
('carlos.lopez@gmail.com', 'Carlos', 'López', 'QwErT7', '+52 (55) 5555-5'),
('ana.ramirez@hotmail.com', 'Ana', 'Ramírez', 'ZxTyU2', '+34 912 222 222'),
('pablo.flores@yahoo.com', 'Pablo', 'Flores', 'KjHgF4', '+1 (415) 123-45'),
('clara.hernandez@gmail.com', 'Clara', 'Hernández', 'VbNmL0', '+52 (55) 1234-5'),
('oscar.ortega@hotmail.com', 'Óscar', 'Ortega', 'PoiUy6', '+34 913 333 333'),
('sofia.estrada@yahoo.com', 'Sofía', 'Estrada', 'NmLkJ9', '+1 (650) 765-43');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
