import User from '../models/User';
var validator = require("email-validator");

class UserController {
  async store(req, res) {

    const { name, email, password } = req.body;

    if ((name) && (email) && (password)) {

      if (!validator.validate(email)) {
        return res.status(400).json({
          ERROR: "Campo e-mail não está no formato válido"
        });
      }

      if(password.length < 6){
        return res.status(400).json({
          ERROR: "Password is so short"
        });
      }

      const email_exist = await User.findOne({ where: { email } });

      if (email_exist) {
        return res.status(400).json({
          ERROR: "e-mail already exists"
        });
      }

      const new_user = await User.create(req.body);

      return res.status(200).json({
        id: new_user.id,
        name: new_user.name,
        email: new_user.email,
        created_at: new_user.created_at,
        password_hash: new_user.password_hash
      });

    } else {
      return res.status(400).json({
        ERROR: "Campos incompletos"
      });
    }
  }

  async update(req, res) {

    const password = req.body.password;
    const new_password = req.body.NewPassword;
    const email_atual = req.body.email;
    const name_atual = req.body.name;

    if(!(password && email_atual && name_atual)){
      return res.status(401).json({
        ERROR: "Bad Request"
      });
    }

    const user = await User.findByPk(req.body.idUser);

    if (user) {

      if (email_atual && (user.email != email_atual)) {

        const email_exist = await User.findOne({ where: { email: email_atual } });

        if (email_exist) {
          return res.status(400).json({
            ERROR: "e-mail already exists"
          });
        }

        if (!validator.validate(email_atual)) {
          return res.status(400).json({
            ERROR: "Campo e-mail não está no formato válido"
          });
        }
      }

      if ((!(await user.checkHash(password)))) {
        return res.status(401).json({ ERROR: "Password does not match" });
      }

      if((new_password) && (new_password.length < 6)){
        return res.status(400).json({
          ERROR: "Password is so short"
        });
      }

      if(new_password){
        const { name, email, password_hash } = await user.update({
          name: name_atual,
          password: new_password,
          email: email_atual
        });

        return res.json({
          name,
          email,
          password_hash
        });

      }else{
        const { name, email} = await user.update({
          name: name_atual,
          email: email_atual
        });

        return res.json({
          name,
          email
        });
      }



    } else {
      return res.status(401).json({ ERROR: "User does not exists" });
    }

  }


}


export default new UserController();