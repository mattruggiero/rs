import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { setSelected } from '../../actions/inventoryActions';



class ViewDetailsButton extends Component {

    handleClick = (event) =>{
        let selectedRecord = event;
        setSelected(selectedRecord);
        this.props.history.push('/displayOne');
    }

    render(){
        let record = this.props.record;
        return(
            <Button
                size = 'sm' block 
                onClick = {this.handleClick.bind(this,record)}>
                View Details
            </Button>
        );
    }
}




export default ViewDetailsButton;


