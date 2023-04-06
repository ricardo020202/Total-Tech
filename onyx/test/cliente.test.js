// Test Cliente model

const Cliente = require("../models/cliente");
const db = require("../util/database");

describe("Cliente model", () => {
    // test database connection
    test("Database connection", async () => {
        const result = await db.execute("SELECT 1");
        expect(result[0][0]["1"]).toBe(1);
    });

    // Create a new client and save it to the database
    test("Create a new client", async () => {
        const cliente = new Cliente({
            email: "123@221.com", // change this to a new email every time you run the test it must agree the email with email in usario table
            altura: 120,
            edad: 20,
            nivel_actividad: "alto",
            objetivo: "Perder Peso",
            sexo: "Masculino",
            pr_BenchPress: 100,
            pr_PesoMuerto: 100,
            pr_Sentadillas: 100,
        });
        const result = await cliente.save();
        expect(result[0].affectedRows).toBe(1);
    });

    // Update a client
    test('Update a client', async () => {
        const cliente = new Cliente({
            email: '123@123.com', 
            altura : 120, // 178
            edad: 20, // 32
            nivel_actividad: 'Bajo', // 'Alto'
            objetivo: 'Perder Peso', // 'Ganar Masa Muscular'
            sexo: 'Femenino', // 'Masculino'
            pr_BenchPress: 100, // 85
            pr_PesoMuerto: 100, //120
            pr_Sentadillas: 100 // 65
        });

        const result = await cliente.update();
        expect(result[0].affectedRows).toBe(1);
    });
});
