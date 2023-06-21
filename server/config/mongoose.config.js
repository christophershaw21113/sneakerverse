const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sneakerverse', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log(err))
