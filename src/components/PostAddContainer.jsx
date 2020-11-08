import { IconButton } from '@material-ui/core'
import React, { useEffect } from 'react'
import '../css/postadd.css'
import CloseIcon from '@material-ui/icons/Close';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useStateValue } from '../StateProvider';
import { useState } from 'react';

function PostAddContainer({setPostAdd}) {
    const [image,setImage] = React.useState('');
    const [body,setBody] = React.useState('');
    const [tags,setTags] = React.useState('');
    const [{user,posts},dispatch] = useStateValue();
    const [city,setCity] = useState('');

    useEffect(()=>{
        fetch('http://ip-api.com/json/').then((response)=>response.json()).then((data)=>setCity(data.city));
    },[city]);



    const uploadPost = async (base64DataUrl)=>{
        try{
            
            const r=await fetch(`https://instaserversumit.herokuapp.com/posts/new/${user && user.id}`,{
              method: 'POST',
              body:JSON.stringify({data:base64DataUrl,post_body:body,tags,city:city}),
              headers:{'Content-type': 'application/json'}
            })
            return r.json();
          }
          catch(e){
            console.error(e);
          }
        
        
    }

    const handlePostImageUpload = (e)=>{
            e.preventDefault();
        const reader = new FileReader();
      
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          console.log(reader.result);
          uploadPost(reader.result).then((data) => {
              if(data){
                  setPostAdd(false);
                  dispatch({
                      type: 'SET_POST',
                      post:data
                  })
                  setImage('');
                  setBody('');
                  setTags('');
              }
              

          })
        }, false);
      
        if (image) {
          reader.readAsDataURL(image);
        }
    }
    return (
        <div className="postAddContainer">
            <div className="postPopup">
                <div className="closebtn">
                    <IconButton onClick={(e)=>setPostAdd(false)}><CloseIcon/></IconButton>
                </div>
                <form onSubmit={handlePostImageUpload}>
                <div className="post__control">
                <label htmlFor="image" className="image__label"><InsertPhotoIcon/> Choose Image</label>
                    <input type="file" name="image" id="image" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                   <div className="post__control">
                   <label htmlFor="post_body">Add some content for the post(optional)</label>
    <textarea name="post_body" id="post_body" cols="30" rows="10" defaultValue={body} onChange={(e)=>setBody(e.target.value)}></textarea>
                   </div>
                   <div className="post__control">
                <label htmlFor="tags">Post Hashtags</label>
                    <input type="text" name="tags" id="tags" value={tags} onChange={(e)=>setTags(e.target.value)}/>
                </div>
                <div className="post__control">
                    <input type="submit" value="Upload Post"/>
                </div>
                </form>
            </div>
        </div>
    )
}

export default PostAddContainer
