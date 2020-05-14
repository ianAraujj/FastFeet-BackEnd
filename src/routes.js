import Router from 'express';


const routes = new Router();

routes.get('/', (req, res) =>{
  return res.json({
    MESSAGE: "Olá Mundo !!!!"
  })
});

export default routes;