
import React,{useState} from 'react'
import axios from 'axios'
import { useStateValue } from '../StateProvider'

function EditProfile() {
  const [{user},dispatch] = useStateValue();
  const [website,setWebsite] = useState(user && user.website);
  const [bio,setBio] = useState(user && user.bio);
  const [sex,setSex] = useState('Male');
  const [phone,setPhone] = useState(user && user.phone);
  const name = user && user.name;
  const [uname,setUname] = useState(user && user.uname);
  const [email,setEmail] = useState(user && user.email);

  //file upload states
  const [fileInputState,setFileInputState] = useState('');
  const [selectedFile,setSelectedFile] = useState('');
  const [image,setImage] = useState('someimage');

  
  
  

  
      const uploadImage =async (base64DataUrl)=>{
        try{
          const r=await fetch(`https://instaserversumit.herokuapp.com/user/picture/change/${user && user.id}`,{
            method: 'POST',
            body:JSON.stringify({data:base64DataUrl}),
            headers:{'Content-type': 'application/json'}
          })
          return r.json();
        }
        catch(e){
          console.error(e);
        }
      }
      function handleProfilePic(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          uploadImage(reader.result).then(data=>{
            dispatch({
              type: "SET_USER",
              user:data.user
            })
          });
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
      }

    const handleProfileUpdate =async (e)=>{
      e.preventDefault();
      try {
        const r = await axios.post(`https://instaserversumit.herokuapp.com/user/update/${user && user.id}`,{uname,email,name,bio,sex,website,phone});
        if(r.status===200){
            console.log(r);
        }
      } catch (e) {
        if (e.response && e.response.data) {
          alert(e.response.data.message);
        }
      }
    }
    return (
        <div className="edit_profile">
                        <div className="edit__top">
                        <img src={user && user.avatar===""?`https://avatars.dicebear.com/api/avataaars/${user.uname}.svg` :`${user && user.avatar}`} alt="user__avatar" style={{"borderRadius":"50%"}}/>
                        <div className="basic__user__profile">
                            <h1>{uname ? uname:user && user.uname}</h1>
                            <form>
                                
                            <input type="file" name="profileImg" id="file" class="custom-file-input" onChange={handleProfilePic}/>
                            </form>
                        </div>
                        </div>
                        <form onSubmit={handleProfileUpdate}>
                           <div className="form__control">
                           <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" value={user && user.name} readonly/>
                           </div>
                           <div className="form__control">
                           <label htmlFor="uname">Username</label>
                            <input type="text" name="uname" id="uname" value={uname && uname} onChange={(e)=>setUname(e.target.value)}/>
                           </div>
                           <div className="form__control">
                           <label htmlFor="website">Website</label>
                            <input type="text" name="website" id="website" value={website ? website:user && user.website} onChange={(e)=>setWebsite(e.target.value)}/>
                           </div>
                           <div className="form__control">
                           <label htmlFor="bio">Bio</label>
                            <textarea name="bio" id="bio" cols="30" rows="10" onChange={(e)=>setBio(e.target.value)} defaultValue={bio}></textarea>
                           </div>
                           <div className="form__control">
                           <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                           </div>
                           <div className="form__control">
                           <label htmlFor="website">Phone Number</label>
                            <input type="text" name="phone" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                           </div>
                           <div className="form__control">
                           <label htmlFor="sex">Gender</label>
                            <select name="sex" id="sex" onChange={(e)=>setSex(e.target.value)}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="others">Others</option>
                            </select>
                           </div>
                           <div className="form__control">
                           <button type="submit">Submit</button>
                           </div>
                        </form>
                    </div>
    )
}

export default EditProfile
