// Test Ejercicio model
const Ejercicio = require("../models/ejercicio");
const db = require('../util/database');

// Create a new exercise and save it to the database
test('save exercise', async () => {
    const ejercicio = new Ejercicio({
        categoria: 'cardio',
        nivel_intensidad: 'alto',
        referencia_visual: 'https://example.com',
        descripcion_ejercicio: 'Correr en el sitio',
        nombre_ejercicio: 'Correr',
        imagen_ejercicio: 'https://example.com/correr.jpg'
    });
    const result = await ejercicio.save();
    expect(result[0].affectedRows).toBe(1);
});

// Fetch all exercises from the database
test('fetch all exercises', async () => {
    const result = await Ejercicio.fetchAll();
    expect(result[0].length).toBeGreaterThan(0);
});

// Fetch an exercise by ID from the database
test('fetch exercise by ID', async () => {
    const result = await Ejercicio.fetchById(1);
    expect(result[0].length).toBe(1);
});

// Update an exercise in the database
test('update exercise', async () => {
    const ejercicio = new Ejercicio({
        id_ejercicio: 1,
        categoria: 'fuerza',
        nivel_intensidad: 'medio',
        referencia_visual: 'https://example.com',
        descripcion_ejercicio: 'Levantamiento de pesas',
        nombre_ejercicio: 'Pesas',
        imagen_ejercicio: 'https://example.com/pesas.jpg'
    });
    const result = await ejercicio.update();
    expect(result[0].affectedRows).toBe(1);
});

// Delete an exercise from the database
test('delete exercise by ID', async () => {
    // Delete the exercise with ID n
    // If you run the code find the ID of the exercise you want to delete
    const result = await Ejercicio.deleteById(38);
    expect(result[0].affectedRows).toBe(1);
    // close the database connection
    db.end();
});
