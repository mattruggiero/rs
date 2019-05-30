import React, { Component } from 'react';
import {  Container, Spinner} from 'react-bootstrap';

class LoadingSpinner extends Component {
    render(){
        function randomColor(){
            let rand = Math.random() * 1000;
            return ((rand%7).toFixed());
        }
        let variants = ['primary','secondary','success','danger','warning','info','light','dark']
        let mySpinner = <Spinner animation = 'grow' variant = {variants[randomColor()]} size ='lg' style = {{margin:'6rem'}}/>
        let returnValue = <Container style = {{textAlign:'center'}}>
            {mySpinner}{mySpinner}{mySpinner}{mySpinner}{mySpinner}{mySpinner}
            {mySpinner}{mySpinner}{mySpinner}{mySpinner}{mySpinner}{mySpinner}
            </Container>;
        return(
            <div>{returnValue}</div>

        )
    }
}

export default LoadingSpinner;