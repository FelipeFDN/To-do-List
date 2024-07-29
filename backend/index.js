const express = require('express');
const pgp = require('pg-promise');

const app = express();

app.use(express.json());

app.listen(3001); //Rodando na porta 3001

app.get("/backend", function(req, res){
    res.send("Hello world!").status(200);
})