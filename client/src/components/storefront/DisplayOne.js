import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Tab, Tabs, Container, Image} from 'react-bootstrap';
import Gallery from 'react-grid-gallery';
import { formatTracklist, hasImage } from '../../helperFunctions';

class DisplayOne extends Component {
    render(){
        let record = this.props.record;
        let tracks = formatTracklist(record.trackList);
        let img = hasImage(record.images);
        let grid = (img.length -1 ? <Gallery images = {img}/>:'No Pictures to Display');
        return(
            <div>
                <Container>
                    <div style = {{textAlign:'center'}}>
                    <h1>{record.artist}</h1>
                    <h1>{record.title}</h1>
                    </div>
                    <hr/>
                </Container>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col><Image src = {record.images[0].uri} fluid /></Col>
                        <Col></Col>
                    </Row>
                    <Row><Col><hr/></Col></Row>
                    <Row>
                        <Col>
                        <Tabs defaultActiveKey = 'Tracklist'>
                        <Tab eventKey = 'Tracklist' title = 'Tracklist'>
                        <Row>
                            <Col>Title: </Col>
                            <Col></Col>
                            <Col>Duration: </Col>
                        </Row>
                        <hr/>
                        {tracks}
                        </Tab>
                        <Tab eventKey = 'Notes' title = 'Notes'>
                        <Row>
                            <Col>{record.notes || "No Notes To Display"}</Col>
                        </Row>
                        </Tab>
                        <Tab eventKey = 'Pictures' title = 'Pictures'>
                            {grid}
                        </Tab>
                       

                        </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        
        );
    }
}

const mapStateToProps = state => {
    return{
        record : state.inventory.selected,
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(DisplayOne);