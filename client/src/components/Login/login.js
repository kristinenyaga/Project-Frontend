import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    function handleClick() {
        navigate('/signup')
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user));
                navigate(`/imagecard`)
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }
    return(
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label className="label" htmlFor="username">Email</label>
                <input className="input" type="text" placeholder="Type in your Email" id="username" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label className="label" htmlFor="password">Password</label>
                <input className="input" type="password" placeholder="Type in your Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button className="button" type='submit'>Log In</button>
                <div className="social">
                    <p>Don't have an account ? <span onClick={handleClick}><a href="/signup">Sign Up</a></span> </p>
                </div>
            </form>
        </>
    )
};

export default Login

