import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Container, Form } from 'react-bootstrap';
import  ViewDetailsButton  from '../buttons/ViewDetailsButton';
import RemoveFromCartButton from '../buttons/RemoveFromCartButton';
import EmptyCartButton from '../buttons/EmptyCartButton';
import PaypalButton from '../paypal/PaypalButton';
import axios from 'axios';
import { emptyCart } from '../../actions/cartActions';

// won't work in PaypalButton.js 

const CLIENT = process.env.PAYPAL_PRODUCTION_KEY;

function removePurchasedItemsFromInventory(cart){
    axios({method:'post',url:'/removeRecords',data:cart})
        .then(response =>{console.log("axios call made")})
}

const ENV = process.env.NODE_ENV === 'production'? 'production':'sandbox';

console.log(".env",process.env)
console.log("paypal",process.env.PAYPAL_PRODUCTION_KEY);
console.log("paypal",process.env.PAYPAL_SANDBOX_KEY);

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            shipping:'tenDay',
        }
        this.handleRadio = this.handleRadio.bind(this);
    }
    componentDidMount(){
        if(!this.props.auth){this.props.history.push('/');}
    }
    handleRadio = (event) => { this.setState({shipping:event.target.id})}

    render(){
        const onSuccess = (payment) => {
            window.alert("Pament Successful!!!!");
            console.log('Successful payment!!',payment);
            removePurchasedItemsFromInventory(this.props.cart);
            emptyCart();
            this.props.history.push('/');
        }

        const onError = (error) => { 
            console.log(error);
            window.alert("Error: Payment error you were not charged. Try again");
        }
        const onCancel = (data) => {window.alert("Payment cancelled");}

        let returnValue = <h1 style = {{textAlign:'center'}}>Nothing in your cart</h1>
        let haveCart = this.props.cart.length ? true:false;

        if(haveCart){
            returnValue = (<div><h1 style = {{textAlign:"center"}}>Nothing in your cart</h1></div>)
            let total = 0;

            let tableBody = this.props.cart.map(item =>{
                total = total + (Number)(item.price);
                return(
                    <tr key = {item.releaseID * Math.random()} >
                        <td>{item.artist}</td>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td><ViewDetailsButton history = {this.props.history} record = {item}/></td>
                        <td><RemoveFromCartButton recordDBID = {item._id}/></td>
                    </tr>
                )
            })
            let shippingCharge ; 
            if (this.state.shipping === 'twoDay'){shippingCharge = 20;}
            if (this.state.shipping === 'tenDay'){shippingCharge = 4;}
            returnValue = (
                <Container>
                <Table striped bordered hover>
                    <tbody>
                        {tableBody}
                    </tbody>
                </Table>
                <hr/>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>SUB-TOTAL</td>
                            <td>${total.toFixed(2)}</td>
                            <td><EmptyCartButton/></td>
                        </tr>
                        <tr>
                            
                            <td>SHIPPING</td>
                            <td>
                            <Form.Check
                                onChange = {this.handleRadio}
                                checked = {this.state.shipping === 'tenDay'}
                                type = 'radio'
                                key = 'tenDay'
                                id = 'tenDay'
                                label = '7 to 10 day shipping + $4.00'/>
                            <Form.Check
                                onChange = {this.handleRadio}
                                checked = {this.state.shipping === 'twoDay'}
                                type = 'radio'
                                key = 'twoDay'
                                id = 'twoDay'
                                label = '2 to 3 day shipping + $20.00'/>
                        </td>
                        </tr>
                        <tr>
                        <td><div>TOTAL</div></td>
                        <td><div>{(Number)(total + shippingCharge).toFixed(2)}</div></td>
                        <td><PaypalButton
                                client={CLIENT}
                                env={ENV}
                                commit={true}
                                currency={'USD'}
                                total={(total + shippingCharge).toFixed(2)}
                                onSuccess={onSuccess}
                                onError={onError}
                                onCancel={onCancel}
                            /></td>
                        </tr>
                    </tbody>
                    
                </Table>
                
                </Container>
                
            )
        }
  
    return(
        <Container>
            {returnValue}
            <div style = {{textAlign: 'center'}}>
            </div>
        </Container>
        )
    }
}

const mapStateToProps = state => {
    return{
        cart : state.cart.cart,
        auth: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(Cart);