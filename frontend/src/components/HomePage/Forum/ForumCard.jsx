import {Card} from 'react-bootstrap';
import './ForumCard.css'
import {useState} from 'react'
import CommentBox from './CommentBox'

function ForumCard({postData,stateChange, setStateChange}) {
    const [showComments, setShowComments] = useState(false)

    const handleClick = (currentCommentState,setShowComments) => {
        if (currentCommentState) {
            setShowComments(false)
        } else {
            setShowComments(true)
        }
    }

    return (
        <div className="forum-card">
            <Card>
                <Card.Body>
                <Card.Text>
                    {postData.location + " | " + postData.postDate.slice(0,10) + " | " + postData.postTitle + ":" + postData.postBody}
                </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src={'https://project4-gaigai-bucketlist.herokuapp.com/image/' + postData.file} />
            </Card>
            <div class="buttons">
                <span class="badge bg-white d-flex flex-row align-items-center">
                    <span class="text-primary">Comments "ON"</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" onClick={()=>{handleClick(showComments,setShowComments)}}checked={showComments} id="flexSwitchCheckChecked"></input>
                    </div>
                </span>
            </div>
            {
             showComments ? 
             <CommentBox postData={postData} stateChange={stateChange} setStateChange={setStateChange}/> 
               : null
            }
        </div>
    )
}

export default ForumCard;