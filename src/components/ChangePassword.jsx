import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

function ChangePassword({user}) {
    const [opass,setOPass] = React.useState('');
    const [npass,setNPass] = React.useState('');
    const [cnpass,setCNPass] = React.useState('');

    const handlePasswordUpdate =async (e)=>{
        e.preventDefault();
        // compare new and confirm new password
        if(cnpass!=npass){
            return alert('Make sure Two Password Matched!');
        }
        try {
            const r = await axios.post(`https://instaserversumit.herokuapp.com/user/change/pass/${user && user.id}`,{opass,npass});
            if(r.status===200){
                alert(r.data.message);
            }
          } catch (e) {
            if (e.response && e.response.data) {
              alert(e.response.data.message);
            }
          }
      }
    return (
        <div className="change__password">
                        <div className="change__password__top">
                        <img src={user && user.avatar===""?`https://avatars.dicebear.com/api/avataaars/${user.uname}.svg` :`${user && user.avatar}`} alt="user__avatar" style={{"borderRadius":"50%"}}/>
                            <h1>{user && user.uname}</h1>
                        </div>
                        <form onSubmit={handlePasswordUpdate}>
                            <div className="form__change__control">
                                <label htmlFor="opass">Old Password</label>
                                <input type="password" name="opass" id="opass" value={opass} onChange={(e)=>setOPass(e.target.value)}/>
                            </div>
                            <div className="form__change__control">
                                <label htmlFor="npass">New Password</label>
                                <input type="password" name="npass" id="npass" value={npass} onChange={(e)=>setNPass(e.target.value)}/>
                            </div>

                            <div className="form__change__control">
                                <label htmlFor="cpass">Confirm New Password</label>
                                <input type="password" name="cpass" id="cpass" value={cnpass} onChange={(e)=>setCNPass(e.target.value)}/>
                            </div>
                            <div className="form__change__control">
                                <button type="submit">Change Password</button>
                            </div>
                        </form>
                    </div>
    )
}

export default ChangePassword
