const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Record = require('../../models/Record');
const jwtDecode = require('jwt-decode');

async function decodeToken(jwtToken){
    try{
        let dirtyToken = jwtToken;
        let cleanToken = dirtyToken.replace(/Bearer/g,'').trim();
        let decodedToken = jwtDecode(cleanToken);
        return decodedToken;
    }
    catch(error){console.log(error);}
}
//get/return cart no changes 
router.post('/', async (req,res)=>{
    try{
        let decodedToken = await decodeToken(req.headers.authorization);
        let userEmail = decodedToken.email;

        let user = await User.findOne({email:userEmail});
        console.log('sending back cart');
        res.send(user.cart);
    }
    catch(error){console.log(error);}
})
//add record to cart
.post('/add',  async (req,res) =>{
    try{
        let decodedToken = await decodeToken(req.headers.authorization);
        let userEmail = decodedToken.email;
        let recordDBID = req.body.recordDBID;
        let record = await Record.findById(recordDBID);
        let user = await User.findOneAndUpdate({email:userEmail},{$push: {cart:record}})

        console.log("added to cart  ", user.cart.length);
        res.send(user.cart);
    }
    catch(error){console.log(error);}
})
//remove record to cart
.post('/remove', async (req,res) => {
    try{
        let decodedToken = await decodeToken(req.headers.authorization);
        let userEmail = decodedToken.email;
        let recordDBID = req.body.recordDBID;

        let record = await Record.findById(recordDBID);
        let user = await User.findOneAndUpdate({email:userEmail}, {$pullAll:{cart:[record]}});

        console.log('removed from cart: ', user.cart.length);
        res.send(user.cart);
    }
    catch(error){console.log(error);}
})
//empty cart 
.post('/empty', async (req,res) =>{
    try{
        let decodedToken = await decodeToken(req.headers.authorization);
        let userEmail = decodedToken.email;
        let user = await User.findOneAndUpdate({email:userEmail},{$set:{cart:[]}});

        console.log("emptied cart:  ",user.cart.length);
        res.send(user.cart);
    }
    catch(error){console.log(error);}
})

module.exports = router;