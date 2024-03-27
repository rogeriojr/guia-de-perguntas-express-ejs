/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express'); // importando o express
const app = express(); // Iniciando o express
const porta = 4000; // Defina a porta na qual o servidor irá escutar

//Configurando engine
app.set('view engine', 'ejs') // Seta ao Express como EJS como view engine

//Rota para renderizar a página (hard code)
// app.get('/', function(req, res){ // Requisição feita na raiz
//   var nome = 'Rogério Jr';
//   var lang = 'Javascript';
//   var empresa = 'RJ-DEV';
//   var clientes = 10;

//   res.render('index', {
//     nome: nome,
//     lang: lang,
//     empresa: empresa,
//     clientes: clientes
//   });
// });

//Rota para renderizar a página (forma dinamica por params)
app.get('/:nome?/:lang?', function(req, res){ // Requisição feita na raiz
  var nome = req.params.nome; //recebe o param na req
  var lang = req.params.lang; //recebe o param na req
  var empresa = 'RJ-DEV';
  var clientes = 10;
  
  var exibirMsg = false

  res.render('index', {
    nome: nome,
    lang: lang,
    empresa: empresa,
    clientes: clientes,
    msg: exibirMsg
  });
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
