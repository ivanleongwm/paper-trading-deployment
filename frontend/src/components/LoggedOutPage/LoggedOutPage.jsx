import React from 'react'
import {useRef, useState} from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './LoggedOutPage.css'

function LoggedOutPage() {
    const[showFindOutMore, setShowFindOutMore] = useState(true)

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 0.2,
       
    };

    const sliderRef = useRef();

    function next(event) {
        //event.target.slider.slickNext();
        if (event.target.id === 'next') {
            sliderRef.current.slickNext()
            setShowFindOutMore(false)
        } 
      }

    function previous(event) {
        if (event.target.id === '') {
            sliderRef.current.slickPrev()
            setShowFindOutMore(true)
        }
    }

    return (
    <div className="logged-out-container">
        <Slider ref={sliderRef} {...settings}>
            <div id="prev" className="main-page-image" onClick={(event) => {
                console.log(event)
                previous(event)}}>
                <div className="center-platform">
                    {
                        showFindOutMore ?
                        <div className="center-box">
                            <br/>
                            <br/>
                            <h1>GaiGai</h1>
                            <h4>A trip planning diary</h4>
                            <button id="next" className="button" onClick={(event) => {next(event)}}>
                                Learn More >
                            </button>
                        </div> 
                        :
                        <div></div>
                    }
                 </div>  
            </div>
            <div className="description-for-intro">
                <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <b>Prepare a packing list</b>
                for travelling. <br/>A standard list that is modifiable.
                </div>
                <br/>
                <br/>
                <div>
                <b>Creating and Recording Trips</b>
                <br/>Create a log for each trip and <br/>upload photos to keep memories.
                </div>
                <br/>
                <br/>
                <div>
                <b>Sharing Posts with the Community, 
                    <br/>Exploring Trip Ideas</b>
                <br/>Choose whether to keep posts private 
                <br/>or public to share then with the <br/>community.
                </div>
                <br/>
                <br/>
                <div>Click <u>SIGN UP</u> Above to find out more</div>
            </div>
        </Slider>
    </div>  
    )
}

export default LoggedOutPage;