import {Carousel} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import './Highlights.css'

function Highlights() {
    const [userImagesArray, setUserImagesArray] = useState([{
        file : "",
        postTitle : "",
        postBody : ""
    }])

    const fetchTripsData = () => {
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/posts/get-all-user-post-images", { 
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'token':jwt,
            'username': username
          }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("ALLUSERIMAGES",data.userImageArray)
            setUserImagesArray(data.userImageArray)
        });
      }

      useEffect(()=>{
        fetchTripsData()
        console.log("useeffect run")
     },[]);  

    return (
        <div className="carousel-container">
            <Carousel>
                {
                    userImagesArray.map((image)=>{
                        return (
                            <Carousel.Item>
                                <img
                                id="carousel-image"
                                className="d-block w-100"
                                src={'https://project4-gaigai-bucketlist.herokuapp.com/image/' + image.file }
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3>{image.postTitle}</h3>
                                <p>{image.postBody}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Highlights;