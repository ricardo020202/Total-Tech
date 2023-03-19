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
    const result = await Ejercicio.deleteById(1);
    expect(result[0].affectedRows).toBe(1);
});


// // Test Ejercicio model methods fetchById, deleteById, fetchAll and save conected to database

// describe('Ejercicio model', () => {


//     test('Save method should save a new Ejercicio', async () => {
//         // Create an instance of Ejercicio with some sample data
//         const ejercicio = new Ejercicio({
//             categoria: 'Categoria 1',
//             nivel_intensidad: 'Nivel 1',
//             referencia_visual: 'Referencia 1',
//             descripcion_ejercicio: 'Descripcion 1',
//             nombre_ejercicio: 'Ejercicio 1',
//             imagen_ejercicio: 'Imagen 1'
//         });

//         // Call the save() method on the Ejercicio instance
//         const insertedEjercicio = await ejercicio.save();

//         // console.log(insertedEjercicio);
//         // Retrieve the inserted data from the database using a SELECT query
//         // show the inserted data


//         // Compare the inserted data with the sample data
//         expect(insertedEjercicio.categoria).toBe(ejercicio.categoria);
//         expect(insertedEjercicio.nivel_intensidad).toBe(ejercicio.nivel_intensidad);
//         expect(insertedEjercicio.referencia_visual).toBe(ejercicio.referencia_visual);
//         expect(insertedEjercicio.descripcion_ejercicio).toBe(ejercicio.descripcion_ejercicio);
//         expect(insertedEjercicio.nombre_ejercicio).toBe(ejercicio.nombre_ejercicio);
//         expect(insertedEjercicio.imagen_ejercicio).toBe(ejercicio.imagen_ejercicio);
//     });
// });


// describe('Ejercicio model', () => {
//     test('should create a new Ejercicio', () => {
//         const ejercicio = new Ejercicio({
//             nombre: 'Ejercicio 1',
//             descripcion: 'Ejercicio 1',
//             categoria: 'Ejercicio 1',
//             nivelDeIntensidad: 'Ejercicio 1',
//             referenciaVisual: 'Ejercicio 1'
//         });
//         expect(ejercicio.nombre).toBe('Ejercicio 1');
//         expect(ejercicio.descripcion).toBe('Ejercicio 1');
//         expect(ejercicio.categoria).toBe('Ejercicio 1');
//         expect(ejercicio.nivelDeIntensidad).toBe('Ejercicio 1');
//         expect(ejercicio.referenciaVisual).toBe('Ejercicio 1');
//     });
//     test('should save a new Ejercicio', async () => {
//         const ejercicio = new Ejercicio({
//             nombre: 'Ejercicio 1',
//             descripcion: 'Ejercicio 1',
//             categoria: 'Ejercicio 1',
//             nivelDeIntensidad: 'Ejercicio 1',
//             referenciaVisual: 'Ejercicio 1'
//         });
//         const result = await ejercicio.save();
//         expect(result).toBe(1);
//     });
//     test('should fetch all Ejercicios', async () => {
//         const result = await Ejercicio.fetchAll();
//         expect(result).toBe(1);
//     });
// });
