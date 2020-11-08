import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Dropdown from '../components/Dropdown'
import '../css/profile.css'
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import { Link,useHistory } from 'react-router-dom';
import Settings from '../components/Settings';
import Cookies from 'js-cookie';
import { useStateValue } from '../StateProvider';
import axios from 'axios';

function Profile() {

    const [{user},dispatch] = useStateValue();
    // change page title
    document.title =`${user && user.name} (@${user && user.uname}) • Instagram Clone`
    const [isDropdown,setDropDown] = useState(false);
    const [settings,setSettings] = useState(false);
    

    const history = useHistory();
    // Handle Logout

    const handleLogout = async ()=>{
        const r = await axios.get(`https://instaserversumit.herokuapp.com/user/logout/${user && user.id}`);
        if(r.status===200){
        dispatch({type:'SET_USER',user:null})
        Cookies.remove('ACCESS-TOKEN');
        history.push('/auth/login');
        }
    }
    return (
        <div className="proifle">
            <Navbar profile={true} home={false} explore={false} like={false} send={false} setDropDown={setDropDown} isDropdown={isDropdown} user={user && user}/>
            {isDropdown && <Dropdown/>}
            {settings && <Settings setSettings={setSettings} handleLogout={handleLogout}/>}

            

            <div className="profile__container">
                    <div className="profile__top">
                        <div className="user__image">
                        <img src={user && user.avatar===""?`https://avatars.dicebear.com/api/avataaars/${user.uname}.svg` :`${user && user.avatar}`} alt="user__avatar" />
                        </div>
                        <div className="user__info__profile">
                            <div className="profile__top__basic">
                                <h2>{user && user.uname}</h2>
                                <div className="userProfile__controls">
                                    <div className="buttons">
                                        <Link to="/accounts/edit"><button className="edit__profile">Edit Profile</button></Link>
                                        <IconButton onClick={(e)=>setSettings(true)}><SettingsIcon/></IconButton>
                                    </div>
                                </div>
                            </div>

                            <div className="user__profile__followers">
                                <div className="user__posts">
                                    <span><strong>0</strong> posts</span>
                                </div>
                                <div className="user__followers">
                                    <span><strong>{user && user.followers.length}</strong> Followers</span>
                                </div>
                                <div className="user__followings">
                                    <span><strong>{user && user.followings.length}</strong> Followings</span>
                                </div>
                            </div>

                            <div className="user__basic__profile">
                                <h1>{user && user.name}</h1>
                                <span>#{user && user.bio && user.bio}</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Profile
