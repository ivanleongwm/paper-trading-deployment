import './InstaPostModal.css'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {useState,useEffect} from 'react';
import UploadImages from '../../ImageUploading/ImageUploading'
import {useParams} from 'react-router-dom'

function InstaPostModal(props) {
    const today = new Date().toISOString().slice(0, 10)
    const {id} = useParams()
    const [postCreateData,setPostCreateData] = useState({
        postTitle : "Happy day at ala restaurant",
        postDate : today,
        postBody: "a wonderous tour of the world",
        file : "",
        publicPrivate : true
    }); 
    const [userPosts, setUserPosts] = useState({})
    const [publicPost, setPublicPost] =  useState(false)
    // handle change event
    const handleChange = (e) => {
        e.preventDefault(); // prevent the default action
        setPostCreateData({...postCreateData, [e.target.id]:e.target.value}); // set name to e.target.value (event)
        console.log(postCreateData); 
    };

    const handleClick = (publicPost,setPublicPost) => {
        if (publicPost) {
            setPublicPost(false)
        } else {
            setPublicPost(true)
        }
    }

    //post fetch call to create data in database, on submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/posts/create-post", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'token': jwt
          },
          body: JSON.stringify({
              ...postCreateData,
              "file":postCreateData.file.substring(postCreateData.file.lastIndexOf('\\')+1),
              "username" : username,
              "tripIndex" : id,
              "location": props.location,
              "public": publicPost
            })
        })
        .then((res) => {
            setTimeout(()=>{
            window.location.reload()
            },1000)
            return res.json()
        })
        .then((data) => {
            console.log("data",data)
        });
      }    

    const fetchPostsData = () => {
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/posts/get-user-posts", { 
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'token':jwt,
            'tripIndex': id
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("USER POSTS",data)
            setUserPosts(data)
        });
    }

    useEffect(()=>{
        console.log("post details",postCreateData)
        console.log("TRIPINDEX",id)
    },[postCreateData])

    useEffect(()=>{
        fetchPostsData()
    },[])

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>  Title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Title of Post" 
                    value={postCreateData.postTitle} 
                    onChange={handleChange}
                    />
            </Form.Group>
            <Form.Group controlId="postDate">
            <Form.Label> Date</Form.Label>
                <Form.Control 
                    type="date" 
                    placeholder="Pick Start Date" 
                    value={postCreateData.postDate} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postBody">
                <Form.Label>  Title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Brief title of trip" 
                    value={postCreateData.postBody} 
                    onChange={handleChange}
                    />
            </Form.Group>
            <UploadImages handleChange={handleChange} postCreateData={postCreateData}/>
            <Form.Group as={Col} className="mb-3" id="publicPrivate">
            <Form.Check 
                type="switch" 
                label=" Public Post (> Right to show post to community)" 
                onClick={()=>{handleClick(publicPost,setPublicPost)}}
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
  
export default InstaPostModal;