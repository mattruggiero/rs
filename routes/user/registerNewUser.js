const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const validateRegisterInput = require('../../validator/validateNewUser');



router.post('/', async (req, res) => {
    
    const { errors ,isValid } = validateRegisterInput(req.body);
    console.log(errors);
    if(!isValid){return res.status(400).json(errors)}

    let isUserAlreadyInDB = await User.findOne({email:req.body.email}).lean();
    if(isUserAlreadyInDB){
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
    }
    
    let newUser = new User({
        email: req.body.email,
        password:req.body.password,
        userName:req.body.userName,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        street:req.body.street,
        aptNumber:req.body.aptNumber,
        city:req.body.city,
        zipCode: req.body.zipCode,
        state: req.body.state,
        country: req.body.country
    })

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if (err){throw err;}
            newUser.password = hash;
            newUser 
                .save()
                .then(user => console.log(newUser.userName," entered in DB"))
                .catch(err => console.log(err));
                
        })
    })
    res.json({email:newUser.email,password:req.body.password});
  
    
})




module.exports = router;