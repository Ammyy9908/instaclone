import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import ChangePassword from '../components/ChangePassword';
import Dropdown from '../components/Dropdown';
import EditProfile from '../components/EditProfile';
import Navbar from '../components/Navbar'
import '../css/account.css'

function AccountEdit({user,editType}) {
    document.title =editType ==='changePassword'?'Change Password':'Edit Profile';
    const [isDropdown,setDropDown] = useState(false);
    const [uname,setUname] = useState(user && user.uname);
    const [email,setEmail] = useState(user && user.email);
    return (
        <div>
           <Navbar send={false} home={false} profile={false} explore={false} like={false} setDropDown={setDropDown} isDropdown={isDropdown} user={user && user}/>
           {isDropdown && <Dropdown/>}

           <div className="account__container">
               <div className="account_sidenav">
               {editType==='edit'?<Link to="/accounts/edit"><div className="sidenav__option" style={{"fontWeight":"600","borderLeft": "2px solid #000"}}>
               Edit Profile
                </div></Link>: <Link to="/accounts/edit"><div className="sidenav__option">
               Edit Profile
                </div></Link>}
                {editType==='changePassword'?<Link to="/accounts/changePassword"><div className="sidenav__option" style={{"fontWeight":"600","borderLeft": "2px solid #000"}}>
                    Change Password
                </div></Link>:<Link to="/accounts/changePassword"><div className="sidenav__option">
                Change Password
                </div></Link>}
               </div>
               <div className="account__body">
                    {editType ==='edit' && <EditProfile/>}
                    {editType ==='changePassword' && <ChangePassword user={user && user}/>}
                    
               </div>
           </div>
        </div>
    )
}

export default AccountEdit
