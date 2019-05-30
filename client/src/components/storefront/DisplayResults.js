import React, { Component } from 'react';
import { connect } from 'react-redux';
import { foundInCart,  } from '../../helperFunctions';
import PaginationButtons from '../buttons/PaginationButtons';
import { setSearchResults } from '../../actions/inventoryActions';
import { Row, Col, Container, Card } from 'react-bootstrap';
import ViewDetailsButton from '../buttons/ViewDetailsButton';
import RemoveFromCartButton from '../buttons/RemoveFromCartButton';
import AddToCartButton from '../buttons/AddToCartButton';
import LoadingSpinner from './LoadingSpinner';

class DisplayResults extends Component {
    componentDidMount(){
        setSearchResults(this.props.inventory.resultsToDisplay || null, 
             this.props.inventory.pageNumber);
    }
    render(){
        let returnValue = <LoadingSpinner/>
        if(this.props.inventory.haveData){
            let saleItems = this.props.inventory.resultsToDisplay.map(item => {
                let cartButton = foundInCart(this.props.cart,item._id)? 
                    (<RemoveFromCartButton recordDBID = {item._id}/>):(<AddToCartButton recordDBID = {item._id}/>);
                return(
                    <Col key = {item._id}>
                    <Card style = {{width: '16rem',height:'37rem',margin:'1rem'}} border = "dark" >
                    <Card.Img 
                        variant="top" 
                        src={item.images[0].uri}
                        height="250" />
                    <Card.Body >
                        <Card.Title style = {{height:'5rem'}}>{item.artist}</Card.Title>
                        <Card.Text style = {{height:"5rem"}}>{item.title}</Card.Text>
                        <Row>
                        <Col>
                        <ViewDetailsButton history = {this.props.history} record = {item}/>
                        {this.props.auth? cartButton : <div></div>}
                        </Col>
                        </Row>
                        <Card.Footer>Price: ${item.price}</Card.Footer>
                    </Card.Body>
                    </Card>
                    </Col>
                )
            });
            returnValue = (
                <div>
                    <Container>
                    <Row>
                    {saleItems}
                    </Row>
                    <PaginationButtons/>
                    </Container>
                </div>);
        }
        return(
            <div>
                {returnValue}
            </div>
            );
     }

}

const mapStateToProps = state => {
    return{
        inventory:state.inventory,
        auth:state.auth.isAuthenticated,
        cart:state.cart.cart
    };
};



export default connect(mapStateToProps)(DisplayResults);
