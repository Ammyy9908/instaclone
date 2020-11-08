import './App.css';
import Home from './screens/Home';
import Profile from './screens/Profile';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Auth from './screens/Auth';
import Messages from './screens/Messages';
import Explore from './screens/Explore';
import { useStateValue } from './StateProvider';
import React,{useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AccountEdit from './screens/AccountEdit';

function App() {
  const [{user},dispatch] = useStateValue();
  const [isUser,setUser] = React.useState();

  useEffect(async ()=>{
    if(Cookies.get('ACCESS-TOKEN')){
      const response = await axios.get('https://instaserversumit.herokuapp.com/user',{headers:{Authorization: `Bearer ${Cookies.get('ACCESS-TOKEN')}`}});
    if(response.status===200){
      
          dispatch({
            type:"SET_USER",
            user:response.data
          })
          setUser(true);
    }
    }
  },[isUser])
  return (
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/instaclone/">
    <Home/>
    </Route>
    <Route exact path="/auth/:auth_type" render={(props) => {
   let login=true;
   if(props.match.params.auth_type=="register"){
     login=false;
   }
    return <Auth login={login} />
}}  />

<Route exact path="/explore" render={(props) => {
  //  let login=true;
  //  if(props.match.params.auth_type=="register"){
  //    login=false;
  //  }
    return <Explore  user={user && user}/>
}}  />


<Route path="/direct/inbox/" render={(props) => {
   
    return <Messages user={user && user}/>
  
    
}}  />

<Route path="direct/:chat__id" render={(props) => {
   
   return <Messages chatId={props.match.params.chat__id} user={user && user}/>
 
   
}}  />

<Route path="/accounts/:actionType" render={(props) => {
   
   if(props.match.params.actionType=="edit"){
    return <AccountEdit user={user && user} editType='edit'/>
  }
  else if(props.match.params.actionType==='changePassword'){
    return <AccountEdit user={user && user} editType='changePassword'/>
  }
  else{
    return <Home user={user && user}/>
  }

  
 
   
}}  />

<Route exact path="/profile/:profile_name" render={(props) => {
   const uname = props.match.params.profile_name;
    return <Profile id={uname} user={user && user} />
}}  />

  </Switch>
</div>
</Router>
  );
}

export default App;
