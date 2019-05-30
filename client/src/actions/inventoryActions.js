import axios from 'axios';
import {  SET_SEARCH_RESULTS, SET_SELECTED} from '../actions/types';
import store from '../store';


export function setSearchResults(searchingForSomething,pageNumber){
    let url = '/getRecords';
    let postData = searchingForSomething ?
        {searchInput:searchingForSomething+'',pageNumber:pageNumber}:
        {searchInput:false,pageNumber:pageNumber};

    axios({method:'post',url:url,data:postData})
        .then(response =>{
            if(!response){console.log("setSearchResults: no results")}
            store.dispatch({
                type:SET_SEARCH_RESULTS,
                searchInput:searchingForSomething,
                payload:response.data.recordData,
                pageNumber:response.data.pageNumber
            })

        })
        .catch(error=>{
            console.log('error: ',error);
        })
}

export function setSelected(selectedRecord){
    localStorage.setItem('selectedRecord',JSON.stringify(selectedRecord));
    store.dispatch({
        type:SET_SELECTED,
        payload:selectedRecord
    })
    
}
