const express = require('express');
const server = express()

//pegar o banco de de dados
const db = require('./database/db')

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks= require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})



// configurar caminhos da minha aplicação
//pagina incial
server.get('/', (req,res) =>{
    return res.render("index.html")
})

server.get('/create-point', (req,res) =>{
    //req.query guarda as informaões que vem à frente da url
    console.log(req.query)
    return res.render("create-point.html")
})

server.post('/save-point', (req, res) =>{
   

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    
    console.log(req.body)

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
            // console.log("Cadastrado com sucesso")
            // console.log(this)
        })
    }
    addPoint (values)
    return res.render("create-point.html", {saved: true})
})

server.get('/search', (req,res) =>{

    const search = req.query.search
    console.log('search: ', search)
    if(search=="") {
        //pesquisa vazia
        return res.render('search-results.html', { total : 0 })
    }


    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err)
        }
        const total = rows.length
        // console.log("Aqui estão os seus registros")
        // console.log(rows)
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })
})


//ligar o servidor
server.listen('3000')


