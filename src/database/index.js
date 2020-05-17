import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Criando um array com todos os Models da minha Aplicação
import User from '../app/models/User';
const models = [User];

class DataBase {
  constructor() {
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));

  }
}

export default new DataBase();