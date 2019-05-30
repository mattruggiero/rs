import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { login } from '../../actions/authActions';
import { connect } from 'react-redux';
import { setCart } from '../../actions/cartActions';


class UserLogin extends Component {
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            setCart();
            this.props.history.push('/');
        }
        if(nextProps.errors){
            console.log(nextProps.errors);
        }
    }
    handleSubmit =  (event) => {
        event.preventDefault();
        let loginJSON = {
            email: event.target.email.value, 
            password: event.target.password.value
        }
        login(loginJSON);
    }

    render(){
        return(
            <Container>
            <Form onSubmit = {this.handleSubmit}>
            <Form.Control id = "email" placeholder = "Email Address"/>
            <Form.Control id = "password" placeholder = "Password"/>
            <Button variant = "primary" type = 'submit'>
                SUBMIT
            </Button>
            </Form>
        </Container>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(UserLogin);
