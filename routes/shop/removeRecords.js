const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');

router.route('*').all((req,res,next)=>{
    console.log('remove records Route Works: '+req.originalUrl);
    next();
})
.post(async (req,res)=>{
    console.log(req.body);
    for (let i in req.body){
        console.log(req.body[i]._id);
        let remove = await Record.remove({_id:req.body[i]._id});
        let collectionSize = await Record.count();
        console.log("collection size: ",collectionSize);
    }
    res.send('done');
})


module.exports = router;