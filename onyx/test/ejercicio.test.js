// Test Ejercicio model
const Ejercicio = require("../models/ejercicio");
const db = require('../util/database');
;

describe('Ejercicio model', () => {

    // test database connection
    test('database connection', async () => {
        const result = await db.execute('SELECT 1');
        expect(result[0][0]['1']).toBe(1);
    });

    // Create a new exercise and save it to the database
    test('save exercise', async () => {
        const ejercicio = new Ejercicio({ // Create a new exercise object
            categoria: 'cardio',
            nivel_intensidad: 'alto',
            referencia_visual: 'https://example.com',
            descripcion_ejercicio: 'Correr en el sitio',
            nombre_ejercicio: 'Correr',
            imagen_ejercicio: 'https://example.com/correr.jpg'
        });
        const result = await ejercicio.save(); // Save the exercise to the database
        expect(result[0].affectedRows).toBe(1); // If the exercise was saved, the affectedRows should be 1
    });

    // Fetch all exercises from the database
    test('fetch all exercises', async () => { // Fetch all exercises from the database
        const result = await Ejercicio.fetchAll(); // Fetch all exercises from the database
        expect(result[0].length).toBeGreaterThan(0); // If there are exercises in the database, the length should be greater than 0
    });

    // Fetch an exercise by ID from the database
    test('fetch exercise by ID', async () => { // Fetch an exercise by ID from the database
        const result = await Ejercicio.fetchById(1); // Fetch the exercise with ID 1
        expect(result[0].length).toBe(1); // If the exercise with ID 1 exists, the length should be 1
    });

    // Update an exercise in the database
    test('update exercise', async () => { // Update an exercise in the database
        const ejercicio = new Ejercicio({ // Create a new exercise object
            id_ejercicio: 1,
            categoria: 'fuerza',
            nivel_intensidad: 'medio',
            referencia_visual: 'https://example.com',
            descripcion_ejercicio: 'Levantamiento de pesas',
            nombre_ejercicio: 'Pesas',
            imagen_ejercicio: 'https://example.com/pesas.jpg'
        });
        const result = await ejercicio.update(); // Update the exercise in the database
        expect(result[0].affectedRows).toBe(1); // If the exercise was updated, the affectedRows should be 1
    });

    // Delete an exercise from the database
    test('delete exercise by ID', async () => {
        // Delete the exercise with ID n
        // If you run the code find the ID of the exercise you want to delete
        const result = await Ejercicio.deleteById(44); // Change this number to the ID of the exercise you want to delete
        expect(result[0].affectedRows).toBe(1); // If the exercise was deleted, the affectedRows should be 1
        // close the database connection
        db.end();
    });


});



