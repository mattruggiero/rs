const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');

router.route('*').all((req,res,next)=>{
    console.log('Get Results Route Works: '+req.originalUrl);
    next();
})
.post(async (req,res)=>{
    try{
        let searchInput = req.body.searchInput;
        let resultLimit = 12;
        let pageNumber = req.body.pageNumber;
        let numberOfRecords = 0;
        let searchInputNotChecked = true;
        let foundRecords;

        while(searchInputNotChecked){
            numberOfRecords = searchInput? 
            await Record.countDocuments({$text:{$search:searchInput}}):
            await Record.countDocuments();

            if(searchInput && !numberOfRecords){
                foundRecords = false;
                searchInput = null;
            }
            if(numberOfRecords){searchInputNotChecked = false;}
        }
        let totalPages = numberOfRecords/resultLimit;
        let needOneMorePage = numberOfRecords%resultLimit;
        if(needOneMorePage){totalPages++;}

        if(pageNumber > totalPages) {pageNumber = 1};
        if(pageNumber < 1){pageNumber = totalPages};

        let numberToSkip = resultLimit * (pageNumber-1);
        let records = searchInput?
        await Record.find({$text:{$search:searchInput}}).skip(numberToSkip).limit(resultLimit).lean():
        await Record.find().limit(resultLimit).skip(numberToSkip).lean();

        let returnObject = {recordData:records,pageNumber:pageNumber,foundRecords:foundRecords};
        res.send(returnObject);
    }
    catch(error){
        console.log(error)
        res.send(false);
    }


})


module.exports = router;
