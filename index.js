/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express'); // Importando o express
const bodyParser = require('body-parser');
const connection = require('./database/database'); // Conexão com o banco de dados

const app = express(); // Iniciando o express
const porta = 4000; // Definindo a porta na qual o servidor irá escutar

// Conexão com o banco de dados
connection.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados feita com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Configurando engine
app.set('view engine', 'ejs'); // Definindo o EJS como view engine
// Arquivos estáticos
app.use(express.static('public'));
// Configurações de formulário com body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//ROTAS 
// Rota para renderizar a página inicial
app.get('/', function(req, res) {
    res.render('index');
});

// Rota para renderizar a página de perguntas
app.get('/perguntar', function(req, res) {
    res.render('perguntar');
});

// Rota para salvar pergunta
app.post('/salvarpergunta', function(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send('Formulário recebido - Título: ' + titulo + ', Descrição: ' + descricao);
});

// Tratamento de erro para rota padrão
app.use(function(req, res) {
    res.status(404).send('Página não encontrada');
});

// Iniciando o servidor
app.listen(porta, function(erro) {
    if (erro) {
        console.log('Ocorreu um erro ao iniciar o servidor:', erro);
    } else {
        console.log('Servidor iniciado com sucesso na porta', porta);
    }
});