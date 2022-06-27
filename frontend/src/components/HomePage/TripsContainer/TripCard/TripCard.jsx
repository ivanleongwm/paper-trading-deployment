import {Card, Button} from 'react-bootstrap';
import image from '../../../../assets/images/seoul-sakura.jpg'
import {useState, useEffect} from 'react';

function TripCard ({tripDetails}) {

    useEffect(()=>{
        console.log("trip details:",tripDetails)
        console.log("location:",tripDetails.location)
    },[tripDetails])

    return (
        <div className="trip-card-container">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={tripDetails.thumbnail} />
                <Card.Body>
                    <Card.Title>{tripDetails.location + " " + tripDetails.title}</Card.Title>
                    <Card.Text>
                    {tripDetails.description}
                    </Card.Text>
                    <Button variant="primary" href={"/trips/" + tripDetails.tripIndex}>Edit</Button>
                </Card.Body>
            </Card>
        </div> 
    )
}

export default TripCard;