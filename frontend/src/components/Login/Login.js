import React from "react";
import { Form , Button, Row , Col} from "react-bootstrap"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({setLoggedInUser}) {
    const [username, setUsername] = useState("Michael");
    const [password, setPassword] = useState("123456");
    const [wrongPassword,setWrongPassword] = useState(false);

    let navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const login = { username, password };
    
        fetch("/api/users/login", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username, 
              password: password})
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.unauthorised !== 'unauthorised') {
                console.log("data",data)
                sessionStorage.setItem("jwt", data.jwt);
                sessionStorage.setItem("username", username);
                setLoggedInUser(username)
                setTimeout(()=> {
                    navigate("/");
                  }, 1000);
            } else {
                setWrongPassword(true)
            }
        });
      }    

    return (
        <div className="login-form-width">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => setUsername(event.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your user details with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                </Form.Group>
                {
                    wrongPassword ?
                    <div style={{color:'red'}}>Incorrect Username or Password, please try again.</div> :
                    <div></div>
                }
                <Button variant="primary" type="submit" onClick={(event) => {handleLogin(event)}}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm;