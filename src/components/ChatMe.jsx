import React from 'react'
import ReactTimeAgo from 'react-time-ago'

function ChatMe({message}) {
    return (
        <div className="chat__bubble__me">
            
            <div className="chat__content">
               {message}
                                    </div>
                                    <span><ReactTimeAgo date={1604493259368} locale="en-US" timeStyle="round-minute"/></span>
        </div>
    )
}

export default ChatMe
