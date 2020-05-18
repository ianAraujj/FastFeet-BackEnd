import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/authConfig';

class SessionController {

  async store(req, res){

    const password = req.body.password;
    const email = req.body.email;

    if (password && email){

      const user = await User.findOne({where: {email}});

      if(!user){
        return res.status(401).json({
          ERROR: "User not found"
        });
      }

      if(!(await user.checkHash(password))){
        return res.status(401).json({
          ERROR: "Password don't match"
        });
      }

      const {id, name} = user;

      return res.status(200).json({
        id,
        name,
        email,
        token: jwt.sign({id}, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      });

    }else{
      return res.status(400).json({
        ERROR: "Bad Request"
      });
    }
  }

}

export default new SessionController();