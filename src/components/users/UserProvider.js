import React, { useState } from "react"

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

    const getCurrentUser = () => {
        return fetch("http://localhost:8000/users/current_user", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }
                else{
                    return {}
                }
            })
            .then(setCurrentUser)
    }

    const changeUserType = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}/change_type`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
        })
            .then(getUsers)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, currentUser, getCurrentUser, changeUserType, setCurrentUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}