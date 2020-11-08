import React,{useState,useEffect} from 'react'
import { Link ,useHistory} from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import Story from '../components/Story'
import Suggestion from '../components/Suggestion'
import '../css/home.css'
import { useStateValue } from '../StateProvider'
import Cookies from 'js-cookie';
import PostAction from '../components/PostAction'
import axios from 'axios'
import PostAddContainer from '../components/PostAddContainer'

function Home() {
    const history = useHistory();
    const [{user,posts},dispatch] = useStateValue();
    const [isUser,setUser] = React.useState();
    // check is user loggedin or not if not redirect to login page
    if(!Cookies.get('ACCESS-TOKEN')){
        history.push('/auth/login');
    }
    // change window title
    document.title = "Instagram"

    const getUser = async ()=>{
        if(Cookies.get('ACCESS-TOKEN')){
            const response = await axios.get('https://instaserversumit.herokuapp.com/user',{headers:{Authorization: `Bearer ${Cookies.get('ACCESS-TOKEN')}`}});
            
          if(response.status===200){
            
                dispatch({
                  type:"SET_USER",
                  user:response.data
                })
                setUser(true);
                fetchPosts().then((data)=>{
                    dispatch({
                                    type: 'SET_POSTS',
                                    posts: data
                                })
                })
          }
          }
    }


    useEffect(()=>{
        getUser();
        
    },[isUser])

    const fetchPosts = async function(){
        try{
            const r=await fetch(`https://instaserversumit.herokuapp.com/posts/sync`,{
              method: 'GET',
              headers:{'Content-type': 'application/json'}
            })
            return r.json();
          }
          catch(e){
            console.error(e);
          }
    }


    

    

    
    

    const [isDropdown,setDropDown] = useState(false);
    const [postaction,setPostAction] = useState(false);
    const [postAdd,setPostAdd] = useState(false);

    // Handle Logout

    const handleLogout = async ()=>{
        const r = await axios.get(`https://instaserversumit.herokuapp.com/logout/${user && user.id}`);
        if(r.status===200){
        dispatch({type:'SET_USER',user:null})
        Cookies.remove('ACCESS-TOKEN');
        history.push('/auth/login');
        }
    }
    return (
        <div className="home">
            <Navbar home={true} send={false} explore={false} like={false} profile={false} setDropDown={setDropDown} isDropdown={isDropdown} user={user && user} setPostAdd={setPostAdd}/>
            {isDropdown && <Dropdown/>}
            {postaction && <PostAction setPostAction={setPostAction}/>}
            {postAdd && <PostAddContainer setPostAdd={setPostAdd}/>}

            <div className="home__container">
                <div className="home__left">
                    {/* <div className="stories">
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                        <Story />
                    </div> */}

                    {posts.map((post) => <Post setPostAction={setPostAction} authorName={post.authorName} imageurl={post.imageurl} authorAvatar={post.authorAvatar} timestamp={post.timestamp} body={post.body} hashtag={post.hashtag} likes={post.likes} likedBy={post.likedBy} key={post._id} id={post._id} location={post.location}/>)}
                </div>
                <div className="home__right">
                    <div className="user__profile">
                        <div className="user__profile_image">
                        <img src={user && user.avatar===""?`https://avatars.dicebear.com/api/avataaars/${user.uname}.svg` :`${user && user.avatar}`} alt="user__avatar" />
                        </div>
                        <div className="profile__info">
                            <Link to={`/profile/${user && user.uname}`}>{user && user.uname}</Link>
                            <p>{user && user.name}</p>
                        </div>
                        <div className="profile__link">
                            <p onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</p>
                        </div>
                    </div>
                    <div className="suggestions">
                        <div className="suggesttion__title">
                            <strong>Suggestions For You</strong>
                            <a href="#/">See All</a>
                        </div>
                        <Suggestion />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
