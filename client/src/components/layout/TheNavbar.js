import React, { Component } from 'react';
import { Nav, Navbar, Button} from 'react-bootstrap';
import SearchForm from './SearchForm';
import { LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


class TheNavbar extends Component {
    onClick = (event) => {
        logoutUser();
        //window.location.href = '/login';
        //history.pushState('/');
       
    }
    render(){

        let haveToken = this.props.auth.isAuthenticated;
        let loggedIn = (
            <div>
            <Button onClick = {this.onClick}>Log Out</Button>
            <LinkContainer to = '/cart'>
                <Button>View Cart</Button>
            </LinkContainer>
            </div>
        )
        let notLoggedIn = (
            <div>
            <LinkContainer to = '/login'>
                <Button>Login</Button>
            </LinkContainer>
            <LinkContainer to = '/register'>
                <Button>Register</Button>
            </LinkContainer>
            </div>
        )
        let navsToDisplay = haveToken? loggedIn:notLoggedIn;
        return(
            <Navbar className = 'justify-content-end' bg='primary'>
            <Navbar.Brand className = 'mr-auto'>
                <LinkContainer to = '/'>
                <Button size = 'lg'>Practicum Record Store</Button>
                </LinkContainer>
            </Navbar.Brand>
            <Nav>
            {navsToDisplay}
            <SearchForm/>
            </Nav>
            </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})


export default connect(mapStateToProps)(TheNavbar);