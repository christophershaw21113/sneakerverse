const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()

// sneaks.getProducts("9060", 5, function(err, products){
//     console.log(products)
// })

require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

require('./config/mongoose.config')
require('./routes/sneakers.routes')(app)
require('./routes/userAdmin.routes')(app)

app.use(express.static("public"))
// app.get('/api/product', (req, res) => {
//     const { sneakerName } = req.query;
//     console.log(req.query)
//     // Retrieve product details using "sneaks-api" package
//     sneaks.getProducts({sneakerName}, 10, function(err, products){
//         console.log(products)
//     })
// });

// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

app.listen(port, () => {
    console.log(`SNEAKERVERSE listening at port: ${port}`)
})