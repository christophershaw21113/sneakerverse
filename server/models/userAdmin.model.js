const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
    phoneNumber: {
        type: String,
        validate: {
          validator: function (value) {
            // Checking if value is 10 digits "\d" (digit character (0-9)) {10} just means that it'll occur 10 times
            return /^\d{10}$/.test(value);
          },
          message: 'Invalid phone number format',
        },
      },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    profilePicture: {
        type: String,
        default: "https://crudapps.tylerw.xyz/uploads/default.png"
    },

}, { timestamps: true })

UserSchema.virtual('confirmPassword')
    .get(()=>this.confirmPassword)
    .set(value=>this.confirmPassword = value)

UserSchema.pre('validate', function(next) {
    if(this.password != this.confirmPassword){
        this.invalidate('confirmPassword', 'Confirm password must match password')
    }
    next()
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash=>{
            this.password = hash
            next()
        })
    })

module.exports = mongoose.model("User", UserSchema)