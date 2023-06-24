const mongoose = require('mongoose');


const SneakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of sneaker is required'],
    },
    brand: {
        type: String,
        required: [true, 'Brand is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    discountedPrice: {
        type: Number,
        required: [false, 'Discounted price is not required if there is no discount'],
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    color: {
        type: String,
        required: [true, 'Three colors are required'] // Ex. "Royal/White/Black"
    },
    size: {
        type: Number,
        required: [true, 'Shoe size is required'],
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }

}, { timestamps: true })

module.exports = mongoose.model('Sneaker', SneakerSchema)