// Test Bitacora model

const Bitacora = require("../models/bitacora");
const db = require("../util/database");

describe("Bitacora model", () => {
    test("Save bitacora", async () => {
        const bitacora = new Bitacora({
            // fecha actual del sistema
            fecha: new Date(),
            contenido: "Test",
            entreno: "test",
            email: "dante@123.com", // must exist in usuario table
        });
        const result = await bitacora.save();
        expect(result[0].affectedRows).toBe(1);
        db.end();
    });
});
