/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express'); // importando o express
const app = express(); // Iniciando o express
const porta = 4000; // Defina a porta na qual o servidor irá escutar

//Configurando engine
app.set('view engine', 'ejs') // Seta ao Express como EJS como view engine
app.use(express.static('public'))


//Rota para renderizar a página (forma dinamica por params)
app.get('/', function(req, res) { // Requisição feita na raiz
    res.render('index')
});

app.get('/perguntar', function(req, res) {
    res.render('perguntar')
});

// Tratamento de erro para rota padrão
app.use(function(req, res) {
    res.status(404).send('Página não encontrada');
});

app.listen(porta, function(erro) {
    if (erro) {
        console.log('Ocorreu um erro ao iniciar o servidor:', erro);
    } else {
        console.log('Servidor iniciado com sucesso na porta', porta);
    }
});