import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import axios from 'axios'

export default function LoginPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect , ssetRedirect] = useState(false)

    async function registerUser(event) {
        event.preventDefault();
        await axios.post('/user/register',{    //user registration data to send
            name,
            email,
            password,
        })
        .then((res)=>{
            console.log(res)
            console.log(res.data)
        }
            
        )
    }
    if (redirect) {
        <Navigate to="/login" replace={true} />
    }

    return (
        <div className="text-center grow flex flex-col justify-center -mt-60">
            <h2 className="text-2xl ">Register</h2>
            <form className="max-w-lg mx-auto" onSubmit={registerUser}>
                <input type="text" placeholder="fullname"  
                    value={name} 
                    onChange={(event)=>{ setName(event.target.value) }} />
                <input type="email" placeholder="youremail@gmail.com"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input type="password" placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                />
                <button className="button-primary">Register</button>
                <div>Already have an account? <NavLink to="/login" className="text-sky-600 underline" >Login Now</NavLink></div>
            </form>
        </div>
    )
}