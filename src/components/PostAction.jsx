import React from 'react'
import '../css/post_action.css'
function PostAction({setPostAction}) {
    return (
        <div className='postAction'>
            <div className="postAction__popup">
                <div className="action__option option__report">Report</div>
                <div className="action__option option__follow">Unfollow</div>
                <div className="action__option">Go to post</div>
                <div className="action__option">Share to...</div>
                <div className="action__option">Copy link</div>
                <div className="action__option" onClick={(e)=>setPostAction(false)} style={{"cursor":"pointer"}}>Cancel</div>
            </div>
        </div>
    )
}

export default PostAction
