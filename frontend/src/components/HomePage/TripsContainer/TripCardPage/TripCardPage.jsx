import './TripCardPage.css';
import { Button} from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {useState,useEffect} from 'react';
import image from '../../../../assets/images/seoul-sakura.jpg'
import {useParams} from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap';
import InstagramPostCard from './InstagramPost/InstagramPost'
import SingleTripHeader from './SingleTripHeader'
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NecessityCard from './NeccesitiesCard/NecessityCard';
import InstaPostModal from './InstagramPost/InstaPostModal'

const moment = require('moment');
/*
const things = {
    essentials : {
        "medications" : [1,false],
        "passport" : [1,false],
        "visa" : [1,false],
        "wallet" : [1,false],
        "water bottle" : [1,false]
    },
    accessories : {
        "belt" : [1,false],
        "sunglasses" : [1,false],
        "watch" : [1,false],
        "cap" : [1,false]
    },
    footwear : {
        "hiking shoes" : [1,false],
        "sandals" : [1,false],
        "shoes" : [1,false],
        "socks" : [1,false]
    },
    toiletries : {
        "floss" : [1,false],
        "mouth wash" : [1,false],
        "tooth paste" : [1,false],
        "towel" : [1,false]
    }
}
*/
//fix get and post of trip neccesities from monogodb 

function TripCardPage () {
    const {id} = useParams();
    const [singleTripData, setSingleTripData] = useState({
        photos:[]
    })
    const [allThingsForTrip, setAllThingsForTrip] = useState({})
    const [addNewCategory, setAddNewCategory] = useState("")
    const [postModalShow, setPostModalShow] = useState(false);
    const [userPosts, setUserPosts] = useState([])

    const fetchData = () => {
        const jwt = sessionStorage.getItem("jwt");

        fetch(`/api/trips/get-single-trip-data/${id}`, { 
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'token': jwt
          }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("data",data)
            setSingleTripData(data.singleTripDetail)
            setAllThingsForTrip(data.singleTripNecessities.things)
            console.log("photos array",data.photos)
        });
      }

      const onNeccesitiesChange = (payload) => {
        const jwt = sessionStorage.getItem("jwt");
        fetch(`/api/trips/update-single-trip-data/${id}`, { 
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'token': jwt
            },
            body: JSON.stringify({
                "tripIndex":id,
                "things":payload})
          })
          .then((res) => {
              return res.json()
          })
          .then((data) => {
              console.log("data",data)
          });
      }
      
    useEffect(() => {
        fetchData()
      },[])

    useEffect(() => {
        console.log("all things master data", allThingsForTrip)
    },[allThingsForTrip])

    const handleChange = (event) => {
        const payload = event.target.value
        setAddNewCategory(payload);
        //onNeccesitiesChange(payload);
    }

    const fetchPostsData = () => {
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/posts/get-user-posts", { 
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'token':jwt,
            'username': username,
            'tripIndex': id
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("USER POSTS",data)
            setUserPosts(data.userPosts)
        });
    }

    useEffect(()=>{
        fetchPostsData()
    },[])

    return (
        <div className="single-trip-card-container">
            <Container className="vh-100 d-flex flex-column">
                <Row className="h-100">
                    <Col sm={4}>
                    <div class="banner-image-container">
                        <div id="parallelogram">
                            <div class="image"></div>
                        </div>
                    </div>
                    </Col>
                    <Col sm={8}>
                        <Tabs>
                            <TabList>
                            <Tab>Backpack</Tab>
                            <Tab>Stories</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="trips-container"><div className="trip-cards-container">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    const payload = {...allThingsForTrip,
                                        [addNewCategory]:{"materials":[1,false]}}
                                    setAllThingsForTrip(payload)
                                    onNeccesitiesChange(payload)
                                    }
                                }
                                >
                                <label>
                                Add item:
                                </label>
                                <input
                                    name="description"
                                    placeholder="description"
                                    onChange={(event) => {handleChange(event)}}
                                    type="text"
                                />
                                <input type="submit" value="Add" />
                            </form>
                                {
                                        Object.keys(allThingsForTrip).map(function(key, index) {
                                            return <NecessityCard cardName={key} cardData={allThingsForTrip[key]} allThingsForTrip={allThingsForTrip} setAllThingsForTrip={setAllThingsForTrip}
                                            onNeccesitiesChange={onNeccesitiesChange}/>
                                        })
                                }
                                </div></div>
                            </TabPanel>
                            <TabPanel>
                            <div className="trips-container"><div className="trip-cards-container">
                                <div className="stories-container">
                                    <Button className="create-new-trip-button" variant="primary" onClick={() => setPostModalShow(true)}>
                                        CREATE NEW POST >
                                    </Button>
                                    <InstaPostModal
                                    show={postModalShow}
                                    onHide={() => setPostModalShow(false)}
                                    location={singleTripData.location}
                                    public={singleTripData.public}
                                    />
                                    <br/>
                                    {
                                        userPosts.map((post,index) => {
                                            return (<InstagramPostCard postData={post} key={index}/>)
                                        })
                                    }
                                </div>
                                </div></div>
                            </TabPanel>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div> 
    )
}

export default TripCardPage;



/* Tab 1

                                
*/


/* Tab 2




*/








/*
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 600,
                                    height: 250,
                                    },
                                }}
                                >
                                <Paper elevation={5}>
                                    <div>Trip Index: {singleTripData.tripIndex}</div>
                                    <div>Location: {singleTripData.location}</div>
                                    <div>Start Date: {moment(singleTripData.startDate).format('DD-MM-YYYY')}</div>
                                    <div>End Date: {moment(singleTripData.endDate).format('DD-MM-YYYY')}</div>
                                    <div>Activity: {singleTripData.activity}</div>
                                    {
                                        singleTripData.photos.map((photo)=> {
                                            return (
                                                <img className="trip-images" src={photo}/>
                                            )
                                        })
                                    }
                                    <div>Public tag: {singleTripData.public}</div>
                                </Paper>
                                </Box>
                                */