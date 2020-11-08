import { IconButton } from '@material-ui/core'
import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Chat from '../components/Chat'
import Dropdown from '../components/Dropdown'
import '../css/messages.css'
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import EmojiIcon from '../components/EmojiIcon'
import ChatFriend from '../components/ChatFriend'
import ChatMe from '../components/ChatMe'
import send from '../send.png'

function Messages({chatId,user}) {
    // change window title
    document.title = "Direct . Instagram"
    const [isDropdown,setDropDown] = useState(false);
    const chats = [{id:1,name:"Sahil",chats:[{id:1,name:"Hi",reciever:"Hey Sahil"},{id:2,sender:"Whats up?",reciever:"Nothing!"}]},{id:2,name:"Suraj",chats:[{id:1,name:"Hi",reciever:"Hey Suraj"},{id:2,sender:"Whats up?",reciever:"Nothing!"}]},{id:3,name:"Abhishek Tiwari",chats:[{id:1,name:"Hi",reciever:"Hey Somya"},{id:2,sender:"Whats up?",reciever:"Nothing!"}]},{id:4,name:"Sagar",chats:[{id:1,name:"Hi",reciever:"Hey Sagar"},{id:2,sender:"Whats up?",reciever:"Nothing!"}]},{id:5,name:"Mayank",chats:[{id:1,name:"Hi",reciever:"Hey Mayank"},{id:2,sender:"Whats up?",reciever:"Nothing!"}]}]
    return (
        <div className="messages">
            
            <Navbar send={true} home={false} profile={false} explore={false} like={false} setDropDown={setDropDown} isDropdown={isDropdown} user={user && user}/>
            {isDropdown && <Dropdown/>}
            
            <div className="messages__container">
                <div className="messages__sidenav">
                        <div className="sidenav__header">
                            <div className="user__chat__info">
                                <div className="user_chat__info__left">
                                <strong>Sumit Bighaniya</strong>
                                <IconButton><ExpandMoreIcon/></IconButton>
                                </div>
                                <div className="user_chat__info__right">
                                <IconButton><EditIcon/></IconButton>
                                </div>
                            </div>
                        </div>
                        <div className="sidenav__chatList">
                                {chats.map((chat)=><Chat id={chat.id} name={chat.name}/>)}
                        </div>
                </div>
                <div className="messages__body">
                    
                       { !chatId&&<div className="message__blank">
                            <div className="centered__elements">
                            
                                <img src={send} alt="send-icon"/>
                                <h2>Your Messages</h2>
                                <span>Send Text Messages to Your Friends</span>
                                <button>Send Message</button>
                            </div>
                        </div>}
                        {chatId&&
                        <><div className="message__body__header">
                            <div className="message__body__header__left">
                            <img alt="its___pra_deep's profile picture" class="_6q-tv" data-testid="user-avatar" draggable="false" src="https://scontent-maa2-1.cdninstagram.com/v/t51.2885-19/s150x150/123192298_4646118045461331_997515179185986427_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com&amp;_nc_ohc=7c5MQVmYHdYAX9YGIiN&amp;oh=62d402dfbd9a1e04ff94a9202bc7a62b&amp;oe=5FCBBA17"/>
                            <div className="person_chat_name">
                                {chats[chatId-1].name}
                            </div>
                            </div>
                            <div className="message__body__header__right">
                                <IconButton><InfoIcon/></IconButton>
                            </div>
                        </div>
                        <div className="message__body__content">
                                {chats[chatId-1].chats.map((chat, index) => {
                                    return <div>
                                        {chat.sender && <ChatFriend message={chat.sender}/>}
                                        {chat.reciever && <ChatMe message={chat.reciever}/>}
                                    </div>
                                })}
                        </div>

                        <div className="message__body__footer">
                                <div className="chat__input">
                                    <div className="emojis">
                                        <EmojiIcon/>
                                    </div>
                                    <input type="text" placeholder="Message.."/>
                                </div>
                        </div>
                        
                        </>
                            
                        }
                </div>
            </div>
        </div>
    )
}

export default Messages
