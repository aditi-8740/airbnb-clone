import axios from "axios";
import { createContext, useEffect, useState } from "react";   

//create usecontext
export const UserContext = createContext({})

export function UserContextProvider({children}) {           //children prop passes the other comp. to be rendered inside UserContextProvider //here children refers to all the nested comp. inside UserContextProvider
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    useEffect( ()=>{
        if (!user) {
           axios.get('/user/profile',{withCredentials: true}).then(({data})=>{
                setUser(data)
                setReady(true)
           }).catch(()=>{
            setReady(false)
           })
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser}}>      {/**Setting value that can be accessed by these nested comp. */}
            {children}
        </UserContext.Provider>
    )
}


// can do like this also :
// export const userContext = createContext({
//     user: null,
//     setUser: () => {},
// })   