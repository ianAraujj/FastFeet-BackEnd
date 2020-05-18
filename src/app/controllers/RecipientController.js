import Recipients from '../models/Recipients';

class RecipientController{

  async store(req, res){
    const {nome, rua, numero, complemento, estado, cidade, cep} = req.body;

    if (!(nome && rua && numero && complemento && estado && cidade && cep)){
      return res.status(400).json({
        ERROR: "Bad Request"
      });
    }

    const recipient = await Recipients.findOne({where:{nome, rua, numero, complemento, estado, cidade, cep}});

    if(recipient){
      return res.status(401).json({
        ERROR: "Destinatário já cadastrado"
      });
    }

    const new_recipient = await Recipients.create(req.body);

    return res.status(201).json({new_recipient});


  }

  async update(req, res){

    const {id, nome, rua, numero, complemento, estado, cidade, cep} = req.body;

    if ((!id) || (!(nome || rua || numero || complemento || estado || cidade || cep))){
      return res.status(400).json({
        ERROR: "Bad Request"
      });
    }

    const recipient = await Recipients.findByPk(id);

    if(! recipient){
      return res.status(401).json({
        ERROR: "Destinatário não encontrado"
      });
    }

    const new_recipient = await recipient.update(req.body);

    return res.status(201).json({new_recipient});
    
  }

}

export default new RecipientController();