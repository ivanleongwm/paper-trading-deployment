import React from "react";
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import './SignUp.css'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [createAccountData,setCreateAccountData] = useState({
        username : "",
        email: "",
        password: ""
    }); 
    
    // handle change event
    const handleChange = (e) => {
        e.preventDefault(); // prevent the default action
        setCreateAccountData({...createAccountData, [e.target.id]:e.target.value}); // set name to e.target.value (event)
        console.log(createAccountData); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("/api/users/register", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...createAccountData})
        })
        .then((res) => {
            console.log("RESPONSE",res)
            if (res.statusText === "OK") {
                setTimeout(()=> {
                window.location.href = "/login"
            }, 1000);
            }
            return res.json()
        })
        .then((data) => {
            console.log("data",data)
        });
      }    

    return (
        <div className="user-profile-container">
            <Container>
                <Row>
                    <Col sm={4}>
                    <div className="banner-image-container">
                            <div id="parallelogram">
                                
                                <div className="image">
                                    <div className="black-filter">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="user-profile-details">
                            <br/>
                            <h1>Create Your Account</h1>
                            <br/>
                            <Form>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="username" 
                                    value={createAccountData.username} 
                                    onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" 
                                    value={createAccountData.email} 
                                    onChange={handleChange} />
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" placeholder="Password" 
                                    value={createAccountData.password} 
                                    onChange={handleChange}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={(event) => {handleSubmit(event)}}>
                                    Create Account
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignUp;