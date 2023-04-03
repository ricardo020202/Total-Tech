const db = require('../util/database');

module.exports = class Favorito {
    constructor(favorito) {

    }

    save() {
        return db.execute(`INSERT INTO favoritos () VALUES ()`,
            []
        );
    }
    
    static fetchAll(start) {
        if(start >= 0)
        {
            return db.execute('SELECT * FROM favoritos ORDER BY  LIMIT ?, 9', [start]);  
        }

        else
        {
            return db.execute('SELECT * FROM favoritos ORDER BY ');
        } 
    }
 
    static getTotal() {
        return db.execute('SELECT count(*) as total FROM favoritos');

    }
    
    static fetchById(id_favorito)
    {
        return db.execute('SELECT * FROM favorito WHERE id_favorito = ?', [id_favorito]);
    }


    update() {
        return db.execute(
            'UPDATE favoritos SET  WHERE id_favorito = ?',
            [ this.id_favorito]
        );
    }


    static deleteById(id_favorito) {
        return db.execute('DELETE FROM dieta WHERE id_favorito = ?', [id_favorito]);
    }
}