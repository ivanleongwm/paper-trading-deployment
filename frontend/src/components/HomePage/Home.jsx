import React from "react";
import { Row, Col, Container, Button } from 'react-bootstrap';
import {useState} from 'react';
import TripsContainer from './TripsContainer/TripsContainer'
import MyVerticallyCenteredModal from './CreateNewTripModal/CreateNewTripModal'

import './Home.css'

function Home() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="homepage-container">
            <Container>
                <Row>
                    <Col sm={4}>
                        <div className="banner-image-container">
                            <div id="parallelogram">
                                
                                <div className="image">
                                    <div className="black-filter">
                                        <br/>
                                        <br/>
                                        <h2>Trips</h2>
                                        <br/>
                                        <Button className="create-new-trip-button" variant="primary" onClick={() => setModalShow(false)}>
                                            CREATE NEW TRIP >
                                        </Button>
                                        <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <TripsContainer/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;