import Comment from './Comment'
import {useState,useEffect} from 'react'

function CommentBox({postData, stateChange, setStateChange}) {
    const postUsername = sessionStorage.getItem("username");
    const [newComment, setNewComment] = useState({
        remark: "",
        username: postUsername
    })

    const handleChange = (e) => {
        e.preventDefault(); // prevent the default action
        setNewComment({...newComment, remark:e.target.value}); // set name to e.target.value (event)
        console.log(newComment); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const jwt = sessionStorage.getItem("jwt");

        fetch("/api/posts/write-comment", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'token': jwt
          },
          body: JSON.stringify({
              ...postData,
              "comments":[...postData.comments,{
                "remark": newComment.remark,
                "username": newComment.username
              }]
            })
        })
        .then((res) => {
            setStateChange(stateChange + 1)
            return res.json()
        })
        .then((data) => {
            console.log("data",data)
        });
        
        
      }    

      /*
            const newPublicPostArray = publicPosts
            newPublicPostArray[index] = {
                ...postData,
                "comments":[...postData.comments,{
                  "remark": newComment.remark,
                  "username": newComment.username
                }]}
            setPublicPosts(newPublicPostArray)
            console.log("NEW PUBLIC POST ARRAY",newPublicPostArray)
      */

    return (
        <div class="panel panel-info">
            <div class="panel-heading">
                        Comment panel
                    </div>
            <div class="panel-body">
            <textarea class="form-control" placeholder="write a comment..." rows="3" onChange={handleChange}></textarea>
            <button type="button" class="btn btn-info pull-right"
            onClick={(event) => {handleSubmit(event)}}>Post</button>
            <div class="clearfix">
                <ul class="media-list">
                {
                    postData.comments.map((comment)=>{
                        return (<Comment comment={comment}/>)
                    })
                }
                </ul>
            </div>
            </div>
        </div>
    )
}

export default CommentBox;