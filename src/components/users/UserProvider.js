import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)

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
            .then(res => res.json())
            .then(setCurrentUser)
    }

    const getUserProfile = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
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
            users,
            getUsers,
            currentUser,
            getCurrentUser,
            changeUserType,
            getUserProfile,
            loggedIn,
            setLoggedIn
        }}>
            {props.children}
        </UserContext.Provider>
    )
}