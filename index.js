/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express'); // importando o express
const app = express(); // Iniciando o express
const porta = 4000; // Defina a porta na qual o servidor irá escutar

//Configurando engine
app.set('view engine', 'ejs') // Seta ao Express como EJS como view engine

//Bom saber:
  // REQ => DADOS ENVIADOS PELO USUÁRIO
  // RES => DADOS ENVIADOS PELO USUÁRIO
app.get('/', function(req, res){ // Requisição feita na raiz
  res.render('index'); // em vez de retornar algo ele vai renderizar no caso o arquivo views/index
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