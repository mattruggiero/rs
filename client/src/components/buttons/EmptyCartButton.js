import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { emptyCart } from '../../actions/cartActions';


class EmptyCartButton extends Component {
    handleClick = () => {
        emptyCart();
    }
    render(){
        return(
            <Button size = 'sm' block onClick = {this.handleClick}>Empty Cart</Button>
        );
    }
}

export default EmptyCartButton;