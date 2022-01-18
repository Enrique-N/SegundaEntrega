const Contenedor = require('./productos');
let contenedor = new Contenedor()
let Contenedor_M = require("./productosMongo")
let contenedorMongo = new Contenedor_M();
let express = require('express');
let routeProductos = express.Router()


routeProductos.get("/:id", (req, res) => {
    let { id } = req.params;
    //contenedor.getById(id, res)
    contenedorMongo.getById(id, res)
})

routeProductos.get("/", (req, res) => {
    //contenedor.getAll(res)
    contenedorMongo.getAll(res)
})

routeProductos.put("/:id/:ele/:item", (req, res) => {
    let { id } = req.params
    let { ele } = req.params
    let { item } = req.params
    //contenedor.updateItem(id, ele, item)
    contenedorMongo.updateItem(id, ele, item)
    res.send(`${ele} modificado a ${item}`)
})

routeProductos.delete("/:id", (req, res) => {
    let { id } = req.params
    //contenedor.deleteById(id)
    contenedorMongo.deleteById(id)
    res.send("se elimino con exito")
})

routeProductos.delete("/", (req, res) => {
    //contenedor.deleteAll();
    contenedorMongo.deleteAll()
    res.send("Se eliminaron todos los productos")
})

routeProductos.post("/", (req, res) => {
    let date = new Date()
    let producto = {
        ...req.body,
        tiempo: date.toLocaleString("en-US")
    }
    //contenedor.save(producto);
    contenedorMongo.save(producto)
    res.json(producto)
})

module.exports = routeProductos;
