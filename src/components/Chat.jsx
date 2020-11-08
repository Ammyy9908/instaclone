import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import '../css/chat.css'

function Chat({id,name}) {
    return (
        <Link to={`/direct/${id}`}><div className="chat">
            <div className="chat__left">
                <div className="chat__avatar">
                <img src="https://randomuser.me/api/portraits/women/47.jpg" alt=""/>
                </div>
            </div>
            <div className="chat__right">
                <span>{name.substring(0,5)}..</span>
                <strong>2 mins ago</strong>
            </div>
        </div></Link>
    )
}

export default Chat
