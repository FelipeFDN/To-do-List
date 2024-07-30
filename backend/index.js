const express = require('express');
const pgp = require('pg-promise')({});

const usuario = "postgres";
const senha = "postgres";
const host = "localhost";
const porta = "5432";
const banco_de_dados = "todolist";

const db = pgp(`postgres://${usuario}:${senha}@${host}:${porta}/${banco_de_dados}`);

const app = express();

app.use(express.json());

app.listen(3001); //Rodando na porta 3001

app.get("/backend", function(req, res){
    res.send("Hello world!").status(200);
})


//CRUD USERS
app.post("/users", function(req, res){
    console.log(req.body)
    db.none("Insert Into users(username, password) Values($1, $2)", [req.body.username, req.body.password]).then(()=>{
        res.status(200).send("Usuário inserido!")
    }).catch(erro =>{
        res.status(500).send("ERRO " + erro.message)
    });
})

app.get("/users", async function(req, res){
    let userList = await db.any("Select * From users");
    res.status(200).send(userList);
})