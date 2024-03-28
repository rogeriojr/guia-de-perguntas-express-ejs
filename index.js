/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express'); // Importando o express
const bodyParser = require('body-parser');
const connection = require('./database/database'); // Conexão com o banco de dados
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Pergunta = require("./database/Pergunta")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Resposta = require("./database/Resposta")

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
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC'] // Ordenação da listagem podendo ser 'ASC' ou 'DESC' //Pode ordenar qualquer atributo
    ]}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    })
});

// Rota para renderizar a página de perguntas
app.get('/perguntar', function(req, res) {
    res.render('perguntar');
});

// Rota para salvar pergunta
app.post('/salvarpergunta', function(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.status(200).send('Pergunta criada com sucesso!');
        res.redirect('/');
    }).catch((error) => {
        console.log('Erro ao salvar pergunta:', error);
        res.status(500).send('Erro ao salvar pergunta.');
    });
});

// Rota para listar uma pergunta
app.get('/pergunta/:id', (req, res) =>{
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta !== undefined) {
            res.render('pergunta', {
                pergunta: pergunta
            })
        } else {
            alert('Pergunta não encontrada!')
            res.redirect('/')
        }
    }).catch((error) => {
        console.log('Pergunta não encontrada:', error);
    });
})

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