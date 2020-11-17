import React, { useState, useEffect } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    // gets current user based on the token in local storage
    const getCurrentUser = () => {
        return fetch("http://localhost:8000/users/current_user", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
        //if the response is 'ok', return the json response (rareuser object), otherwise return an empty object
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }
                else{
                    return {}
                }
            })
            // set the 'currentUser' variable with the response data
            .then(setCurrentUser)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, currentUser, getCurrentUser, setCurrentUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}