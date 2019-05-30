const DB = require('../config/discogs');
const Record = require('../models/Record');

module.exports = {
    isObjectFieldPresent(objectField){
        if(objectField === undefined)
            return false;
        return objectField;
    },
    getMediaCondition(notesField){
        let isFieldPresent = this.isObjectFieldPresent(notesField);
        let mediaCondition = isFieldPresent? notesField[0].value: "Very Good Plus (VG+)";
        return mediaCondition;
    },
    getCoverCondition(notesField){
        let isFieldPresent = this.isObjectFieldPresent(notesField);
        let coverCondition = isFieldPresent? notesField[0].value: "Very Good Plus (VG+)";
        return coverCondition;
    },
    //1 api call
    async getIDandCondition(discogsUserName,pageNumber){
        let perPage = 50;
        let returnObject = {allDone:false,initialData:[]};
        try{
            let results = await DB.discogsCollection.getReleases(discogsUserName,1,{page:pageNumber,per_page:perPage});
            for (let each in results.releases){
                let tempObject = {
                    releaseID: results.releases[each].id,
                    mediaCondition:this.getMediaCondition(results.releases[each].notes),
                    coverCondition:this.getMediaCondition(results.releases[each].notes),
                }
                returnObject.initialData.push(tempObject);
            }
            return returnObject;
        }
        catch(error){
            returnObject.allDone = true;
            return returnObject;
        }
    },
    //1 api call
    async getAskingPrice(releaseID){
        try{
            let results = await DB.discogsMarketPlace.getPriceSuggestions(releaseID);
            let valuesArray = Object.values(results);
            let suggestedPrice = (valuesArray[2].value * 10).toFixed(2);
            return suggestedPrice++;
        }
        catch(error){
            console.log("error @ importFunctions.getAskingPrice");
            return(error);
        }
    },
    //n api calls
    async setPrice(recordData){
        try{
            console.log("setting price");
            let initialData = recordData.initialData;
            for(let each of initialData){
                each.askingPrice = await this.getAskingPrice(each.releaseID);
            }
            return recordData;
        }catch(error){
            console.log("ERROR @ importFunctions.setPrice");
            return error;
        }
    }, 
    async populate (releaseConditionAndPrice) {
        let releaseData = await DB.discogsDB.getRelease(releaseConditionAndPrice.releaseID);
        let newRecordObject = {
            price: releaseConditionAndPrice.askingPrice,
            trackList : releaseData.tracklist,
            releaseID: releaseData.id,
            masterID: releaseData.master_id,
            artist: releaseData.artists[0].name,
            title: releaseData.title,
            notes:releaseData.notes_plaintext,
            formats:{
                text:releaseData.formats[0].text,
                numberOfRecords:releaseData.formats[0].qty,
                descriptions:releaseData.formats[0].descriptions
            },
            genres:releaseData.genres,
            images:releaseData.images,
            labels:releaseData.labels,
            mediaCondition:releaseConditionAndPrice.mediaCondition, 
            coverCondition:releaseConditionAndPrice.coverCondition, 
        }

        return newRecordObject;

        
    }


    

    
   
    


    
}

    
