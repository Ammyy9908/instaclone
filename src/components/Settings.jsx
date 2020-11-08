import React from 'react'
import { Link } from 'react-router-dom'
import '../css/settings.css'

function Settings({setSettings,handleLogout}) {
    return (
        <div className='settings'>
            <div className="settings__popup">
                <Link to="/accounts/changePassword"><div className="settings__option" style={{"borderBottom":"1px solid #dbdbdb"}}>Change Password</div></Link>
                <div className="settings__option" onClick={(e)=>handleLogout()}>Log out</div>
                <div className="settings__option" onClick={(e)=>setSettings(false)} style={{"cursor":"pointer"}}>Cancel</div>
            </div>
        </div>
    )
}

export default Settings
