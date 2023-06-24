const mongoose = require('mongoose');


const SneakerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'name of sneaker is required'], 
    },
    brand: {
        type: String,
        required: [true, 'brand is required']
    },
    price: 	{ 
        type: Number, 
        required: [true, 'price is required'] 
    },
    discountedPrice: {
        type: Number,
        required: [false, 'discounted price is not required if there is no discount'],
    },
   image: {
    type: String,
    required: [true, 'image is required']
   },
   color: {
    type: Array,
    required: [true, 'Three colors are required'] // Ex. "Royal/White/Black"
   },
   sizes: [
    {
        size: {
    type: Number,
    required: [true, 'shoe size is required'],
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9,  10,  11,  12, 13,  14, 15, 16, 17, 18]
   }
}
] ,
   description: {
    type: String,
    required: [true, 'Description is required']
   }
    
}, {timestamps: true})

module.exports = mongoose.model('Sneaker', SneakerSchema)