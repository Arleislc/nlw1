//importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose() // ao passar o método verbose() o sqlite3 retornar mais informações caso tenham erros

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db') //cria um novo objeto sqlite3 que recebe um parametro de onde será criado o banco


module.exports = db

//utilziar o objeto db para nosas operações
db.serialize(() => {
    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );


    `)

    // // inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image, 
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //         ) VALUES (?,?,?,?,?,?,?);
    //     `
    // const values = [
    //     'imagem',
    //     'nome',
    //     'add1',
    //     'add2',
    //     'estado',
    //     'cidade',
    //     'items'
    // ]
    // function afterInsertData(err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)

    function addPoint (values) {
        
        const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items
            ) VALUES (?,?,?,?,?,?,?);
        `

        db.run(query, values, function (err) {
            if (err) {
                return console.log(err)
            }
            console.log("Cadastrado com sucesso")
        })
    }

    //consultar os dados da tabela
    
    function consultData (){
        db.all(`SELECT * FROM places`, function (err, rows) {
            if (err) {
                console.log(err)
            }
            console.log("Aqui estão os seus registros")
        })
    }
    // deletar um dado da tabela
    
    function deletePlace(id){
        db.run(`DELETE FROM places WHERE id=?`, [id], function(err){
            if(err){
                console.log(err)
            }
    
            console.log("Registro deletado com sucesso")
        })
    }
    function deleteAll(id){
        db.run(`DELETE FROM places`, [id], function(err){
            if(err){
                console.log(err)
            }
    
            console.log("Registro deletado com sucesso")
        })
    }
    
    // deletePlace(5)
    // deletePlace(6)
    // consultData()
    // deleteAll()
})
