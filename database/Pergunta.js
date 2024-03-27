/* eslint-disable @typescript-eslint/no-var-requires */
const connection = require('./database'); // Conexão com o banco de dados
const Sequelize = require('sequelize'); // Assiste e manipula a tabela

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({ force: false }).then(() => {})


module.exports = Pergunta