import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { removeFromCart } from '../../actions/cartActions';


class RemoveFromCartButton extends Component{
    handleClick = (event) => {
        let recordDBID = event;
        removeFromCart(recordDBID);
    }
    render(){
        let recordDBID = this.props.recordDBID;
        return(
            <Button
                size = 'sm' block 
                onClick = {this.handleClick.bind(this,recordDBID)} >
                Remove From Cart
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



export default connect(mapStateToProps)(RemoveFromCartButton);