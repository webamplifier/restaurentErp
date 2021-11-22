
import React from 'react';

const userContext = React.createContext();

function getUserFromLocalStorage(){
    return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null
}

function UserContext(props){
    const [user,setUser] = React.useState(getUserFromLocalStorage());
    const [load,setLoad] = React.useState(false);

    React.useEffect(()=>{
        localStorage.setItem('users',JSON.stringify(user))
    },[user])

    return (
        <userContext.Provider value={{user,setUser,load,setLoad}} >
            {props.children}
        </userContext.Provider>
    )
}

export {userContext,UserContext}