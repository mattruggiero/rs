import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { registerUser } from '../../actions/authActions';
import { connect } from 'react-redux';


let registrationFields = [
    {id:"email",placeHolder: "Email Address"},
    {id:"userName",placeHolder: "User Name"},
    {id:"firstName",placeHolder: "First Name"},
    {id:"lastName",placeHolder:"Last Name"},
    {id:"street",placeHolder:"Street Address"},
    {id:"aptNumber",placeHolder:"ApartmentNumber"},
    {id:"city",placeHolder:"City"},
    {id:"zipCode",placeHolder:"Zip-Code"},
    {id:"state",placeHolder: "State"},
    {id:"country",placeHolder: "Country"},
    {id:"password",placeHolder: "Password"},
    {id:"confirmPassword",placeHolder: "Confirm Password"}
]

class UserRegister extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleSubmit = (event) => {
        event.preventDefault();
        let userData = {};
        console.log(event.target[9].value);
        let usefulLength = event.target.length - 1;
        for(let i = 0; i<usefulLength; i++){
            let key = event.target[i].id;
            let value = event.target[i].value;
            userData[key] = value;
        }
        registerUser(userData);
    }
    render(){
        let formInputs = registrationFields.map(each =>{
            return(
                <div key = {each.id}>
                    <Form.Control id = {each.id} placeholder = {each.placeHolder}/>
                    <hr/>
                </div>
            )
        })
        return(
        <Container>
            <Form onSubmit = {this.handleSubmit}>
            {formInputs}
            <Button variant = "primary" type = 'submit'>
                SUBMIT
            </Button>
            </Form>
        </Container>);
    }
}

const mapStateToProps = state => ({
    auth:state.auth,
    errors:state.errors,
})
export default connect(mapStateToProps)(UserRegister);