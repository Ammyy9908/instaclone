import React,{useState} from 'react'
import Dropdown from '../components/Dropdown'
import Navbar from '../components/Navbar'

function Explore() {
    const [isDropdown,setDropDown] = useState(false);
    return (
        <div className="explore">
            <Navbar explore={true} like={false} home={false} profile={false} send={false} setDropDown={setDropDown} isDropdown={isDropdown}/>
            {isDropdown && <Dropdown/>}
            <div className="explore__container">
                <h1>Explore is Under Development</h1>
            </div>
        </div>
    )
}

export default Explore
