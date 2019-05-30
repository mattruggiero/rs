import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchResults } from '../../actions/inventoryActions';
import {  Col, Button, ButtonToolbar } from 'react-bootstrap';


class PaginationButtons extends Component{
    
    //need to make this focus on top of page
    handleClick = (event) => {
        let numberToAdd = event.target.id === 'prev'? -1:1;
        setSearchResults(this.props.searchInput,this.props.pageNumber + numberToAdd);
    }
    
    render(){
        return(
            <ButtonToolbar>
            <Col>
            <Button 
                size = "lg" block
                onClick = {this.handleClick} 
                id = "prev"
                searchinput = {this.props.searchInput}>
                PREV
            </Button>
            </Col>
            <Col>
            <Button 
                size = "lg" block
                onClick = {this.handleClick} 
                id = "next"
                searchinput = {this.props.searchInput}>
                NEXT
            </Button>
            </Col>
            </ButtonToolbar>
           
        )
    }
}









const mapStateToProps = state => {
    return{
        searchInput:state.inventory.searchInput,
        pageNumber:state.inventory.pageNumber,
    };
};



export default connect(mapStateToProps)(PaginationButtons);