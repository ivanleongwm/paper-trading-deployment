import { useState, useEffect } from 'react'
import ForumCard from './ForumCard'

function Forum() {
    const [publicPosts,setPublicPosts] = useState([{
        location:"Singapore",
        file:"BB.JPG",
        postBody:"Took Lots of Photos Today",
        postTitle:"Happiest first date of my life",
        postDate: "2022-02-0612315",
        public: true,
        tripIndex: 29930558,
        username: "Michael",
        comments:[{
            remark: "",
            username: ""
        }]
    }])
    const [stateChange,setStateChange] = useState(0)

    const fetchPublicPosts = () => {
        const jwt = sessionStorage.getItem("jwt");
        const username = sessionStorage.getItem("username");

        fetch("/api/posts/get-public-posts", { 
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'token':jwt,
            'username': username,
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("Public POSTS",data)
            setPublicPosts(data.publicPosts)
        });
    }

    useEffect(()=> {
        fetchPublicPosts()
    },[stateChange])

    return (
        <div className="forum-container">
            {
                publicPosts.map((post, index)=> {
                    return (<ForumCard postData={post} index={index} stateChange={stateChange} setStateChange={setStateChange}/>)
                })
            }
        </div>
    )
}

export default Forum;