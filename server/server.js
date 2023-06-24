const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')


require("dotenv").config()

const PORT = process.env.PORT || 8000;
// Middleware for express to read incoming data from the client's request object

app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(cors())

require('./config/mongoose.config')
require('./routes/sneakers.routes')(app)
require('./routes/userAdmin.routes')(app)

app.listen(port, () => {
    console.log(`Example app listening at port: ${port}`)
})