const joi = require('joi');


let nombre = joi.string().min(3);
let codigo = joi.string().min(3);
let url = joi.string().min(3);
let precio = joi.number().min(3);
let cantidad = joi.number().min(3);
let descripcion = joi.string().min(3);
let tiempo = joi.date();
let id = joi.number().min(3);

const productosSchema = {
    nombre: nombre.required(),
    codigo: codigo.required(),
    url: url.required(),
    precio: precio.required(),
    cantidad: cantidad.required(),
    descripcion: descripcion.required(),
    tiempo: tiempo,
    id: id.required()
}


module.exports = {
    productosSchema
}