let { db: firebaseDB } = require("../../utils/firebase")
let FieldValue = require('firebase-admin').firestore.FieldValue

class Carrito {
    constructor() {
        this.contadorCarrito = 0,
            this.contadorProductos = 0,
            this.date = new Date()
    }
    async newCarrito() {
        try {
            this.contadorCarrito++;
            let contenedor = firebaseDB.collection('carrito');
            await contenedor.doc().set({
                name: `carrito${this.contadorCarrito}`,
                id: this.contadorCarrito,
                date: this.date.toLocaleString("en-US"),
                productos: []
            })
        } catch (error) {
            throw new Error(error)
        }
    } async deleteCarrito(id) {
        try {
            let data = await firebaseDB.collection('carrito').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push({ id_: doc.id, ...doc.data() })
            })
            items.forEach(async ele => {
                if (ele.id == id) {
                    await firebaseDB.collection('carrito').doc(`${ele.id_}`).delete();
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    } async getById(id, res) {
        try {
            let data = await firebaseDB.collection('carrito').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push(doc.data())
            })
            let getItem = items.filter(item => item.id === parseFloat(id))
            if (getItem) {
                return res.send(getItem)
            } else {
                return res.send({ error: "Producto no encontrado" })
            }
        } catch (error) {
            throw new Error(error)
        }
    } async addCarrito(id, producto) {
        try {
            this.contadorProductos++;
            let data = await firebaseDB.collection('carrito').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push({ id_: doc.id, ...doc.data() })
            })
            let findItem = items.find(carrito => carrito.id === parseFloat(id))
            if (findItem) {
                let productPush = { id: this.contadorProductos, ...producto }
                await firebaseDB.collection('carrito').doc(findItem.id_).update('productos', FieldValue.arrayUnion(productPush), { merge: true })
            } else {

            }
        } catch (error) {
            throw new Error(error)
        }
    } async deleteProducto(id, id_prod) {
        try {
            let data = await firebaseDB.collection('carrito').get()
            let doc = data.docs;
            let items = []
            doc.map((doc) => {
                items.push({ id_: doc.id, ...doc.data() })
            })
            let findItem = items.find(item => item.id === parseFloat(id))
            if (findItem) {
                let findProducto = findItem.productos.find(item => item.id === parseFloat(id_prod))
                await firebaseDB.collection('carrito').doc(findItem.id_).update('productos', FieldValue.arrayRemove(findProducto), { merge: true })
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Carrito