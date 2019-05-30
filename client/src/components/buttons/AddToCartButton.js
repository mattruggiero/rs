import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addToCart } from '../../actions/cartActions';


class AddToCartButton extends Component{
    handleClick = (event) => {
        let recordDBID = event;
        addToCart(recordDBID);
    }
    render(){
        let recordDBID = this.props.recordDBID;
        return(
            <Button
                size = 'sm' block 
                onClick = {this.handleClick.bind(this,recordDBID)} >
                Add To Cart
            </Button>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth:state.auth.isAuthenticated,
        cart:state.cart.cart
    };
};



export default connect(mapStateToProps)(AddToCartButton);