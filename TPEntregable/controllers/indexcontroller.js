const fs = require('fs');
const path = require('path');

var productsFilePath = path.join(__dirname, '../data/products.json');
var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const controller = {
    list :(req, res, next) => {
		var ultimoId = (products[products.length -1].id);
		var nuevoId= parseInt(ultimoId) + 1;
		res.render("products", {products, nuevoId})
    },
	detail: (req, res) => {
		var idProducto = req.params.id;
		for (var i = 0; i<products.length; i++){
			if(products[i].id == idProducto){
				productFound = products[i];
				break;
			}
		}
		if(productFound){
			return res.render("detail", {productFound});
		}	
	},
	//CARGA DE PRODUCTO
    create: (req, res) => {
		var allIds=[]; 
		for (i = 0 ; i < products.length; i ++){
			if(products[i].id){
				allIds.push(parseInt(products[i].id)); //Inserto todos los IDS del objeto products en un array.
			}
		}
		var idMax = Math.max(...allIds)//busco el numero mas alto dentro de los ids
		var nuevoId= idMax + 1; //creo el nuevo Id agregandole +1 al de mayor valor
		res.render("create",{nuevoId});
    },
    
	store: (req, res, next) => {
		
		products.push(req.body);
		productsJSON = JSON.stringify(products);
		fs.writeFileSync(__dirname + '/../data/products.json', productsJSON);
		articuloNuevo = req.body

		res.render("createDone", {articuloNuevo});
		
	},
	
	//EDICION
	edit: (req, res) => {
		var idproduct = req.params.id;
		console.log(req.params.id);
		var productFound;

		for (var i = 0; i < products.length; i++){
			if (products[i].id ==idproduct){
				productFound =products[i];
				break;
			}
		}
		if(productFound){
			console.log(productFound);
			res.render("edit",{productFound});
		}else{ res.send ("Producto invalido")};

    },
    update: (req, res) => {
		var idproduct = req.params.id;
		console.log(req.params.id);
		var editProduct = products.map(function(product){
			if(product.id == idproduct){
				return req.body; 
			}
			return product;
		});
		editProductJSON = JSON.stringify(editProduct);
		fs.writeFileSync(__dirname + '/../data/products.json', editProductJSON);	
		console.log(req.body);
		var productoEditado = req.body;
		
		res.render("editDone", {productoEditado})
		
    },//BORRAR
    destroy : (req, res) => {
		var idProduct = req.params.id;

		var productDestroy = products.filter(function(product){
			return product.id!=idProduct; 
		})
		var productDestroyJSON = JSON.stringify(productDestroy);
		fs.writeFileSync(__dirname + '/../data/products.json', productDestroyJSON);
		
		
		res.render("deleteDone")
	}
};

module.exports = controller;