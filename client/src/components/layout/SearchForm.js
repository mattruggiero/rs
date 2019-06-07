import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { setSearchResults } from '../../actions/inventoryActions';

class SearchForm extends Component {
    constructor(props){
            super(props);
            this.state = {
                searchInput: null, 
            }
            this.handleTyping = this.handleTyping.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        componentDidUpdate = (prevProps, prevState) => {
            let noInput = (
                this.state.searchInput === null ||
                this.state.searchInput === 0
            );
            if(noInput){
                console.log("no input");
            }
        }

        handleTyping = (event) => { 
            event.preventDefault();
            this.setState({
                searchInput:""+event.target.value,
            })
        }

        handleSubmit = async (event) => {
            event.preventDefault();
            setSearchResults(this.state.searchInput,1);
            
        }

        render(){
            return(
            <Container>
                <Form inline onSubmit = {this.handleSubmit}>
                <Form.Control
                    size = 'lg'
                    onChange = {this.handleTyping}
                    type = "text"
                    name = "searchInput"
                    placeholder = 'What are you looking for?'/>
                <Button
                    variant = "primary"
                    type = 'submit'>
                    SEARCH
                </Button>
                </Form>
            </Container>)
        }
    }


export default SearchForm;