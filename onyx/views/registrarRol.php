<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "onyx";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Tomar y limpiar valores del formulario
$id_rol = mysqli_real_escape_string($conn, $_POST['id_rol']);
$nombre_rol = mysqli_real_escape_string($conn, $_POST['nombre_rol']);
$id_cu = mysqli_real_escape_string($conn, $_POST['id_cu']);

// Convertir la lista de IDs de casos de uso separados por comas en un array
$id_cu_array = explode(',', $id_cu);

// Insertar datos en la tabla rol
$sql_rol = "INSERT INTO rol (id_rol, nombreRol, statusRol) VALUES ('$id_rol', '$nombre_rol', 'on')";
if ($conn->query($sql_rol) === TRUE) {
    echo "Nuevo rol registrado correctamente.<br>";
} else {
    echo "Error: " . $sql_rol . "<br>" . $conn->error;
}

// Insertar datos en la tabla rol_privilegio
foreach ($id_cu_array as $id_cu_individual) {
    $id_cu_individual = trim($id_cu_individual); // Remover espacios en blanco
    $sql_privilegio = "INSERT INTO rol_privilegio (id_rol, id_cu) VALUES ('$id_rol', '$id_cu_individual')";
    if ($conn->query($sql_privilegio) === TRUE) {
        echo "Privilegio (ID: $id_cu_individual) asignado al rol correctamente.<br>";
    } else {
        echo "Error: " . $sql_privilegio . "<br>" . $conn->error;
    }
}

// Cerrar conexión
$conn->close();
?>