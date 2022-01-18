const joi = require('joi');


let nombre = joi.string().min(3);
let productos = joi.array();
let tiempo = joi.date();
let id = joi.number().min(3);

const carritoSchema = {
    nombre: nombre.required(),
    productos: productos.required(),
    tiempo: tiempo,
    id: id.required()
}


module.exports = {
    carritoSchema
}