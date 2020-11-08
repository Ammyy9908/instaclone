import React from 'react'
import ReactTimeAgo from 'react-time-ago'

function ChatFriend({message}) {
    return (
        <div className="chat__bubble__friend">
                                    <span><ReactTimeAgo date={1604493671184} locale="en-US" timeStyle="round-minute"/></span>
                                    <div className="chat__content">
                                        {message}
                                    </div>
        </div>
    )
}

export default ChatFriend
