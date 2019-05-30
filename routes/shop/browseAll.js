const express = require('express');
const router = express.Router();
const Record =require('../../models/Record');

//this will need to be changed to router.post if pagination is needed




router.post('/', async (req,res) => {
    //pagination

    console.log(req.body.searchInput);
    if(!req.body.searchInput)
        console.log("it works as a bool")
    let numberOfRecords = await Record.countDocuments();
    if(!numberOfRecords){res.send("No records in store")};
    let pageNumber = 0;
    let numberOfResults = 12;
    let totalPages = numberOfRecords/numberOfResults;
    if((pageNumber > totalPages)||(pageNumber < 0)) {pageNumber = 0}
    let numberToSkip = numberOfResults * pageNumber;
    
    let records = await Record.find().limit(numberOfResults).skip(numberToSkip).lean();
    //let records = await Record.find().lean();
    let returnObject = {recordData:records,pageNumber:pageNumber};
    res.send(returnObject);
})









module.exports = router;