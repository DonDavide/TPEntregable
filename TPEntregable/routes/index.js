var express = require('express');
var router = express.Router();
const indexController=require("../controllers/indexcontroller")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
//mostrar listado de productos
router.get('/products', indexController.list);

//mostrar detalle de productos
router.get('/detail/:id', indexController.detail); 


//mostrar formulario de creacion
router.get('/create/:id', indexController.create); 
//enviar formulario
router.post('/create/:id', indexController.store); 


//mostrar formulario de edicion de producto
router.get('/edit/:id', indexController.edit); 
//enviar formulario de edicion
router.post('/edit/:id', indexController.update); 


//borrar producto
router.get('/delete/:id', indexController.destroy); 





module.exports = router;
