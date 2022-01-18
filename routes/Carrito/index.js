const Carrito = require("./carrito")
let carrito = new Carrito();
let CarritoM = require("./carritoMongo");
let carritoMongo = new CarritoM()
let express = require('express');
let routeCarrito = express.Router()


routeCarrito.post("/", (req, res) => {
    //carrito.newCarrito()
    carritoMongo.newCarrito();
    res.send("Se creo un carrito")
})

routeCarrito.delete("/:id", (req, res) => {
    let { id } = req.params;
    //carrito.deleteCarrito(id)
    carritoMongo.deleteCarrito(id)
    res.send(`Se elimino el carrito${id}`)
})

routeCarrito.get("/:id/productos", (req, res) => {
    let { id } = req.params
    //carrito.getById(id, res)
    carritoMongo.getById(id, res)
})

routeCarrito.post("/:id/productos", (req, res) => {
    let { id } = req.params
    let date = new Date()
    let producto = {
        ...req.body,
        tiempo: date.toLocaleString("en-US")
    }
    //carrito.addCarrito(id, producto)
    carritoMongo.addCarrito(id, producto)
    res.send("Se actualizo el item")
})

routeCarrito.delete("/:id/productos/:id_prod", (req, res) => {
    let { id } = req.params
    let { id_prod } = req.params
    //carrito.deleteProducto(id, id_prod)
    carritoMongo.deleteProducto(id, id_prod)
    res.send(`Se elimino el producto del carrito${id} con el id:${id_prod}`)
})

module.exports = routeCarrito;