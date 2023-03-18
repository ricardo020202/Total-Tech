// Test Ejercicio model
const Ejercicio = require('../models/ejercicio');
const db = require('../util/database');

describe('Ejercicio model', () => {
    test('should create a new Ejercicio', () => {
        const ejercicio = new Ejercicio({
            nombre: 'Ejercicio 1',
            descripcion: 'Ejercicio 1',
            categoria: 'Ejercicio 1',
            nivelDeIntensidad: 'Ejercicio 1',
            referenciaVisual: 'Ejercicio 1'
        });
        expect(ejercicio.nombre).toBe('Ejercicio 1');
        expect(ejercicio.descripcion).toBe('Ejercicio 1');
        expect(ejercicio.categoria).toBe('Ejercicio 1');
        expect(ejercicio.nivelDeIntensidad).toBe('Ejercicio 1');
        expect(ejercicio.referenciaVisual).toBe('Ejercicio 1');
    });
    test('should save a new Ejercicio', async () => {
        const ejercicio = new Ejercicio({
            nombre: 'Ejercicio 1',
            descripcion: 'Ejercicio 1',
            categoria: 'Ejercicio 1',
            nivelDeIntensidad: 'Ejercicio 1',
            referenciaVisual: 'Ejercicio 1'
        });
        const result = await ejercicio.save();
        expect(result).toBe(1);
    });
    test('should fetch all Ejercicios', async () => {
        const result = await Ejercicio.fetchAll();
        expect(result).toBe(1);
    });
});


