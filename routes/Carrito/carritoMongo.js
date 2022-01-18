let { connection, mongoose } = require("../../config/database")
let { Schema, model } = mongoose;
let { carritoSchema } = require("../../schemas/carrito");
let carritoSchemaModel = new Schema(carritoSchema);
let carritoModel = new model('carrito', carritoSchemaModel)

class Carrito {
    constructor() {
        this.contadorCarrito = 0,
            this.contadorProductos = 0,
            this.date = new Date()
    }
    async newCarrito() {
        try {
            this.contadorCarrito++;
            carritoModel.create({
                nombre: `carrito${this.contadorCarrito}`,
                id: this.contadorCarrito,
                tiempo: this.date.toLocaleString("en-US"),
                productos: []
            })
        } catch (error) {
            throw new Error(error)
        }
    } async deleteCarrito(id) {
        try {
            await carritoModel.deleteOne({ id: parseFloat(id) });
        } catch (error) {
            throw new Error(error)
        }
    } async getById(id, res) {
        try {
            let fil = await carritoModel.find({ id: parseFloat(id) })
            if (fil) {
                return res.send(fil)
            } else {
                return res.send({ error: "Carrito no encontrado" })
            }
        } catch (error) {
            throw new Error(error)
        }
    } async addCarrito(id, producto) {
        try {
            this.contadorProductos++;
            await carritoModel.updateOne({ id: parseFloat(id) }, { $push: { productos: { ...producto, id: this.contadorProductos } } })
        } catch (error) {
            throw new Error(error)
        }
    } async deleteProducto(id, id_prod) {
        try {
            await carritoModel.updateOne({ id: parseFloat(id) }, { $pull: { productos: { id: parseFloat(id_prod) } } })
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Carrito