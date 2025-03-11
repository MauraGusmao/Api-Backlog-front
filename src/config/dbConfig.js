import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('backlog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao MySQL com Sequelize!');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

export default sequelize;