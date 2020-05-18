import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Criando um array com todos os Models da minha Aplicação
import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
const models = [User, Recipients];

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