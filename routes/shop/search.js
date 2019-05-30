const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');

router.route('*').all((req,res,next)=>{
    console.log('Search Works: '+req.originalUrl);
    next();
})
.post(async (req,res)=>{
    let searchFor = req.body.searchInput;
    console.log(req.body);
    console.log(searchFor);
    console.log('search worked');
    let resultCount = await Record.count({$text:{$search:searchFor}});
    console.log(resultCount);
    let records = await Record.find({$text:{$search:searchFor}}).skip(0).limit(10).lean()
    if(!records.length){console.log("NO RECORDS")}
    console.log(records.length);
    let returnObject = {recordData:records,pageNumber:0}
    res.send(returnObject);
})

// router.post('/', async (req,res) => {
//     //pagination

//     console.log(req.body.searchInput);
//     if(!req.body.searchInput)
//         console.log("it works as a bool")
//     let numberOfRecords = await Record.countDocuments();
//     if(!numberOfRecords){res.send("No records in store")};
//     let pageNumber = 0;
//     let numberOfResults = 10;
//     let totalPages = numberOfRecords/numberOfResults;
//     if((pageNumber > totalPages)||(pageNumber < 0)) {pageNumber = 0}
//     let numberToSkip = numberOfResults * pageNumber;
    
//     let records = await Record.find().limit(numberOfResults).skip(numberToSkip).lean();
//     //let records = await Record.find().lean();
//     let returnObject = {recordData:records,pageNumber:pageNumber};
//     res.send(returnObject);
// })


module.exports = router;
