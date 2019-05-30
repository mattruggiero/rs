import Axios from "axios";
import { Row, Col } from 'react-bootstrap';
import React from 'react';



export  function isEmpty(value){
    let returnValue = value === undefined || value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0)||
    (typeof value === 'string' && value.trim().length === 0);

    return returnValue;
}
export function setAuthToken(token){
    if(token)
        Axios.defaults.headers.common['Authorization'] = token;
    else
        delete Axios.defaults.headers.common['Authorization'];
}
export function formatTracklist(arrayOfTracks){
    let returnValue = arrayOfTracks.map(each =>{
        let i = 0;
        if(each.type_ === 'heading'){
            return(
                <Row key = {Math.random()*(++i)}>
                    <Col><h2>{each.title}</h2></Col>
                </Row>
            )
        }
        return(
            <Row key = {Math.random() * (++i)}>
                <Col>{each.title}</Col>
                <Col></Col>
                <Col>{each.duration || 'Not Listed' }</Col>
            </Row>
        )
    })
    return returnValue;
}

export const hasImage = (props) => {
    let returnValue = [{src:'../public/disc.png'}];
    if(props){
        returnValue = props.map(each => {
            return({
                src:each.uri,
                thumbnail: each.uri,
                thumbnailWidth: (each.width)/2,
                thumbnailHeight: (each.height)/2,

            })
        })
    }
    return returnValue;
}

//order items in cart by releaseID and do binary search here
export function foundInCart(cart, recordDBID){
     for(let i in cart){
         if(cart[i]._id === recordDBID)
            return true;
     }
}