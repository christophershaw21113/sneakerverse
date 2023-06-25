const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()

// sneaks.getProducts(700, 10, function(err, products){
//     console.log(products)
// })

require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))
app.use(express.static("public"))

require('./config/mongoose.config')
require('./routes/sneakers.routes')(app)
require('./routes/userAdmin.routes')(app)

app.listen(port, () => {
    console.log(`Example app listening at port: ${port}`)
})