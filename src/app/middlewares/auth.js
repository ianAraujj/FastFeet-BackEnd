import jwt from 'jsonwebtoken';
import authConfig from '../../config/authConfig';

export default (req, res, next) => {

  const token = req.headers.bearer;

  if (!token) {
    return res.status(401).json({ ERROR: "Token not found" });
  }


  jwt.verify(token, authConfig.secret, (error, result) => {
    if(error){
      return res.status(401).json({ ERROR: "Token invalid" });
    }else{
      const {id} = result;
      req.body.idUser = id;
      
      return next();
    }  
  });

};