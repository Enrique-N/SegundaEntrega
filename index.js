let express = require('express');
let app = express()
const productosRoute = require("./routes/Productos/index")
const carritoRoute = require("./routes/Carrito/index")
const PORT = 3000;

app.use(express.json())
app.use("/productos", productosRoute);
app.use("/carrito", carritoRoute);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})