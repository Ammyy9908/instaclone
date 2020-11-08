import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../css/auth.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useStateValue } from '../StateProvider';

function Auth({ login }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const history = useHistory();

    // check is user already logged in if redirect to hOME Page

    const [{ user }, dispatch] = useStateValue();

    if (user) {
        history.push('/');
    }

    if (login) {
        document.title = 'Login Instagram';
    }
    else {
        document.title = 'Sign up . Instagram'
    }
    const brand = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png";
    const style = { "height": "380px", "margin": "45px auto" };

    if (!login) {
        style.height = "542px";
        style.margin = "25px auto"
    }

    // handle Regstration

    const handleRegistration = async (e) => {
        e.preventDefault();

        // fetch user city
        if (!email || !password || !name || !uname) {
            return alert("All Fields Required");
        }

        try {
            const r = await axios.post('https://instaserversumit.herokuapp.com/register', { email, password, uname, name });
            if (r.status === 200) {
                history.push('/auth/login');
                setEmail('');
                setPassword('');
            }
        } catch (e) {
            if (e.response && e.response.data) {
                alert(e.response.data.message);
            }
        }





    }

    // handle Login


    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return alert("Make sure your email and password is filled!");
        }
        try {
            const r = await axios.post('https://instaserversumit.herokuapp.com/login', { email, password });
            if (r.status === 200) {
                Cookies.set('ACCESS-TOKEN', r.data.token, { expires: 1 });
                window.location.href = '/instaclone/';
            }
        } catch (e) {
            if (e.response && e.response.data) {
                alert(e.response.data.message);
            }
        }

    }

    return (
        <div className="auth">
            <div className="container__auth" style={style}>
                <div className="brand__name">
                    <h1>Instagram</h1>
                    {!login && <h2>Sign up to see photos and videos from your friends.</h2>}
                </div>
                <div className="form__auth">
                    <form onSubmit={!login ? handleRegistration : handleLogin}>
                        <div className="form__input">
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {!login && <div className="form__input">
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>}
                        {!login && <div className="form__input">
                            <input type="text" placeholder="Username" value={uname} onChange={(e) => setUname(e.target.value)} />
                        </div>}
                        <div className="form__input">
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {login && email.length > 5 && password.length > 6 && <div className="form__submit__button">
                            <input type="submit" value={!login ? "Sign up" : "Log In"} disabled={email.length < 0 && name.length < 5 && uname.length < 5 && password.length < 6} />
                        </div>}
                        {!login && email.length > 5 && password.length > 6 && name.length > 5 && uname.length > 5 && <div className="form__submit__button">
                            <input type="submit" value={!login ? "Sign up" : "Log In"} disabled={email.length < 0 && name.length > 5 && uname.length < 5 && password.length < 6} />
                        </div>}
                    </form>


                </div>
                <div className="switch_auth_link">
                    {login ? <div><Link to="/auth/register">Sign Up</Link></div> : <div><Link to="/auth/login">Login</Link></div>}
                </div>
            </div>
        </div>
    )
}

export default Auth
