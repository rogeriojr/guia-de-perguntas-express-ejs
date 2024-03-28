/* eslint-disable @typescript-eslint/no-var-requires */
const connection = require('./database'); // Conexão com o banco de dados
const Sequelize = require('sequelize'); // Assiste e manipula a tabela

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({ force: false }).then(() => {})


module.exports = Resposta