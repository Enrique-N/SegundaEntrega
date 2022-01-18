let { db: firebaseDB } = require("../../utils/firebase")

class Contenedor {
    constructor() {
        this.contador = 0
    }
    async save(item) {
        try {
            this.contador++;
            let productos = firebaseDB.collection('productos');
            await productos.doc().set({
                ...item, id: this.contador
            });
        } catch (error) {
            throw new Error(error)
        }
    }
    async getById(id, res) {
        try {
            let data = await firebaseDB.collection('productos').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push(doc.data())
            })
            let getItem = items.filter(item => item.id === parseFloat(id))
            if (getItem.length >= 1) {
                return res.send(getItem)
            } else {
                return res.send({ error: "Producto no encontrado" })
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    async getAll(res) {
        try {
            let data = await firebaseDB.collection('productos').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push(doc.data())
            })
            items.sort((a, b) => {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
                return 0;
            })
            return res.send(items)
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteById(id) {
        try {
            let data = await firebaseDB.collection('productos').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push({ id_: doc.id, ...doc.data() })
            })
            items.forEach(async ele => {
                if (ele.id == id) {
                    await firebaseDB.collection('productos').doc(`${ele.id_}`).delete();
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteAll(res) {
        try {
            let data = await firebaseDB.collection('productos').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push({ id_: doc.id })
            })
            items.forEach(async ele => {
                if (ele.id_) {
                    await firebaseDB.collection('productos').doc(`${ele.id_}`).delete();
                }
            })
            res.send("Se eliminaron los productos")
        } catch (error) {
            throw new Error(error)
        }
    }
    async updateItem(id, ele, item) {
        try {
            let data = await firebaseDB.collection('productos').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push({ id_: doc.id, ...doc.data() })
            })
            let findItem = items.find(item => item.id === parseFloat(id))
            if (findItem) {
                await firebaseDB.collection('productos').doc(items[0].id_).update({ [ele]: item })
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}


module.exports = Contenedor;


