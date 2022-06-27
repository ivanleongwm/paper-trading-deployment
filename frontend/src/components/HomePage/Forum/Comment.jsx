function Comment({comment}) {

    return (
        <div className="comment-container">
            <li class="media">
                        <div class="media-body">
                            <span class="text-muted pull-right">
                                <small class="text-muted">30 min ago</small>
                            </span>
                            <strong class="text-success">{'@' + comment.username}</strong>
                            <p>
                                {comment.remark}
                            </p>
                        </div>
                    </li>
        </div>       
    )
}

export default Comment;