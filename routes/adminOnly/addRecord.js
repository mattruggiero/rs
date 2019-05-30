const express = require('express');
const router = express.Router();
const importFunctions = require('../../functions/importFunctions');
const Record = require('../../models/Record');
var async = require('async');
const keys = require('../../config/keys');
const myDiscogsUserName = keys.myDiscogsUserName;

const PAGE_NUMBER = 3; 
const SECONDS_TO_WAIT = 2.1;

router.get('/', async (req,res)=>{
    try{
        let starterRecordObjects = await importFunctions.getIDandCondition(myDiscogsUserName,PAGE_NUMBER);
        let tasksQueue = async.queue((task,callback)=>{
            console.log("Peroforming task: "+task.name);
            setTimeout(()=>{callback();},(SECONDS_TO_WAIT*1000))
        },1)

        for(let each in starterRecordObjects.initialData){
            let releaseID = starterRecordObjects.initialData[each].releaseID;
            let name = "processing: "+releaseID;
            let recordIsInDB = await Record.findOne({releaseID:releaseID});
            if(!recordIsInDB){
                tasksQueue.push({name:name},async (error)=>{
                    if(error){console.log(error)}
                    let askingPrice = await importFunctions.getAskingPrice(releaseID);
                    starterRecordObjects.initialData[each].askingPrice = askingPrice;
                    let finishedObject = await importFunctions.populate(starterRecordObjects.initialData[each]);
                    let newRecord = new Record(finishedObject);
                    newRecord
                        .save()
                        .then(console.log("saved: "+ releaseID))
                        .catch(error=>{console.log(error)})
                });
            }
            else{
                let length = starterRecordObjects.initialData.length-1+"";
                let queueLength = tasksQueue.length();
                let allDone = (each === length );
                let nothingInQueue = (queueLength === 0);
                if(allDone && nothingInQueue){res.send("Nothing to Save")}
            }
        }

        tasksQueue.drain = () =>{
            setTimeout(()=>{res.send("DONE POPULATING");},1000)
        }
    }catch(error){
        console.log(error)
        res.send("addRecord is Broke");
    }
})
module.exports = router;