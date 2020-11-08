import React,{useState,useEffect} from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import '../css/post.css'
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useStateValue } from '../StateProvider';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

TimeAgo.addDefaultLocale(en)

function Post({setPostAction,authorName,imageurl,authorAvatar,timestamp,body,hashtag,likedBy,id,location}) {
    const [{user,posts},dispatch] = useStateValue();
    const [likedby,setLikedBy] = useState(likedBy);




    const handleLike = async (e)=>{
        const r = await axios.put(`https://instaserversumit.herokuapp.com/posts/like/${id}`,{likedBy:user && user.id})
        if(r.status===200){
            console.log(r.data.liked);
            if(r.data.liked){
                document.getElementById(`${id}`).textContent = parseInt(document.getElementById(`${id}`).textContent) + 1;
                setLikedBy(r.data.data.likedBy);
            }
        }
        
    }

    const handleDisLike = async (e)=>{
        // document.getElementById(`${id}`).textContent = parseInt(document.getElementById(`${id}`).textContent) - 1;
        // setLiked(false);
        const r = await axios.put(`https://instaserversumit.herokuapp.com/posts/dislike/${id}`,{likedBy:user && user.id})
        if(r.status===200){
            console.log(r);
            if(r.data.liked){
                document.getElementById(`${id}`).textContent = parseInt(document.getElementById(`${id}`).textContent) - 1;
            setLikedBy(r.data.data.likedBy);
            }
        }
        
    }
    return (
        <div className="post">
            <div className="post__header">
                <div className="profile">
               <img src={authorAvatar} alt="profile" className="profile__image" />
                </div>
                <div className="author__info">
                    <div className="auth__links">
                        <a href="#/">{authorName}</a>
                        <a href="#/">{location}</a>
                    </div>
                    <div className="button">
                        <IconButton onClick={(e)=>setPostAction(true)}><MoreHorizIcon/></IconButton>
                    </div>
                </div>
            </div>
            <div className="post__image">
            { likedby.includes(user && user.id) && <img src={imageurl} alt="post_media" onDoubleClick={handleDisLike}/>}
            {!likedby.includes(user && user.id) &&<img src={imageurl} alt="post_media" onDoubleClick={handleLike} />}
            </div>
            <div className="post__footer">
                <div className="post__controls">
                   { likedby.includes(user && user.id) && <IconButton onClick={handleDisLike} ><FavoriteIcon style={{ color: red[500] }}/></IconButton>}
                   {!likedby.includes(user && user.id) && <IconButton onClick={handleLike}><FavoriteBorderIcon/></IconButton>}
                   <IconButton><ChatBubbleOutlineIcon/></IconButton>
                   
                   
                   
                    <IconButton><SendIcon/></IconButton>
                </div>
                <div className="post__body">
                    <p>{body}</p>
                    <ul style={{"listStyle":"none"}}>
    {hashtag.map((hashtag)=><li><Link to="/" style={{'color':"#0095f6"}}>{hashtag+" "}</Link></li>)}
                    </ul>
                </div>
                <div className="likes__info">
                    {/* <div className="first_like_image">
                        <img src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="first__like__avatar"/>
                        
                    </div> */}
                    <div className="likes">
                            Likes <strong id={id}>{likedBy.length}</strong>
                        </div>
                </div>

                <div className="post__comments">
                    
                            <span><strong>Sahil</strong> wow👋</span>
                            <span><strong>Sahil</strong> wow👋</span>
                        
                </div>

                <div className="post__timestamp">
                    <span><ReactTimeAgo date={parseInt(timestamp)} locale="en-US" timeStyle="round-minute"/></span>
                </div>
                <div className="comment__input">
                    <input type="text" placeholder="Add a comment..."/>
                    <button>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Post
