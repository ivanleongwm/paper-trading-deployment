import './CreateNewTripModal.css'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {useState} from 'react';

function MyVerticallyCenteredModal(props) {
    const [tripCreateData,setTripCreateData] = useState({
        tripIndex : 11,
        formGridStartDate : "2022-05-09",
        formGridEndDate : "2022-05-20",
        formGridLocation : "Singapore",
        formGridActivityTitle : "Running",
        formGridBriefDescription : "Fast and Far",
        formGridThumbnailUrl : "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        formGridCheckbox : true
    }); 
    
    // handle change event
    const handleChange = (e) => {
        e.preventDefault(); // prevent the default action
        setTripCreateData({...tripCreateData, [e.target.id]:e.target.value}); // set name to e.target.value (event)
        console.log(tripCreateData); 
    };

    //post fetch call to create data in database, on submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");
        const tripIndex = Math.floor((Math.random() * 1000000000) + 1);

        fetch("/api/trips/create-trip", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'token': jwt
          },
          body: JSON.stringify({
              ...tripCreateData,
              "username" : username,
              "tripIndex" : tripIndex
            })
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("data",data)
        });
      }    

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Trip
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control 
                    type="date" 
                    placeholder="Pick Start Date" 
                    value={tripCreateData.formGridStartDate} 
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control 
                    type="date" 
                    placeholder="Pick End Date" 
                    value={tripCreateData.formGridEndDate} 
                    onChange={handleChange}
                />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Location of trip" 
                    value={tripCreateData.formGridLocation} 
                    onChange={handleChange}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridActivityTitle">
                <Form.Label>Title of Activity</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Brief title of trip" 
                    value={tripCreateData.formGridActivityTitle} 
                    onChange={handleChange}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridBriefDescription">
                <Form.Label>Brief Description of To Dos</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={tripCreateData.formGridBriefDescription} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridThumbnailUrl">
                <Form.Label>Thumbnail Url</Form.Label>
                <Form.Control
                    value={tripCreateData.formGridThumbnailUrl} 
                    onChange={handleChange}
                />
                </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit" onClick={(event) => {handleSubmit(event)}}>
                Submit
            </Button>
          <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
export default MyVerticallyCenteredModal;