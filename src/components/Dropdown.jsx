import React from 'react'
import Profile from './Profile'
import Saved from './Saved'
import SettingIcon from './SettingIcon'
import '../css/dropdown.css';
import { Link } from 'react-router-dom';


function Dropdown() {
    return (
        <div className="dropdown">
           <div className="dropdown__option">
                <Profile/>
                <Link to="/profile/sumitbighaniya"><div className="option__title">
                    Profile
                </div> </Link> 
            </div>
           
            <div className="dropdown__option">
                <Saved/>
                <div className="option__title">
                    Saved
                </div>
            </div>
            <div className="dropdown__option">
                <SettingIcon/>
                <div className="option__title">
                    Settings
                </div>
            </div>
        </div>
    )
}

export default Dropdown
