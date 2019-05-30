
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String, 
        required: true
    }, 
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true,
    },
    firstName :{
        type: String, 
        required: true
    },
    lastName : {
        type: String, 
        required: true, 
    },
    street: {
        type: String, 
        required: true,
    },
    aptNumber: {
        type: String, 
    },
    city: {
        type: String, 
        required: true,
    }, 
    zipCode: {
        type: String, 
        required: true,
    },
    state: {
        type: String, 
        required: true,
    }, 
    country: {
        type: String, 
        required: true,
    },
    //STILL NEED CART
    cart: {
        type:[Object]
    }
    
});
// eslint-disable-next-line no-undef
module.exports = User = mongoose.model('users', UserSchema);


