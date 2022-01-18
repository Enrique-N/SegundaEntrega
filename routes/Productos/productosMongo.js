let { connection, mongoose } = require("../../config/database")
let { Schema, model } = mongoose;
let { productosSchema } = require("../../schemas/productos");
let productosSchemaModel = new Schema(productosSchema);
let productosModel = new model('productos', productosSchemaModel)

class Contenedor {
    constructor() {
        this.contador = 0
    }
    async save(item) {
        try {
            this.contador++;
            productosModel.create({ ...item, id: this.contador });
        } catch (error) {
            throw new Error(error)
        }
    }
    async getById(id, res) {
        try {
            let fil = await productosModel.find({ id: parseFloat(id) })
            res.send(fil)
        } catch (error) {
            throw new Error(error)
        }
    }
    async getAll(res) {
        try {
            let getProductos = await productosModel.find({})
            return res.send(getProductos)
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteById(id) {
        try {
            await productosModel.deleteOne({ id: parseFloat(id) });
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteAll() {
        try {
            await productosModel.deleteMany({});

        } catch (error) {
            throw new Error(error)
        }
    }
    async updateItem(id, ele, item) {
        try {
            await productosModel.updateOne({ id: parseFloat(id) }, { [ele]: item });
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Contenedor;