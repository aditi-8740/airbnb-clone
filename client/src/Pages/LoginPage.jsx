import { useContext, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../UserContext";


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setisLoggedIn] = useState(false)
 
    const {user , setUser} = useContext(UserContext)

    const handleLoginSubmit = async (event)=>{
        event.preventDefault();
        try {
            const {data} = await axios.post('/login',{
                email,
                password
            },{ withCredentials: true })    //Send Cookies with the Request, receive cookies with response.
            
            setisLoggedIn(true);
            setUser(data);                  //on refreshing the page, the React application reinitializes, and the context state is reset.
            alert('login successfull')
        } catch (error) {
            console.log('login failed', error.response ? error.response.data : error.message)
        }
    }
    
    if (isLoggedIn) {
        return <Navigate to="/" replace={true} />  // (return=true)mean user not able to go back to previous tab
     }

    return (
        <div className="text-center grow flex flex-col justify-center -mt-60">
            <h2 className="text-2xl ">Login</h2>
            <form className="max-w-lg mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="youremail@gmail.com"  
                value={email} 
                onChange={ (event)=> setEmail(event.target.value) } />
                <input type="password" placeholder="password" 
                value={password}
                onChange={ (event)=> setPassword(event.target.value) } />
                <button className="button-primary">Login</button>
                <div>Don't have an account? <NavLink to="/register" className="text-sky-600 underline" >Register here</NavLink></div>
            </form>
        </div>
    )
}